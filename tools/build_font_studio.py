import os
import json
from b64_assets import WOFF2_B64, PLAQUE_B64

# Read atlas json to get glyph details
with open('fonts/alagard/alagard_atlas.json', 'r', encoding='utf-8') as f:
    atlas_data = json.load(f)

glyphs = atlas_data['glyphs']

html_template = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Divergency UI Title Font — Alagard Complete Font Suite & Unity Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    @font-face {{
      font-family: 'Alagard';
      src: url('data:font/woff2;base64,{WOFF2_B64}') format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }}

    :root {{
      --bg-darkest: #07090c;
      --bg-dark: #0e1218;
      --bg-card: rgba(18, 24, 34, 0.92);
      --bg-card-hover: rgba(26, 35, 48, 0.96);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-silver: rgba(180, 195, 215, 0.3);
      --silver-glow: rgba(210, 225, 245, 0.4);
      --crimson: #ef4444;
      --cyan-phantom: #00f5b8;
      --amber-gold: #f59e0b;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
      --font-display: 'Cinzel', Georgia, serif;
      --font-body: 'Inter', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-alagard: 'Alagard', monospace;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      background-color: var(--bg-darkest);
      color: var(--text-main);
      font-family: var(--font-body);
      line-height: 1.6;
      min-height: 100vh;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.06), transparent 50%),
        radial-gradient(circle at 15% 30%, rgba(239, 68, 68, 0.03), transparent 45%),
        radial-gradient(circle at 85% 65%, rgba(0, 245, 184, 0.04), transparent 50%);
      padding-bottom: 80px;
    }}

    .container {{
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }}

    /* Top Navigation Header */
    header.hero-header {{
      padding: 44px 0 28px;
      border-bottom: 1px solid var(--border-subtle);
      background: linear-gradient(180deg, rgba(14, 18, 24, 0.95), transparent);
      text-align: center;
    }}

    .badge-kicker {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(180, 195, 215, 0.1);
      border: 1px solid var(--border-silver);
      color: #cbd5e1;
      font-size: 12px;
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }}

    h1.hero-title {{
      font-family: var(--font-display);
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 1px;
      background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 55%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }}

    p.hero-subtitle {{
      color: var(--text-muted);
      font-size: 16px;
      max-width: 760px;
      margin: 0 auto 20px;
    }}

    .badges-row {{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    }}

    .format-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-family: var(--font-mono);
      padding: 4px 12px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
    }}
    .format-pill.highlight {{
      border-color: rgba(56, 189, 248, 0.4);
      color: #7dd3fc;
      background: rgba(56, 189, 248, 0.08);
    }}

    /* Main Grid Layout */
    .studio-layout {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 36px;
      margin-top: 36px;
    }}

    /* Plaque Studio Card */
    .card-plaque-studio {{
      background: var(--bg-card);
      border: 1px solid var(--border-silver);
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
    }}

    .section-title {{
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 700;
      color: #f1f5f9;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .section-desc {{
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 24px;
    }}

    /* The Live Plaque Stage */
    .plaque-stage-wrapper {{
      background: #090b0e;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 220px;
      position: relative;
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 60%),
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 20px 20px, 20px 20px;
    }}

    /* Plaque Container */
    .plaque-container {{
      position: relative;
      width: 413px;
      height: 108px;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      transition: transform 0.2s ease;
      image-rendering: pixelated;
    }}

    .plaque-bg-img {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      image-rendering: pixelated;
    }}

    .plaque-text-overlay {{
      position: relative;
      z-index: 2;
      font-family: var(--font-alagard);
      font-size: 32px;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      margin-top: -6px; /* align center with plaque slate area */
      letter-spacing: 2px;
      image-rendering: pixelated;
      transition: all 0.2s ease;
    }}

    /* Plaque Styles */
    .style-silver {{
      color: #f1f5f9;
      text-shadow: 2px 2px 0px #07090c, 1px 1px 0px #07090c, 0 0 10px rgba(203, 213, 225, 0.4);
    }}

    .style-crimson {{
      color: #ff6b6b;
      text-shadow: 2px 2px 0px #1a0407, 1px 1px 0px #1a0407, 0 0 14px rgba(239, 68, 68, 0.95);
    }}

    .style-cyan {{
      color: #5eead4;
      text-shadow: 2px 2px 0px #041a16, 1px 1px 0px #041a16, 0 0 14px rgba(45, 212, 191, 0.95);
    }}

    .style-gold {{
      color: #fde047;
      text-shadow: 2px 2px 0px #1c1303, 1px 1px 0px #1c1303, 0 0 14px rgba(250, 204, 21, 0.95);
    }}

    .style-stone {{
      color: #94a3b8;
      text-shadow: 1px 1px 0px #090c10, -1px -1px 0px #334155;
    }}

    /* Controls Row */
    .controls-grid {{
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 16px;
      margin-top: 24px;
    }}

    .control-group {{
      display: flex;
      flex-direction: column;
      gap: 6px;
    }}

    .control-label {{
      font-size: 13px;
      font-family: var(--font-mono);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    input.text-input {{
      background: #090c10;
      border: 1px solid var(--border-silver);
      border-radius: 8px;
      padding: 12px 16px;
      color: #fff;
      font-family: var(--font-alagard);
      font-size: 22px;
      letter-spacing: 1px;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }}
    input.text-input:focus {{
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
    }}

    /* Style Preset Buttons */
    .style-buttons-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }}

    .btn-preset {{
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 13px;
      font-family: var(--font-body);
      color: #cbd5e1;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }}
    .btn-preset:hover {{
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--border-silver);
      color: #fff;
    }}
    .btn-preset.active {{
      background: rgba(56, 189, 248, 0.15);
      border-color: #38bdf8;
      color: #38bdf8;
      font-weight: 600;
    }}

    /* Quick Preset Chips */
    .quick-chips-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
      align-items: center;
    }}
    .chip-label {{
      font-size: 12px;
      color: var(--text-dim);
      font-family: var(--font-mono);
      margin-right: 4px;
    }}
    .chip-item {{
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-family: var(--font-alagard);
      color: #94a3b8;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: all 0.15s ease;
    }}
    .chip-item:hover {{
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border-color: #cbd5e1;
    }}

    /* Action Row */
    .action-row {{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--border-subtle);
      gap: 12px;
    }}

    .btn-primary {{
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
      border: 1px solid #7dd3fc;
      border-radius: 8px;
      padding: 10px 20px;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      font-family: var(--font-body);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
      transition: all 0.2s ease;
    }}
    .btn-primary:hover {{
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
    }}

    .btn-secondary {{
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 10px 18px;
      color: #cbd5e1;
      font-size: 14px;
      font-family: var(--font-body);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      transition: all 0.2s ease;
    }}
    .btn-secondary:hover {{
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-color: var(--border-silver);
    }}

    /* Glyphs Matrix Grid */
    .glyph-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
      gap: 10px;
      margin-top: 18px;
    }}

    .glyph-box {{
      background: #090c10;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 10px 6px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: all 0.15s ease;
    }}
    .glyph-box:hover {{
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
    }}

    .glyph-char {{
      font-family: var(--font-alagard);
      font-size: 28px;
      line-height: 1.1;
      color: #f1f5f9;
      image-rendering: pixelated;
    }}

    .glyph-code {{
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-dim);
      margin-top: 6px;
    }}

    /* Unity Guide Card */
    .unity-guide-card {{
      background: var(--bg-card);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }}

    .guide-step {{
      display: flex;
      gap: 18px;
      margin-bottom: 24px;
    }}
    .step-number {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid #38bdf8;
      color: #38bdf8;
      font-family: var(--font-mono);
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }}
    .step-content {{
      flex: 1;
    }}
    .step-title {{
      font-weight: 600;
      font-size: 16px;
      color: #f1f5f9;
      margin-bottom: 6px;
    }}
    .step-desc {{
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.5;
    }}

    pre.code-block {{
      background: #090c10;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 14px;
      font-family: var(--font-mono);
      font-size: 12.5px;
      color: #38bdf8;
      overflow-x: auto;
      margin-top: 10px;
    }}

    /* Download Cards Grid */
    .downloads-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }}

    .download-card {{
      background: #090c10;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }}
    .download-card:hover {{
      border-color: var(--border-silver);
      transform: translateY(-2px);
    }}
    .dl-title {{
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 600;
      color: #f8fafc;
      margin-bottom: 4px;
    }}
    .dl-desc {{
      font-size: 12.5px;
      color: var(--text-dim);
      margin-bottom: 14px;
    }}
    .dl-btn {{
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-family: var(--font-mono);
      color: #38bdf8;
      text-decoration: none;
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      transition: all 0.15s ease;
    }}
    .dl-btn:hover {{
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #fff;
    }}

    /* Toast notification */
    #toast {{
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      border: 1px solid #38bdf8;
      color: #f8fafc;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-family: var(--font-mono);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    #toast.show {{
      transform: translateY(0);
      opacity: 1;
    }}
  </style>
