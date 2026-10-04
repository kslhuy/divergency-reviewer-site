import os
import json

BASE_DIR = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site"
ITEMS_FILE = os.path.join(BASE_DIR, "scripts", "all_parsed_audio_items.json")
STATUS_FILE = os.path.join(BASE_DIR, "scripts", "batch_status.json")
OUT_HTML = os.path.join(BASE_DIR, "DevLogs_Audio_Showcase.html")

with open(ITEMS_FILE, "r", encoding="utf-8") as f:
    items = json.load(f)

status = {}
if os.path.exists(STATUS_FILE):
    try:
        with open(STATUS_FILE, "r", encoding="utf-8") as f:
            status = json.load(f)
    except Exception:
        status = {}

items_json_str = json.dumps(items, ensure_ascii=False)
status_json_str = json.dumps(status, ensure_ascii=False)

html_content = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Divergency & LF2 - DevLogs Audio & SFX Showcase</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg: #090b10;
      --card-bg: rgba(18, 22, 33, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-cyan: #00f2fe;
      --accent-blue: #4facfe;
      --accent-amber: #f6d365;
      --accent-purple: #9d4edd;
      --accent-emerald: #10b981;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --glass-panel: rgba(15, 23, 42, 0.65);
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      background: radial-gradient(circle at 15% 15%, rgba(15, 32, 67, 0.5) 0%, transparent 60%),
                  radial-gradient(circle at 85% 85%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                  #090b10;
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      min-height: 100vh;
      padding-bottom: 80px;
    }}
    header {{
      background: rgba(9, 11, 16, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 24px;
    }}
    .header-content {{
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }}
    .brand {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}
    .brand-badge {{
      background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
      color: #000;
      font-weight: 800;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}
    .brand-title {{
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(90deg, #ffffff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}
    .studio-btn {{
      background: rgba(79, 172, 254, 0.15);
      border: 1px solid rgba(79, 172, 254, 0.35);
      color: #38bdf8;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }}
    .studio-btn:hover {{
      background: rgba(79, 172, 254, 0.3);
      border-color: #38bdf8;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
      transform: translateY(-1px);
    }}
    .container {{
      max-width: 1440px;
      margin: 24px auto 0;
      padding: 0 24px;
    }}
    .stats-bar {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }}
    .stat-card {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px 20px;
      backdrop-filter: blur(10px);
    }}
    .stat-val {{
      font-size: 28px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: #38bdf8;
    }}
    .stat-lbl {{
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
    }}
    .filter-wrapper {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 16px;
      backdrop-filter: blur(12px);
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}
    .search-box {{
      position: relative;
      width: 100%;
    }}
    .search-input {{
      width: 100%;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 12px 18px;
      color: #fff;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
    }}
    .search-input:focus {{
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.25);
    }}
    .category-tabs {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }}
    .tab-btn {{
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .tab-btn:hover {{
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }}
    .tab-btn.active {{
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(79, 172, 254, 0.2));
      border-color: #38bdf8;
      color: #38bdf8;
      font-weight: 600;
    }}
    .catalog-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 20px;
    }}
    .audio-card {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 20px;
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      position: relative;
      overflow: hidden;
    }}
    .audio-card:hover {{
      transform: translateY(-2px);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }}
    .card-top {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }}
    .cat-badge {{
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.06);
      color: #94a3b8;
    }}
    .cat-Music {{ background: rgba(157, 78, 221, 0.2); color: #c77dff; border: 1px solid rgba(157, 78, 221, 0.3); }}
    .cat-Ambience {{ background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }}
    .cat-Melee, .cat-Movement {{ background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }}
    .cat-Ranged, .cat-Skills {{ background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }}
    .cat-Boss {{ background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }}
    .cat-UI, .cat-Rebound {{ background: rgba(14, 165, 233, 0.2); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }}
    .cat-Voice {{ background: rgba(236, 72, 153, 0.2); color: #f472b6; border: 1px solid rgba(236, 72, 153, 0.3); }}

    .dur-badge {{
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-muted);
    }}
    .stem-title {{
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 6px;
      font-family: 'JetBrains Mono', monospace;
    }}
    .prompt-text {{
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      cursor: pointer;
    }}
    .prompt-text.expanded {{
      -webkit-line-clamp: unset;
    }}
    .player-area {{
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}
    audio {{
      width: 100%;
      height: 38px;
      border-radius: 8px;
      outline: none;
      filter: invert(0.9) hue-rotate(180deg);
    }}
    .card-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 12px;
    }}
    .status-indicator {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
    }}
    .dot {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }}
    .dot-ready {{ background: #10b981; box-shadow: 0 0 8px #10b981; }}
    .dot-pending {{ background: #f59e0b; }}
    .dot-failed {{ background: #ef4444; }}
    .open-btn {{
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }}
    .open-btn:hover {{
      text-decoration: underline;
    }}
  </style>
</head>
<body>

  <header>
    <div class="header-content">
      <div class="brand">
        <span class="brand-badge">Aura & ACE-Step Studio</span>
        <h1 class="brand-title">Divergency / LF2 Audio Showcase (105 Cues)</h1>
      </div>
      <div style="display: flex; gap: 12px;">
        <a class="studio-btn" href="http://127.0.0.1:8765/" target="_blank">
          <span>🎧 Aura Studio Web Deck (8765)</span>
        </a>
        <a class="studio-btn" href="http://127.0.0.1:7865/" target="_blank" style="background: rgba(157, 78, 221, 0.15); border-color: rgba(157, 78, 221, 0.4); color: #c77dff;">
          <span>🎹 ACE-Step 3.5B (7865)</span>
        </a>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-val" id="totalCount">105</div>
        <div class="stat-lbl">Tổng âm thanh trong tài liệu</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" id="readyCount" style="color: #10b981;">0</div>
        <div class="stat-lbl">Đã sinh và sẵn sàng nghe</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" id="catCount">10</div>
        <div class="stat-lbl">Phân loại (Music, SFX, Loop...)</div>
      </div>
      <div class="stat-card">
        <div class="stat-val" style="color: #c77dff;">120 BPM</div>
        <div class="stat-lbl">D-Minor Arcade Sewer Matrix</div>
      </div>
    </div>

    <div class="filter-wrapper">
      <div class="search-box">
        <input type="text" id="searchInput" class="search-input" placeholder="🔍 Tìm kiếm âm thanh (vd: sword, arrow, combat_loop, step, bigmm, victory...)...">
      </div>
      <div class="category-tabs" id="categoryTabs">
        <!-- Rendered by JS -->
      </div>
    </div>

    <div class="catalog-grid" id="catalogGrid">
      <!-- Audio cards rendered by JS -->
    </div>
  </div>

  <script>
    const items = {items_json_str};
    let batchStatus = {status_json_str};
    let activeCategory = "ALL";
    let searchQuery = "";

    async function refreshStatus() {{
      try {{
        const res = await fetch('scripts/batch_status.json?t=' + Date.now());
        if (res.ok) {{
          batchStatus = await res.json();
          renderCards();
          updateStats();
        }}
      }} catch (e) {{}}
    }}

    function initCategories() {{
      const cats = ["ALL"];
      items.forEach(it => {{
        if (!cats.includes(it.category)) cats.push(it.category);
      }});

      const tabsContainer = document.getElementById("categoryTabs");
      tabsContainer.innerHTML = cats.map(cat => {{
        const count = cat === "ALL" ? items.length : items.filter(i => i.category === cat).length;
        return `<button class="tab-btn ${{cat === 'ALL' ? 'active' : ''}}" onclick="setCategory('${{cat}}')">${{cat}} (${{count}})</button>`;
      }}).join("");
    }}

    function setCategory(cat) {{
      activeCategory = cat;
      document.querySelectorAll(".tab-btn").forEach(btn => {{
        btn.classList.toggle("active", btn.textContent.startsWith(cat + " "));
      }});
      renderCards();
    }}

    document.getElementById("searchInput").addEventListener("input", (e) => {{
      searchQuery = e.target.value.toLowerCase().trim();
      renderCards();
    }});

    function updateStats() {{
      let ready = 0;
      items.forEach(it => {{
        if (batchStatus[it.stem] && batchStatus[it.stem].status === "success") {{
          ready++;
        }}
      }});
      document.getElementById("readyCount").textContent = ready;
    }}

    function renderCards() {{
      const grid = document.getElementById("catalogGrid");
      const filtered = items.filter(it => {{
        const matchCat = (activeCategory === "ALL" || it.category === activeCategory);
        const matchSearch = !searchQuery || 
          it.stem.toLowerCase().includes(searchQuery) ||
          it.prompt.toLowerCase().includes(searchQuery) ||
          it.category.toLowerCase().includes(searchQuery);
        return matchCat && matchSearch;
      }});

      if (filtered.length === 0) {{
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted);">Không tìm thấy âm thanh phù hợp với từ khóa "${{searchQuery}}"</div>`;
        return;
      }}

      grid.innerHTML = filtered.map(it => {{
        const st = batchStatus[it.stem] || {{}};
        const isReady = st.status === "success";
        const dotClass = isReady ? "dot-ready" : (st.status === "failed" ? "dot-failed" : "dot-pending");
        const statusText = isReady ? `Sẵn sàng (${{st.size_kb || '?'}} KB)` : (st.status === "failed" ? "Lỗi sinh" : "Đang tạo / Chờ lượt");
        const audioSrc = `content/gameplay/audio/${{it.file_name}}`;
        const unityPath = `C:/Users/Quang Huy Nugyen/LF2Revie/Assets/Sound/DevLogs/${{it.category}}/${{it.file_name}}`;

        return `
          <div class="audio-card">
            <div>
              <div class="card-top">
                <span class="cat-badge cat-${{it.category}}">${{it.category}}</span>
                <span class="dur-badge">${{it.target}}</span>
              </div>
              <div class="stem-title">${{it.file_name}}</div>
              <div class="prompt-text" title="Bấm để mở rộng prompt" onclick="this.classList.toggle('expanded')">${{it.prompt}}</div>
            </div>

            <div class="player-area">
              <audio controls preload="none">
                <source src="${{audioSrc}}" type="audio/wav">
                Trình duyệt của bạn không hỗ trợ audio element.
              </audio>
              <div class="card-footer">
                <div class="status-indicator">
                  <span class="dot ${{dotClass}}"></span>
                  <span style="color: ${{isReady ? '#10b981' : '#94a3b8'}};">${{statusText}}</span>
                </div>
                <a class="open-btn" href="${{audioSrc}}" target="_blank" download title="Tải file WAV">
                  <span>⬇ WAV</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }}).join("");
    }}

    initCategories();
    renderCards();
    updateStats();

    // Poll status every 4 seconds to update real-time
    setInterval(refreshStatus, 4000);
  </script>
</body>
</html>
"""

with open(OUT_HTML, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated showcase at: {OUT_HTML}")
