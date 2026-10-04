using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using TwoBitMachines.TwoBitSprite;
using Newtonsoft.Json;

// Read-only asset export for the standalone choreography preview. No scene or asset saves.
public static class ExportSynergyPreview
{
    static string Out;
    sealed class Request { public string output { get; set; } public Dictionary<string,string> characters { get; set; } }
    static Dictionary<Texture2D,string> textures;
    static object SpriteInfo(Sprite s)
    {
        if(!s) return null;
        var tex=s.texture;
        if(!textures.TryGetValue(tex,out var file))
        {
            file="atlas-"+textures.Count+".png";
            var prev=RenderTexture.active;
            var rt=RenderTexture.GetTemporary(tex.width,tex.height,0,RenderTextureFormat.ARGB32,RenderTextureReadWrite.sRGB);
            Texture2D copy=null;
            try {
                Graphics.Blit(tex,rt); RenderTexture.active=rt;
                copy=new Texture2D(tex.width,tex.height,TextureFormat.RGBA32,false);
                copy.ReadPixels(new Rect(0,0,tex.width,tex.height),0,0);copy.Apply();
                File.WriteAllBytes(Out+"/"+file,copy.EncodeToPNG());
            } finally { RenderTexture.active=prev;RenderTexture.ReleaseTemporary(rt);if(copy)UnityEngine.Object.DestroyImmediate(copy); }
            textures.Add(tex,file);
        }
        var r=s.textureRect;
        var o=s.textureRectOffset;
        return new {file,x=r.x,y=tex.height-r.y-r.height,w=r.width,h=r.height,px=s.pivot.x-o.x,py=r.height-s.pivot.y+o.y,ppu=s.pixelsPerUnit};
    }
    public static string Run()
    {
        var request=JsonConvert.DeserializeObject<Request>(File.ReadAllText("Temp/SynergyPreviewExport.json"));
        if(request==null || string.IsNullOrWhiteSpace(request.output) || request.characters==null || request.characters.Count==0) throw new Exception("Provide output and characters in Temp/SynergyPreviewExport.json");
        string project=Path.GetFullPath(".").TrimEnd(Path.DirectorySeparatorChar)+Path.DirectorySeparatorChar;
        Out=Path.GetFullPath(request.output);
        if(!Out.StartsWith(project,StringComparison.OrdinalIgnoreCase) || Out.StartsWith(Path.Combine(project,"Assets")+Path.DirectorySeparatorChar,StringComparison.OrdinalIgnoreCase)) throw new Exception("Export into an output directory inside the project, outside Assets");
        Directory.CreateDirectory(Out);textures=new Dictionary<Texture2D,string>();
        var paths=request.characters;
        var data=new Dictionary<string,object>();
        foreach(var kv in paths) {
            var show=AssetDatabase.LoadAssetAtPath<SpriteShow>(kv.Value);
            if(!show) throw new Exception("Missing "+kv.Value);
            data[kv.Key]=show.sprites.ToDictionary(p=>p.name,p=>(object)new{ticks=p.totalDuration,loop=p.loop,frames=p.animationCel.Select(c=>new{ticks=c.nbUpdate,s=SpriteInfo(c.sprite)}).ToArray()});
        }
        File.WriteAllText(Out+"/sprites.json",JsonConvert.SerializeObject(data));
        return JsonConvert.SerializeObject(new{output=Out,textures=textures.Count,clips=paths.Select(k=>new{actor=k.Key,names=AssetDatabase.LoadAssetAtPath<SpriteShow>(k.Value).sprites.Select(p=>p.name).ToArray()})});
    }
}