</head>
<body>

  <!-- Toast -->
  <div id="toast"><span>✓</span> <span id="toast-msg">Copied to clipboard!</span></div>

  <header class="hero-header">
    <div class="container">
      <div class="badge-kicker">✦ Official Divergency UI Typographic Suite</div>
      <h1 class="hero-title">Alagard Gothic Title Font</h1>
      <p class="hero-subtitle">
        The dark fantasy chiseled blackletter font featured in the <strong>Skill Mastery</strong>, <strong>Deep</strong> character plaque, and <strong>Command List</strong> headers. Complete with full ASCII character map, TrueType / OpenType font files, Unity TextMeshPro presets, and BMFont atlas.
      </p>
      <div class="badges-row">
        <span class="format-pill highlight">TrueType (.ttf)</span>
        <span class="format-pill highlight">WebFont (.woff2)</span>
        <span class="format-pill highlight">BMFont (.fnt)</span>
        <span class="format-pill">Unity TextMeshPro</span>
        <span class="format-pill">Photoshop & Figma</span>
        <span class="format-pill">Full ASCII (95 Glyphs)</span>
      </div>
    </div>
  </header>

  <main class="container studio-layout">

    <!-- Section 1: Live Interactive Plaque Studio -->
    <section class="card-plaque-studio">
      <div class="section-title">
        <span>🗡️</span> Live Title Plaque Studio & PNG Generator
      </div>
      <p class="section-desc">
        Type any phrase to preview it inside the ornate Divergency filigree plaque frame with real-time gradient and shadow effects. Export transparent PNGs directly for your game mockups!
      </p>

      <div class="plaque-stage-wrapper">
        <div class="plaque-container" id="plaqueBox">
          <img class="plaque-bg-img" src="data:image/png;base64,{PLAQUE_B64}" alt="Gothic Plaque Frame" id="plaqueImg">
          <div class="plaque-text-overlay style-silver" id="plaqueText">SKILL MASTERY</div>
        </div>
      </div>

      <!-- Quick Preset Chips -->
      <div class="quick-chips-row">
        <span class="chip-label">Quick Phrases:</span>
        <button class="chip-item" onclick="setPhrase('SKILL MASTERY')">SKILL MASTERY</button>
        <button class="chip-item" onclick="setPhrase('DEEP')">DEEP</button>
        <button class="chip-item" onclick="setPhrase('CRIMSON FURY')">CRIMSON FURY</button>
        <button class="chip-item" onclick="setPhrase('PHANTOM BLADE')">PHANTOM BLADE</button>
        <button class="chip-item" onclick="setPhrase('DIVERGENCY')">DIVERGENCY</button>
        <button class="chip-item" onclick="setPhrase('BLOOD SUCKER')">BLOOD SUCKER</button>
        <button class="chip-item" onclick="setPhrase('STAGE 1: MARSEILLE')">STAGE 1: MARSEILLE</button>
      </div>

      <!-- Controls -->
      <div class="controls-grid">
        <div class="control-group">
          <label class="control-label">Title Text Input</label>
          <input type="text" class="text-input" id="customInput" value="SKILL MASTERY" oninput="updateText(this.value)" placeholder="Type anything...">
        </div>
        <div class="control-group">
          <label class="control-label">Font Size: <span id="sizeVal">32px</span></label>
          <input type="range" min="16" max="44" value="32" step="2" oninput="updateSize(this.value)">
        </div>
        <div class="control-group">
          <label class="control-label">Letter Spacing: <span id="spaceVal">2px</span></label>
          <input type="range" min="-1" max="8" value="2" step="1" oninput="updateSpacing(this.value)">
        </div>
      </div>

      <!-- Visual Styles -->
      <div class="style-buttons-row">
        <button class="btn-preset active" id="btn-silver" onclick="setStyle('silver')">
          <span>🗡️</span> Silver Filigree (Default)
        </button>
        <button class="btn-preset" id="btn-crimson" onclick="setStyle('crimson')">
          <span>🩸</span> Crimson Fury (Blood)
        </button>
        <button class="btn-preset" id="btn-cyan" onclick="setStyle('cyan')">
          <span>👻</span> Phantom Blade (Cyan)
        </button>
        <button class="btn-preset" id="btn-gold" onclick="setStyle('gold')">
          <span>👑</span> Relic Gold
        </button>
        <button class="btn-preset" id="btn-stone" onclick="setStyle('stone')">
          <span>🪨</span> Carved Slate
        </button>
      </div>

      <!-- Actions -->
      <div class="action-row">
        <div style="display:flex; gap:10px; align-items:center;">
          <button class="btn-primary" onclick="exportPlaquePNG()">
            <span>📸</span> Export Plaque Image (.png)
          </button>
          <span style="font-size:12px; color:var(--text-dim);">Crisp pixel transparent PNG composite</span>
        </div>
        <div style="display:flex; gap:8px;">
          <a href="fonts/alagard/alagard.ttf" download class="btn-secondary">
            <span>📥</span> Download .TTF
          </a>
          <a href="fonts/alagard/ui_gothic_title_plaque_clean.png" download class="btn-secondary">
            <span>🖼️</span> Empty Plaque PNG
          </a>
        </div>
      </div>
    </section>

    <!-- Section 2: Unity TextMesh Pro (TMP) Setup Guide -->
    <section class="unity-guide-card">
      <div class="section-title">
        <span>🎮</span> How to Use in Unity (TextMeshPro Crisp Pixel Setup)
      </div>
      <p class="section-desc">
        Pixel fonts often appear blurry in TextMeshPro by default due to bilinear filtering and SDF padding. Follow these 3 steps for razor-sharp 1:1 pixel rendering:
      </p>

      <div class="guide-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-title">Import & Generate Font Asset</div>
          <div class="step-desc">
            Copy <code>alagard.ttf</code> into your Unity Project (e.g. <code>Assets/Fonts/alagard.ttf</code>).<br>
            Right-click the font file in Unity's Project window and choose:
            <pre class="code-block">Create > TextMeshPro > Font Asset</pre>
          </div>
        </div>
      </div>

      <div class="guide-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-title">Configure Crisp Pixel Settings (CRITICAL)</div>
          <div class="step-desc">
            Select the generated <strong>alagard SDF</strong> in the Project window and inspect its properties:
            <ul style="margin: 8px 0 0 18px; color: #cbd5e1; font-size:13.5px;">
              <li><strong>Sampling Point Size:</strong> <code>16</code> (or <code>32</code> for high-DPI canvases).</li>
              <li><strong>Atlas Resolution:</strong> <code>512 x 512</code>.</li>
              <li><strong>Padding:</strong> <code>2</code> or <code>4</code>.</li>
              <li>Expand the font asset in the Project window to click its child <strong>Texture</strong>:</li>
              <li>Change <strong>Filter Mode:</strong> from <em>Bilinear</em> to <strong style="color:#38bdf8;">Point (no filter)</strong>.</li>
              <li>Change <strong>Compression:</strong> to <strong style="color:#38bdf8;">None</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="guide-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-title">Apply in UI & Color Gradient</div>
          <div class="step-desc">
            Add a <code>TextMeshProUGUI</code> component to your UI Canvas. Assign the font asset. Check <strong>Color Gradient</strong> to replicate the silver filigree style:
            <pre class="code-block">// C# Quick Setup Snippet
