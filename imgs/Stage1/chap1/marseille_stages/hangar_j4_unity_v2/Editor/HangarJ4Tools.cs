using System;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// Copy the whole hangar_j4_unity_v2 folder under Assets before using this menu.
// All edits are scoped to that imported folder. The preview is a NEW additive scene.
public static class HangarJ4Tools
{
    [Serializable] private class BoundsData { public int x, y, width, height; }
    [Serializable] private class AssetData { public string name, file; public int width, height; public BoundsData bounds; }
    [Serializable] private class ManifestData { public AssetData[] assets; }
    private const float Ppu = 100f;
    private static string root;
    private static ManifestData manifest;
    private static Camera previewCamera;

    private static void LoadPack()
    {
        string match = null;
        foreach (string guid in AssetDatabase.FindAssets("HangarJ4Tools t:MonoScript"))
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            if (!path.EndsWith("/Editor/HangarJ4Tools.cs", StringComparison.Ordinal)) continue;
            string candidate = path.Substring(0, path.Length - "/Editor/HangarJ4Tools.cs".Length);
            if (!File.Exists(candidate + "/manifest.json")) continue;
            if (match != null) throw new InvalidOperationException("More than one Hangar J4 pack found. Keep one imported copy.");
            match = candidate;
        }
        if (match == null) throw new FileNotFoundException("Import the complete Hangar J4 pack, including manifest.json, into Assets.");
        root = match;
        manifest = JsonUtility.FromJson<ManifestData>(File.ReadAllText(root + "/manifest.json"));
        if (manifest == null || manifest.assets == null) throw new InvalidDataException("Invalid Hangar J4 manifest.");
    }

    [MenuItem("Tools/Divergency/Hangar J4/1 - Configure sprites")]
    public static void ConfigureSprites()
    {
        LoadPack();
        foreach (AssetData asset in manifest.assets)
        {
            var importer = AssetImporter.GetAtPath(root + "/" + asset.file) as TextureImporter;
            if (importer == null) throw new FileNotFoundException(asset.file);
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = SpriteImportMode.Single;
            importer.spritePixelsPerUnit = Ppu;
            importer.alphaIsTransparency = true;
            importer.filterMode = FilterMode.Point;
            importer.mipmapEnabled = false;
            importer.wrapMode = TextureWrapMode.Clamp;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.maxTextureSize = 4096;
            var settings = new TextureImporterSettings();
            importer.ReadTextureSettings(settings);
            settings.spriteAlignment = (int)SpriteAlignment.Custom;
            settings.spritePivot = Vector2.zero;
            settings.spriteMeshType = SpriteMeshType.FullRect;
            importer.SetTextureSettings(settings);
            importer.SaveAndReimport();
        }
        Debug.Log("Hangar J4: 14 sprites configured. Point, no mipmaps, uncompressed, 100 PPU, bottom-left pivot.");
    }

    [MenuItem("Tools/Divergency/Hangar J4/2 - Build preview in new additive scene")]
    public static void BuildPreview()
    {
        ConfigureSprites();
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Additive);
        var stage = new GameObject("Hangar J4 - Left Center Right");
        Undo.RegisterCreatedObjectUndo(stage, "Build Hangar J4 preview");
        var cameraObject = new GameObject("Hangar Preview Camera");
        cameraObject.transform.SetParent(stage.transform, false);
        previewCamera = cameraObject.AddComponent<Camera>();
        previewCamera.orthographic = true;
        previewCamera.orthographicSize = 3.93f;
        previewCamera.transform.position = new Vector3(0f, 3.93f, -10f);
        previewCamera.clearFlags = CameraClearFlags.SolidColor;
        previewCamera.backgroundColor = new Color32(17, 32, 42, 255);
        previewCamera.allowHDR = false;
        previewCamera.allowMSAA = false;

        Transform sky = Group(stage.transform, "L0 - Sky and distant coast", 0.12f);
        Transform sea = Group(stage.transform, "L1 - Sea", 0.35f);
        Transform wreck = Group(stage.transform, "L1b - Wreck and smoke", 0.40f);
        Transform floor = Group(stage.transform, "L2 - Playfield", 1f);
        Transform props = Group(stage.transform, "L3 - Independent props", 1f);
        string[] sides = { "left", "center", "right" };
        for (int i = 0; i < sides.Length; i++)
        {
            Layer(sides[i] + "_L0_sky_far", sky, i, -20);
            Layer(sides[i] + "_L1_sea", sea, i, -30);
            Layer(sides[i] + "_L2_playfield", floor, i, 0);
        }
        // Narrow solid-color backing prevents tiny transparency gaps at shoreline contours.
        var backing = new GameObject("Waterline backing");
        backing.transform.SetParent(sea, false);
        var backingRenderer = backing.AddComponent<SpriteRenderer>();
        const string backingPath = "/waterline-backing.asset";
        var tex = AssetDatabase.LoadAssetAtPath<Texture2D>(root + backingPath);
        if (!tex)
        {
            tex = new Texture2D(1, 1, TextureFormat.RGBA32, false);
            tex.SetPixel(0, 0, new Color32(11, 41, 48, 255)); tex.Apply();
            tex.filterMode = FilterMode.Point;
            AssetDatabase.CreateAsset(tex, root + backingPath);
            var savedSprite = Sprite.Create(tex, new Rect(0, 0, 1, 1), Vector2.zero, 1);
            savedSprite.name = "WaterlineBacking";
            AssetDatabase.AddObjectToAsset(savedSprite, tex);
            AssetDatabase.ImportAsset(root + backingPath);
        }
        foreach (UnityEngine.Object item in AssetDatabase.LoadAllAssetsAtPath(root + backingPath))
            if (item is Sprite) backingRenderer.sprite = (Sprite)item;
        backingRenderer.sortingOrder = -40;
        backing.transform.localPosition = new Vector3(-30f, (786f - 447f) / Ppu, 0f);
        backing.transform.localScale = new Vector3(60f, 1.55f, 1f);

        Prop("prop_wreck_boat_smoke", "Wrecked fishing boat", wreck, 2790, 405, 320, -10);
        float[] manholeX = { 2320, 2760, 3200, 3640 };
        for (int i = 0; i < manholeX.Length; i++)
            Prop("prop_manhole", "Manhole " + (i + 1), props, manholeX[i], 625, 110, 10);
        Prop("prop_armored_sedan", "Don Malo sedan 1", props, 2170, 505, 350, 20);
        Prop("prop_armored_sedan", "Don Malo sedan 2", props, 2090, 552, 350, 21);
        Prop("prop_armored_sedan", "Don Malo sedan 3", props, 2010, 599, 350, 22);
        Prop("prop_container_rust", "Container lower left", props, 3400, 525, 360, 20);
        Prop("prop_container_rust", "Container lower right", props, 3760, 525, 360, 20);
        Prop("prop_container_teal", "Container upper", props, 3580, 390, 360, 21);
        Selection.activeGameObject = stage;
        EditorSceneManager.MarkSceneDirty(scene);
        if (SceneView.lastActiveSceneView) SceneView.lastActiveSceneView.FrameSelected();
        Debug.Log("Hangar J4 preview built in a new unsaved additive scene. Save it where desired. Move Hangar Preview Camera along X during Play Mode to test parallax. Gameplay colliders are not included.");
    }

    private static Transform Group(Transform parent, string name, float factor)
    {
        var group = new GameObject(name);
        group.transform.SetParent(parent, false);
        if (factor < 1f)
        {
            var parallax = group.AddComponent<HangarParallaxLayer>();
            parallax.targetCamera = previewCamera;
            parallax.scrollFactor = factor;
            parallax.pixelsPerUnit = Ppu;
        }
        return group.transform;
    }
    private static AssetData Find(string name)
    {
        foreach (AssetData a in manifest.assets) if (a.name == name) return a;
        throw new InvalidDataException("Missing asset " + name);
    }
    private static GameObject SpriteObject(AssetData a, string name, Transform parent, int order)
    {
        var obj = new GameObject(name);
        obj.transform.SetParent(parent, false);
        var renderer = obj.AddComponent<SpriteRenderer>();
        renderer.sprite = AssetDatabase.LoadAssetAtPath<Sprite>(root + "/" + a.file);
        if (!renderer.sprite) throw new InvalidDataException("Sprite import failed: " + a.file);
        renderer.sortingOrder = order;
        return obj;
    }
    private static void Layer(string name, Transform parent, int index, int order)
    {
        AssetData a = Find(name);
        GameObject obj = SpriteObject(a, name, parent, order);
        obj.transform.localPosition = new Vector3((index * 2000f - 3000f) / Ppu, 0, 0);
        obj.transform.localScale = new Vector3(2000f / a.width, 786f / a.height, 1);
    }
    private static void Prop(string assetName, string name, Transform parent, float left, float bottom, float width, int order)
    {
        AssetData a = Find(assetName);
        float scale = width / a.bounds.width;
        GameObject obj = SpriteObject(a, name, parent, order);
        float x = (left - a.bounds.x * scale - 3000f) / Ppu;
        float y = (786f - bottom - (a.height - a.bounds.y - a.bounds.height) * scale) / Ppu;
        obj.transform.localPosition = new Vector3(x, y, 0);
        obj.transform.localScale = new Vector3(scale, scale, 1);
    }
}
