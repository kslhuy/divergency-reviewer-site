# Divergency UI Title Font Suite — Alagard (Complete Set)

> **Identified Font**: **Alagard** by *Hewett Tsoi*  
> **Style**: Dark Fantasy Gothic Chiseled Blackletter Pixel (Native 16px / High-DPI 32px)  
> **Usage in Divergency**: Title plaques (`SKILL MASTERY`), Character badges (`DEEP`), Navigation (`BACK`, `QUEST`, `LIBRARY`, `POTENTIAL`, `STAGE`), and Command List headers.

---

## 📁 File Package Contents

All files are located in `fonts/alagard/` and ready for immediate use:

| File | Format | Best Used For |
| :--- | :--- | :--- |
| **`alagard.ttf`** | TrueType Vector Font | **Unity TextMeshPro**, Windows install, macOS, Photoshop, Figma, Aseprite |
| **`alagard.woff2`** | WebFont 2.0 (2.7 KB) | High-speed web apps, HTML UI, documentation |
| **`alagard.woff`** | WebFont 1.0 (4.3 KB) | Legacy browser fallback |
| **`alagard.fnt`** | AngelCode BMFont | Classic 2D game engines, Divergency UI, Raylib, PixiJS |
| **`alagard_silver_atlas.png`** | PNG 512x512 Atlas | Pre-shaded metallic silver pixel spritesheet matching in-game plaques |
| **`alagard_crimson_atlas.png`** | PNG 512x512 Atlas | Pre-shaded blood red gradient spritesheet for combat / fury skills |
| **`alagard_cyan_atlas.png`** | PNG 512x512 Atlas | Pre-shaded phantom cyan gradient spritesheet for spirit / evasion skills |
| **`alagard_gold_atlas.png`** | PNG 512x512 Atlas | Pre-shaded amber gold gradient spritesheet for masteries / relics |
| **`alagard_atlas.png`** | PNG 512x512 Atlas | Clean white alpha mask atlas (color tintable in Unity) |
| **`alagard_atlas.json`** | JSON Metadata | Bounding rects (`x, y, width, height, xoffset, yoffset, xadvance`) for all 95 characters |
| **`ui_gothic_title_plaque_clean.png`** | Transparent PNG | The ornate silver filigree plaque banner from the UI screenshots (413x108) |
| **`alagard_font_studio.html`** | Standalone Web App | Interactive live type tester, style switcher, character map, and PNG plaque generator |

---

## 🎮 Unity TextMeshPro (TMP) Step-by-Step Setup

Follow these exact steps to ensure the font renders **100% crisp without blur or fuzzy anti-aliasing**:

### Step 1: Import the Font
1. Copy `alagard.ttf` into your Unity project's `Assets/Fonts/` folder.
2. In the Unity Project tab, right-click `alagard.ttf` and select:
   ```
   Create > TextMeshPro > Font Asset
   ```
   This generates an `alagard SDF` font asset.

### Step 2: Configure Crisp Pixel Settings (CRITICAL)
Select the newly created `alagard SDF` in your Project window:
1. In the Inspector:
   - **Sampling Point Size**: Set to `16` (or `32` if your UI canvas is high-resolution).
   - **Atlas Resolution**: `512 x 512`.
   - **Padding**: `2` or `4`.
2. Expand the `alagard SDF` asset in the Project window to click its child **Texture** asset.
3. In the Texture Inspector:
   - **Filter Mode**: Change from *Bilinear* to **`Point (no filter)`** *(Removes blurry edges!)*.
   - **Compression**: Change to **`None`** *(Prevents compression artifacts on pixel glyphs)*.
   - Click **Apply**.

### Step 3: Match the In-Game Divergency Silver Metallic Look
When using a `TextMeshProUGUI` component in your Canvas:
- **Font Size**: `32`
- **Character Spacing**: `2`
- Under **Color Gradient** (4-color vertex gradient):
  - **Top Left**: `#FFFFFF` (Pure White)
  - **Top Right**: `#FFFFFF` (Pure White)
  - **Bottom Left**: `#94A3B8` (Chiseled Steel Silver)
  - **Bottom Right**: `#94A3B8` (Chiseled Steel Silver)
- Under **Extra Settings > Underlay**:
  - Color: `#07090C` (Dark Charcoal)
  - Offset X: `0.05`
  - Offset Y: `-0.05`

---

## 💻 C# Unity Script Example

```csharp
using UnityEngine;
using TMPro;

[RequireComponent(typeof(TextMeshProUGUI))]
public class DivergencyPlaqueTitle : MonoBehaviour
{
    public enum TitleStyle { Silver, Crimson, Cyan, Gold }
    public TitleStyle style = TitleStyle.Silver;
    
    private TextMeshProUGUI textComp;

    void Awake()
    {
        textComp = GetComponent<TextMeshProUGUI>();
        ApplyStyle(style);
    }

    public void SetTitle(string title, TitleStyle newStyle)
    {
        textComp.text = title;
        ApplyStyle(newStyle);
    }

    private void ApplyStyle(TitleStyle s)
    {
        textComp.enableVertexGradient = true;
        textComp.characterSpacing = 2f;

        switch (s)
        {
            case TitleStyle.Silver:
                textComp.colorGradient = new VertexGradient(
                    Color.white, Color.white,
                    new Color(0.58f, 0.64f, 0.72f), new Color(0.58f, 0.64f, 0.72f)
                );
                break;
            case TitleStyle.Crimson:
                textComp.colorGradient = new VertexGradient(
                    new Color(1f, 0.75f, 0.75f), new Color(1f, 0.75f, 0.75f),
                    new Color(0.94f, 0.27f, 0.27f), new Color(0.60f, 0.11f, 0.11f)
                );
                break;
            case TitleStyle.Cyan:
                textComp.colorGradient = new VertexGradient(
                    new Color(0.80f, 0.98f, 0.95f), new Color(0.80f, 0.98f, 0.95f),
                    new Color(0.08f, 0.72f, 0.65f), new Color(0.06f, 0.46f, 0.43f)
                );
                break;
            case TitleStyle.Gold:
                textComp.colorGradient = new VertexGradient(
                    new Color(1f, 0.98f, 0.92f), new Color(1f, 0.98f, 0.92f),
                    new Color(0.96f, 0.62f, 0.04f), new Color(0.71f, 0.33f, 0.04f)
                );
                break;
        }
    }
}
```

---

## 🌐 Interactive Font Studio & Plaque Generator

To test any custom text live inside the ornate filigree plaque, simply open `alagard_font_studio.html` in any web browser (works 100% offline).

Features:
- Live typing buffer with real-time plaque preview.
- 5 preset visual themes (Silver Filigree, Crimson Fury, Phantom Cyan, Relic Gold, Slate).
- Instant "Export Plaque Image (.png)" button to create transparent game UI banners.
- Complete 95-glyph interactive character matrix with instant click-to-copy.
