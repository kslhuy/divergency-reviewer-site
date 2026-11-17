import os

HTML_CONTENT = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hangar J4 Harbor Trilogy Studio — Divergency / LF Revive</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0d0f14;
      --panel: #161a23;
      --panel-border: #262c3d;
      --accent-orange: #ff6b35;
      --accent-crimson: #e63946;
      --accent-teal: #1d7874;
      --accent-gold: #f4a261;
      --accent-purple: #9333ea;
      --text: #e2e8f0;
      --text-dim: #94a3b8;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    /* Top Bar */
    header {
      background: rgba(22, 26, 35, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--panel-border);
      padding: 14px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      letter-spacing: 1.5px;
      color: #fff;
    }

    .brand-badge {
      background: linear-gradient(135deg, var(--accent-orange), var(--accent-crimson));
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 1px;
    }

    .stats-bar {
      display: flex;
      gap: 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: var(--text-dim);
    }

    .stat-item span {
      color: var(--accent-gold);
      font-weight: 600;
    }

    /* Navigation for 3 Screens */
    .screen-nav {
      display: flex;
      gap: 8px;
      background: rgba(13, 15, 20, 0.8);
      padding: 4px;
      border-radius: 8px;
      border: 1px solid var(--panel-border);
    }

    .screen-tab {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .screen-tab.active {
      background: var(--accent-orange);
      color: #fff;
    }

    /* Main Container */
    main {
      flex: 1;
      padding: 24px;
      max-width: 1700px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Viewport Frame */
    .viewport-card {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
    }

    .viewport-header {
      padding: 12px 20px;
      background: rgba(13, 15, 20, 0.85);
      border-bottom: 1px solid var(--panel-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .viewport-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--accent-gold);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .viewport-title::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }

    /* Panoramic Stage Canvas */
    .pano-viewport {
      position: relative;
      width: 100%;
      height: 580px;
      background: #000;
      overflow: hidden;
      cursor: grab;
      user-select: none;
    }

    .pano-viewport:active {
      cursor: grabbing;
    }

    .pano-track {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      display: flex;
      will-change: transform;
      transition: transform 0.1s linear;
    }

    .pano-img {
      height: 100%;
      width: auto;
      object-fit: cover;
      image-rendering: pixelated;
    }

    /* Overlays for Combat Zones */
    .overlay-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      transition: opacity 0.25s;
    }

    .zone-box {
      position: absolute;
      border: 2px dashed;
      border-radius: 6px;
      padding: 6px 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      backdrop-filter: blur(2px);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Controls Grid */
    .controls-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }

    .panel-box {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .panel-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--accent-orange);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* 3 Screen Cards */
    .screens-preview-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .screen-card {
      background: rgba(13, 15, 20, 0.6);
      border: 1px solid var(--panel-border);
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.2s;
    }

    .screen-card:hover {
      border-color: var(--accent-orange);
      transform: translateY(-2px);
    }

    .screen-card.active {
      border-color: var(--accent-orange);
      box-shadow: 0 0 16px rgba(255, 107, 53, 0.3);
    }

    .screen-card img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      image-rendering: pixelated;
      display: block;
    }

    .screen-card-info {
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .screen-card-title {
      font-size: 12px;
      font-weight: 700;
      color: #fff;
    }

    .screen-card-desc {
      font-size: 11px;
      color: var(--text-dim);
      line-height: 1.3;
    }

    /* Pan Slider */
    .pan-bar {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 10px;
      border-top: 1px solid var(--panel-border);
    }

    .pan-header {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-dim);
    }

    input[type=range] {
      width: 100%;
      accent-color: var(--accent-orange);
      height: 6px;
      border-radius: 3px;
      background: #334155;
    }

    /* Stage Progression Timeline */
    .timeline-steps {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .step-btn {
      background: rgba(13, 15, 20, 0.6);
      border: 1px solid var(--panel-border);
      border-radius: 8px;
      padding: 10px 14px;
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s;
    }

    .step-btn:hover {
      background: rgba(255, 107, 53, 0.1);
      border-color: var(--accent-orange);
    }

    .step-btn.active {
      background: linear-gradient(90deg, rgba(255, 107, 53, 0.2), rgba(230, 57, 70, 0.2));
      border-color: var(--accent-orange);
      color: #fff;
    }

    .step-num {
      width: 22px;
      height: 22px;
      background: var(--panel-border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      flex-shrink: 0;
    }

    .step-btn.active .step-num {
      background: var(--accent-orange);
      color: #fff;
    }

    /* Switch */
    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #334155; transition: .3s; border-radius: 24px;
    }
    .slider:before {
      position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
      background-color: white; transition: .3s; border-radius: 50%;
    }
    input:checked + .slider { background-color: var(--accent-orange); }
    input:checked + .slider:before { transform: translateX(20px); }

    footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: var(--text-dim);
      border-top: 1px solid var(--panel-border);
    }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <div class="brand-title">DIVERGENCY HARBOR TRILOGY</div>
      <div class="brand-badge">STAGE 1-3 PANORAMIC BATTLEFIELD</div>
    </div>

    <div class="screen-nav">
      <button class="screen-tab" onclick="jumpTo(0)">MÀN 1: KHU KHO CONTAINER</button>
      <button class="screen-tab active" onclick="jumpTo(1)">MÀN 2: CẦU TÀU J4 (1v1 &amp; QUÁI HOA)</button>
      <button class="screen-tab" onclick="jumpTo(2)">MÀN 3: CẦU PHAO CA-NÔ TUẦN TRA</button>
      <button class="screen-tab" onclick="jumpTo(-1)">TOÀN CẢNH (PANORAMA)</button>
    </div>

    <div class="stats-bar">
      <div class="stat-item">TỔNG CHIỀU DÀI: <span>4128 × 768 PX (3 MÀN)</span></div>
      <div class="stat-item">REF STYLE: <span>marseille_late.png</span></div>
    </div>
  </header>

  <main>
    <!-- Viewport Area -->
    <div class="viewport-card">
      <div class="viewport-header">
        <div class="viewport-title" id="stageTitle">
          Màn 2: Cầu Tàu Hangar J4 (Tâm Điểm Đại Hỗn Chiến &amp; Đấu 1v1)
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text-dim);">
          Drag chuột hoặc kéo Slider để cuộn máy quay xuyên suốt 4128px chiến trường
        </div>
      </div>

      <div class="pano-viewport" id="panoViewport">
        <div class="pano-track" id="panoTrack" style="transform: translateX(-1376px);">
          <img src="imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/hangar_j4_panoramic_battle_scroll.png" class="pano-img" id="panoImg" alt="Panoramic Battle Scroll">
        </div>
      </div>
    </div>

    <!-- Controls & Specs Grid -->
    <div class="controls-grid">
      <!-- Left Panel: 3-Screen Architecture -->
      <div class="panel-box">
        <div class="panel-title">
          <span>🗺️ CẤU TRÚC 3 MÀN LIÊN HOÀN (4128px BATTLE SCROLL)</span>
        </div>

        <div class="screens-preview-row">
          <!-- Card 1 -->
          <div class="screen-card" id="card0" onclick="jumpTo(0)">
            <img src="imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/screen_1_container_rail_depot.png" alt="Screen 1">
            <div class="screen-card-info">
              <div class="screen-card-title">1. TIỀN TUYẾN: KHU KHO CONTAINER</div>
              <div class="screen-card-desc">Cửa ra cống ngầm, giàn cẩu khổng lồ, đường ray hàng hóa &amp; lính phục kích của Bruno.</div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="screen-card active" id="card1" onclick="jumpTo(1)">
            <img src="imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/screen_2_wharf_climax_arena.png" alt="Screen 2">
            <div class="screen-card-info">
              <div class="screen-card-title">2. TÂM BÃO: CẦU TÀU HANGAR J4</div>
              <div class="screen-card-desc">3 xe sedan bọc thép Don Malo, đấu 1v1 Deep vs Bruno, MuCEM xả clo, 4 họng cống Quái Hoa trào dâng!</div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="screen-card" id="card2" onclick="jumpTo(2)">
            <img src="imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/screen_3_slipway_patrol_dock.png" alt="Screen 3">
            <div class="screen-card-info">
              <div class="screen-card-title">3. HẬU PHƯƠNG: BẾN CA-NÔ &amp; ĐÊ CHẮN</div>
              <div class="screen-card-desc">Đê tetrapod chắn sóng, tháp đèn pha quét biển, cướp ca-nô cao tốc vũ trang mở đường máu sang MuCEM.</div>
            </div>
          </div>
        </div>

        <!-- Pan Slider -->
        <div class="pan-bar">
          <div class="pan-header">
            <span>TỌA ĐỘ CAMERA SCROLL (X):</span>
            <span id="coordVal">X: 1376 PX (MÀN 2)</span>
          </div>
          <input type="range" id="panSlider" min="0" max="2752" value="1376" step="8" oninput="applyPan(this.value)">
        </div>
      </div>

      <!-- Right Panel: Mission Progression -->
      <div class="panel-box">
        <div class="panel-title">
          <span>⚔️ NHỊP ĐỘ CHIẾN DỊCH BẾN CẢNG</span>
        </div>

        <div class="timeline-steps">
          <div class="step-btn" onclick="jumpTo(0)">
            <div class="step-num">1</div>
            <div>
              <strong>Giai đoạn 1: Mở đường máu bãi Container</strong><br>
              <span style="font-size: 11px; color: var(--text-dim);">Dọn lính súng tỉa trên container &amp; creep Áo Đen tuần tra</span>
            </div>
          </div>

          <div class="step-btn active" onclick="jumpTo(1)">
            <div class="step-num">2</div>
            <div>
              <strong>Giai đoạn 2: Đấu 1v1 &amp; Cơn lũ Quái Hoa</strong><br>
              <span style="font-size: 11px; color: var(--text-dim);">Quyết đấu Bruno ➔ MuCEM xả hóa chất ➔ 4 cống ngầm phun trào</span>
            </div>
          </div>

          <div class="step-btn" onclick="jumpTo(2)">
            <div class="step-num">3</div>
            <div>
              <strong>Giai đoạn 3: Rượt đuổi đê biển &amp; Cướp Ca-nô</strong><br>
              <span style="font-size: 11px; color: var(--text-dim);">Don Malo hóa Bọ Hung ủi sập đê, tiêu diệt trùm &amp; phóng ca-nô</span>
            </div>
          </div>
        </div>

        <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--text-dim); background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; line-height: 1.5;">
          💾 <strong>File Toàn Cảnh Độ Phân Giải Gốc (4128x768):</strong><br>
          <code>imgs/Stage1/chap1/marseille_stages/hangar_j4_pier/hangar_j4_panoramic_battle_scroll.png</code>
        </div>
      </div>
    </div>
  </main>

  <footer>
    Divergency Harbor Battlefield Trilogy — Continuous 3-Screen Beat 'em Up Panoramic Scroll
  </footer>

  <script>
    const track = document.getElementById('panoTrack');
    const slider = document.getElementById('panSlider');
    const coordVal = document.getElementById('coordVal');
    const stageTitle = document.getElementById('stageTitle');
    const tabs = document.querySelectorAll('.screen-tab');
    const cards = document.querySelectorAll('.screen-card');

    const TITLES = [
      "Màn 1: Khu Kho Bãi Container & Giàn Cẩu Ga Hàng J3 (Tiền Tuyến Phục Kích)",
      "Màn 2: Cầu Tàu Hangar J4 (Tâm Điểm Đại Hỗn Chiến & Đấu 1v1)",
      "Màn 3: Bến Ca-nô Quân Sự & Đê Chắn Sóng (Điểm Kết Chiến Dịch & Phóng Ca-nô)"
    ];

    function applyPan(x) {
      const offset = -parseFloat(x);
      track.style.transform = `translateX(${offset}px)`;
      coordVal.innerText = `X: ${x} PX`;

      const screenIdx = Math.min(2, Math.floor(x / 1100));
      stageTitle.innerText = TITLES[screenIdx];

      cards.forEach((c, i) => c.classList.toggle('active', i === screenIdx));
      tabs.forEach((t, i) => t.classList.toggle('active', i === screenIdx));
    }

    function jumpTo(idx) {
      if (idx === -1) {
        // Zoom out or show full
        track.style.transform = 'scale(0.33) translateX(0px)';
        track.style.transformOrigin = 'top left';
        return;
      }
      track.style.transformOrigin = 'top left';
      const targetX = idx * 1376;
      slider.value = targetX;
      applyPan(targetX);
    }

    // Drag to pan
    const viewport = document.getElementById('panoViewport');
    let isDown = false;
    let startX = 0;
    let currentX = 1376;

    viewport.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX;
      currentX = parseFloat(slider.value);
    });

    window.addEventListener('mouseup', () => { isDown = false; });

    viewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = (e.pageX - startX) * 1.5;
      let targetX = currentX - walk;
      if (targetX < 0) targetX = 0;
      if (targetX > 2752) targetX = 2752;
      slider.value = targetX;
      applyPan(targetX);
    });
  </script>
</body>
</html>
"""

with open("hangar_j4_map_studio.html", "w", encoding="utf-8") as f:
    f.write(HTML_CONTENT)

print("Updated hangar_j4_map_studio.html with 3-screen panoramic battle scroll!")