using TMPro;
using UnityEngine;

public class DivergencyTitle : MonoBehaviour
{{
    public TextMeshProUGUI titleText;
    
    void Start()
    {{
        titleText.text = "SKILL MASTERY";
        titleText.fontSize = 32;
        titleText.characterSpacing = 2f;
        // Vertex gradient: Top = #FFFFFF, Bottom = #94A3B8
        titleText.colorGradient = new VertexGradient(
            Color.white, Color.white,
            new Color(0.58f, 0.64f, 0.72f), new Color(0.58f, 0.64f, 0.72f)
        );
    }}
}}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Full Character Map -->
    <section class="card-plaque-studio">
      <div class="section-title">
        <span>🔤</span> Complete Glyph Matrix (All 95 ASCII Characters)
      </div>
      <p class="section-desc">
        Click any character to copy to clipboard or insert directly into your current typing buffer.
      </p>

      <div class="glyph-grid" id="glyphGrid">
        <!-- Rendered via JS -->
      </div>
    </section>

    <!-- Section 4: Downloads & Assets Library -->
    <section class="card-plaque-studio">
      <div class="section-title">
        <span>📦</span> Complete Asset Package Downloads
      </div>
      <p class="section-desc">
        All font formats, texture atlases, BMFont descriptors, and graphic frames are pre-generated and stored in <code>fonts/alagard/</code>.
      </p>

      <div class="downloads-grid">
        <div class="download-card">
          <div>
            <div class="dl-title">alagard.ttf</div>
            <div class="dl-desc">TrueType vector font. Installs on Windows/Mac, works in Unity, Photoshop, Figma, Aseprite.</div>
          </div>
          <a href="fonts/alagard/alagard.ttf" download class="dl-btn">⬇ Download TTF (13 KB)</a>
        </div>

        <div class="download-card">
          <div>
            <div class="dl-title">alagard.woff2</div>
            <div class="dl-desc">Web font format. Ultra-compressed (2.7 KB) for web apps, reviewer tools, and documentation.</div>
          </div>
          <a href="fonts/alagard/alagard.woff2" download class="dl-btn">⬇ Download WOFF2 (2.7 KB)</a>
        </div>

        <div class="download-card">
          <div>
            <div class="dl-title">alagard.fnt + atlas</div>
            <div class="dl-desc">AngelCode BMFont format. Ideal for classic 2D retro engines, Divergency tools, and raylib.</div>
          </div>
          <a href="fonts/alagard/alagard.fnt" download class="dl-btn">⬇ Download .FNT Descriptor</a>
        </div>

        <div class="download-card">
          <div>
            <div class="dl-title">alagard_silver_atlas.png</div>
            <div class="dl-desc">Pre-shaded metallic silver pixel atlas with drop shadow, ready for sprite rendering.</div>
          </div>
          <a href="fonts/alagard/alagard_silver_atlas.png" download class="dl-btn">⬇ Download Silver Atlas</a>
        </div>

        <div class="download-card">
          <div>
            <div class="dl-title">alagard_crimson_atlas.png</div>
            <div class="dl-desc">Blood-red gradient sprite atlas for damage numbers, fury skills, and boss health bars.</div>
          </div>
          <a href="fonts/alagard/alagard_crimson_atlas.png" download class="dl-btn">⬇ Download Crimson Atlas</a>
        </div>

        <div class="download-card">
          <div>
            <div class="dl-title">ui_gothic_title_plaque_clean.png</div>
            <div class="dl-desc">Cleaned ornate silver gothic plaque frame with transparent background cutout.</div>
          </div>
          <a href="fonts/alagard/ui_gothic_title_plaque_clean.png" download class="dl-btn">⬇ Download Plaque Frame</a>
        </div>
      </div>
    </section>

  </main>

  <script>
    const glyphsData = {json.dumps(glyphs)};
    const plaqueImgData = "data:image/png;base64,{PLAQUE_B64}";
    let currentStyle = 'silver';

    // Populate glyph grid
    const grid = document.getElementById('glyphGrid');
    Object.keys(glyphsData).forEach(ch => {{
      if (ch === ' ') return;
      const data = glyphsData[ch];
      const box = document.createElement('div');
      box.className = 'glyph-box';
      box.onclick = () => {{
        navigator.clipboard.writeText(ch);
        showToast(`Copied character '${{ch}}' (Dec ${{data.id}})`);
      }};
      box.innerHTML = `
        <div class="glyph-char">${{ch}}</div>
        <div class="glyph-code">${{data.id}} (0x${{data.id.toString(16).toUpperCase()}})</div>
      `;
      grid.appendChild(box);
    }});

    function updateText(val) {{
      document.getElementById('plaqueText').innerText = val || ' ';
    }}

    function setPhrase(phrase) {{
      document.getElementById('customInput').value = phrase;
      updateText(phrase);
    }}

    function updateSize(val) {{
      document.getElementById('sizeVal').innerText = val + 'px';
      document.getElementById('plaqueText').style.fontSize = val + 'px';
    }}

    function updateSpacing(val) {{
      document.getElementById('spaceVal').innerText = val + 'px';
      document.getElementById('plaqueText').style.letterSpacing = val + 'px';
    }}

    function setStyle(styleName) {{
      currentStyle = styleName;
      const text = document.getElementById('plaqueText');
      text.className = 'plaque-text-overlay style-' + styleName;
      
      document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('btn-' + styleName);
      if (activeBtn) activeBtn.classList.add('active');
    }}

    function showToast(msg) {{
      const toast = document.getElementById('toast');
      document.getElementById('toast-msg').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }}

    // Canvas PNG Export
    function exportPlaquePNG() {{
      const text = document.getElementById('customInput').value || 'SKILL MASTERY';
      const canvas = document.createElement('canvas');
      canvas.width = 413;
      canvas.height = 108;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {{
        ctx.drawImage(img, 0, 0);

        // Configure font
        const fontSize = parseInt(document.getElementById('sizeVal').innerText) || 32;
        const letterSpacing = parseInt(document.getElementById('spaceVal').innerText) || 2;
        ctx.font = `${{fontSize}}px Alagard`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const tx = canvas.width / 2;
        const ty = 46; // vertical center of slate plate

        // Shadows & colors based on current style
        if (currentStyle === 'silver') {{
          ctx.fillStyle = '#0b0d12';
          ctx.fillText(text, tx + 1, ty + 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.fillText(text, tx, ty);
        }} else if (currentStyle === 'crimson') {{
          ctx.shadowColor = 'rgba(239, 68, 68, 0.9)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#1c0507';
          ctx.fillText(text, tx + 1, ty + 2);
          ctx.fillStyle = '#ff8888';
          ctx.fillText(text, tx, ty);
        }} else if (currentStyle === 'cyan') {{
          ctx.shadowColor = 'rgba(20, 184, 166, 0.9)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#031714';
          ctx.fillText(text, tx + 1, ty + 2);
          ctx.fillStyle = '#a7f3d0';
          ctx.fillText(text, tx, ty);
        }} else if (currentStyle === 'gold') {{
          ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#1e1303';
          ctx.fillText(text, tx + 1, ty + 2);
          ctx.fillStyle = '#fef08a';
          ctx.fillText(text, tx, ty);
        }} else {{
          ctx.fillStyle = '#0f172a';
          ctx.fillText(text, tx + 1, ty + 1);
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(text, tx, ty);
        }}

        const link = document.createElement('a');
        link.download = `plaque_${{text.toLowerCase().replace(/[^a-z0-9]/g, '_')}}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Exported transparent PNG plaque!');
      }};
      img.src = plaqueImgData;
    }}
  </script>
</body>
</html>
'''

with open('alagard_font_studio.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

with open('fonts/alagard/index.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print('Generated alagard_font_studio.html and fonts/alagard/index.html!')
