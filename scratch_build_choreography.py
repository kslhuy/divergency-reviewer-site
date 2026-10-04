from pathlib import Path

TARGET_DIR = Path(r"G:\.shortcut-targets-by-id\1WJviqQxEb0WZjNgexsemeSDcDN1Z0n5y\MY PROJCET\UI LF REVIVE\Synegy_test\deep-block-synergy")

CHOREOGRAPHY_CODE = """/* Deep x Block Synergy Choreography */
window.PREVIEW_SCENES = {
  // -------------------------------------------------------------
  // SCENE 1: HƯ KHÔNG ĐỊA CHẤN (SINGULARITY STOMP)
  // -------------------------------------------------------------
  'singularity-stomp': function(d, t, missed, scene) {
    const g = d.g;
    const ground = d.ground; // 292

    // Positions
    const blockX = 300;
    const enemyStartX = 540;
    const swordImpactX = 390;

    // --- BEAT 0: CHUẨN BỊ GOM TỤ (0.0s - 2.2s) ---
    // Block gathers, suction vortex active
    d.shadow(blockX, ground, 36);
    d.sprite('block', 'Gather', blockX, ground, t, {scale: 1.25, loop: true});
    d.label('BLOCK', blockX, ground + 22, '#38d9a9');

    // Suction VFX around Block
    const vortexPulse = (t * 4) % 1;
    for (let r = 20; r <= 90; r += 25) {
      const curR = (r + vortexPulse * 25) % 100;
      d.ring(blockX + 40, ground - 35, curR * 1.4, curR * 0.5, '#38d9a9', 1.5, 0.4 * (1 - curR / 100));
    }

    // Enemy movement (pulled towards x = 390)
    let enemyX = enemyStartX;
    let enemyY = ground;
    let enemyClip = 'Hurt';

    if (t < 2.2) {
      const pullP = d.smooth(d.seg(t, 0.2, 2.2));
      enemyX = d.mix(enemyStartX, 400, pullP);
      enemyClip = (t > 0.5) ? 'Hurt' : 'Idle';
    } else if (t < 4.5) {
      // Shaking at vortex center
      const shake = Math.sin(t * 30) * 3;
      enemyX = 400 + shake;
      enemyClip = 'Hurt';
    }

    // Deep movement
    let deepX = 160;
    let deepY = ground;
    let deepClip = 'Idle';

    if (t < 2.0) {
      deepClip = 'Idle';
      d.shadow(deepX, ground, 34);
      d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25, loop: true});
    } else if (t < 4.5) {
      // Deep runs then leaps
      if (t < 2.6) {
        const runP = d.seg(t, 2.0, 2.6);
        deepX = d.mix(160, 240, runP);
        deepClip = 'Run';
        d.shadow(deepX, ground, 34);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25, loop: true});
      } else {
        // High leap to throw sword
        const leapP = d.seg(t, 2.6, 4.5);
        deepX = d.mix(240, 360, d.smooth(leapP));
        const arcY = Math.sin(leapP * Math.PI) * 160;
        deepY = ground - arcY;
        deepClip = 'SkyStomp';
        d.shadow(deepX, ground, 24, 0.2);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25, loop: true});
      }
    }

    // --- BRANCH: MISSED vs HIT ---
    if (missed && t >= 3.8) {
      // Miss branch: premature explosion of vortex!
      d.event('LỆCH NHỊP: GOM HỤT CẮM KIẾM!');
      const missP = d.seg(t, 3.8, 5.0);
      d.burst(blockX + 40, ground - 35, missP, '#d7787e', 100);

      // Enemy gets blown away to the right
      const blowP = d.smooth(d.seg(t, 3.8, 6.0));
      enemyX = d.mix(400, 620, blowP);
      const enemyArc = Math.sin(blowP * Math.PI) * 50;
      enemyY = ground - enemyArc;
      enemyClip = (t > 5.5) ? 'Knockdown' : 'Launched';

      // Deep lands awkwardly
      if (t >= 4.5) {
        deepX = 360;
        deepY = ground;
        deepClip = 'Idle';
        d.shadow(deepX, ground, 34);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25, loop: true});
        // Sword lands in empty dirt
        d.sprite('vfx', 'Sword_Normal', 450, ground, 0, {scale: 1.25});
      }

      d.shadow(enemyX, ground, 30);
      d.sprite('enemy', enemyClip, enemyX, enemyY, t, {scale: 1.25, loop: true});
      d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
      d.label('DEEP', deepX, ground + 22, '#e07a5f');
      return;
    }

    // HIT BRANCH:
    if (!missed && t >= 4.5) {
      d.event('HƯ KHÔNG ĐỊA CHẤN: SPATIAL CRUSH!');

      // Impact explosion at t = 4.5
      const blastP = d.seg(t, 4.5, 6.0);
      d.burst(swordImpactX, ground - 20, blastP, '#38d9a9', 140);
      d.sparks(swordImpactX, ground - 20, t, '#f0b429', 24, 70);

      // Glass shatter spatial cracks
      if (t < 6.5) {
        g.save();
        g.strokeStyle = '#ffffff';
        g.lineWidth = 2.5;
        g.beginPath();
        g.moveTo(swordImpactX, ground);
        g.lineTo(swordImpactX - 60, ground - 80);
        g.lineTo(swordImpactX - 30, ground - 130);
        g.moveTo(swordImpactX, ground);
        g.lineTo(swordImpactX + 70, ground - 70);
        g.lineTo(swordImpactX + 110, ground - 120);
        g.moveTo(swordImpactX, ground);
        g.lineTo(swordImpactX, ground - 110);
        g.stroke();
        g.restore();
      }

      // Enemy launched skyward in armor-break stun
      const launchP = d.smooth(d.seg(t, 4.5, 6.8));
      enemyX = d.mix(400, 520, launchP);
      const eArc = Math.sin(launchP * Math.PI) * 140;
      enemyY = ground - eArc;
      enemyClip = (launchP > 0.85) ? 'Knockdown' : 'Launched';

      // Embedded Sword
      if (t < 7.5) {
        d.sprite('vfx', 'Sword_Charged', swordImpactX, ground, t, {scale: 1.25});
      }

      // Deep dives down to retrieve sword
      if (t < 7.5) {
        const diveP = d.smooth(d.seg(t, 4.5, 7.5));
        deepX = d.mix(360, swordImpactX - 20, diveP);
        deepY = ground;
        deepClip = 'Run';
        d.shadow(deepX, ground, 34);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25, loop: true});
      } else {
        // Deep retrieved sword and poses with slash
        deepX = swordImpactX - 10;
        deepY = ground;
        deepClip = 'Slash';
        d.shadow(deepX, ground, 34);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25});
        // Skull extraction burst
        d.burst(swordImpactX, ground - 40, d.seg(t, 7.5, 8.5), '#e07a5f', 80);
      }
    }

    // Draw enemy & labels
    d.shadow(enemyX, ground, 30);
    d.sprite('enemy', enemyClip, enemyX, enemyY, t, {scale: 1.25, loop: true});
    d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
    d.label('DEEP', deepX, ground + 22, '#e07a5f');
  },

  // -------------------------------------------------------------
  // SCENE 2: TUNG HỨNG ĐẢO CHIỀU (REVERSE ALLEY-OOP)
  // -------------------------------------------------------------
  'reverse-alley-oop': function(d, t, missed, scene) {
    const g = d.g;
    const ground = d.ground;

    // Deep launches at x = 320, Block covers behind at x = 160
    const deepBaseX = 320;
    const blockX = 160;

    let deepX = deepBaseX;
    let deepY = ground;
    let deepClip = 'UpStom';

    let enemyX = 370;
    let enemyY = ground;
    let enemyClip = 'Idle';

    let blockClip = 'Idle';

    // Deep shadow & base
    d.shadow(blockX, ground, 34);
    d.label('BLOCK (HỘ VỆ SAU LƯNG)', blockX, ground + 22, '#38d9a9');

    // --- BEAT 0 & 1: LAUNCH & AIR JUGGLE (0.0s - 4.5s) ---
    if (t < 2.5) {
      // Opening upward launch
      deepClip = 'UpStom';
      const launchP = d.smooth(d.seg(t, 0.5, 2.5));
      enemyX = d.mix(370, 360, launchP);
      enemyY = ground - Math.sin(launchP * Math.PI * 0.5) * 130;
      enemyClip = (t > 0.5) ? 'Launched' : 'Idle';

      // Red slash trail upward
      if (t > 0.4 && t < 1.4) {
        d.ring(350, ground - 50, 40, 70, '#ef4444', 3, 0.8, -Math.PI * 0.5, Math.PI * 0.2);
      }
      blockClip = 'Idle';
    } else if (t < 4.6) {
      // Aerial juggle in midair
      deepClip = 'UpStom';
      deepY = ground - 80;
      deepX = 340;
      const airP = d.seg(t, 2.5, 4.4);
      enemyX = 350 + Math.sin(airP * Math.PI * 4) * 10;
      enemyY = ground - 130 + Math.cos(airP * Math.PI * 4) * 8;
      enemyClip = 'Launched';
      d.sparks(enemyX, enemyY, t, '#f59e0b', 12, 30);

      // Block prepares to catch
      blockClip = (t > 3.8) ? 'Guard' : 'Idle';
    }

    // Deep's Reverse Hit at t = 4.4
    if (t >= 4.4 && t < 5.0) {
      // Reverse hammer blow!
      deepClip = 'Slash';
      deepY = ground;
      deepX = 320;
      // Enemy flying backwards towards Block!
      const revP = d.smooth(d.seg(t, 4.4, 5.0));
      enemyX = d.mix(350, blockX + 60, revP);
      enemyY = d.mix(ground - 130, ground - 35, revP);
      enemyClip = 'Launched';
      d.line([[350, ground - 130], [blockX + 60, ground - 35]], '#ffffff', 2, 0.7);
    }

    // --- BRANCH: MISSED vs HIT ---
    if (missed && t >= 4.6) {
      d.event('LỆCH NHỊP: HỤT ĐIỂM RƠI SAU LƯNG!');
      // Block punched prematurely at air
      blockClip = 'SpatialPunch';
      // Enemy flies past Block and crashes behind
      const missFlyP = d.smooth(d.seg(t, 4.6, 6.5));
      enemyX = d.mix(blockX + 60, blockX - 100, missFlyP);
      enemyY = ground;
      enemyClip = 'Knockdown';

      d.sprite('block', blockClip, blockX, ground, t, {scale: 1.25});
      d.shadow(deepX, ground, 34);
      d.sprite('deep', 'Idle', deepX, ground, t, {scale: 1.25});
      d.shadow(enemyX, ground, 30);
      d.sprite('enemy', enemyClip, enemyX, enemyY, t, {scale: 1.25});
      d.label('DEEP', deepX, ground + 22, '#e07a5f');
      d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
      return;
    }

    // HIT BRANCH: Block Spatial Punch Rebound!
    if (!missed && t >= 5.0) {
      d.event('CÚ ĐẬP KHÔNG GIAN: SPATIAL ALLEY-OOP!');
      blockClip = 'SpatialPunch';

      // Impact on Block's fist at t = 5.0
      const impactP = d.seg(t, 5.0, 6.2);
      d.burst(blockX + 50, ground - 35, impactP, '#ffffff', 100);

      // Glass shatter lines at Block's fist
      if (t < 6.8) {
        g.save();
        g.strokeStyle = '#ffffff';
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(blockX + 50, ground - 35);
        g.lineTo(blockX + 85, ground - 65);
        g.moveTo(blockX + 50, ground - 35);
        g.lineTo(blockX + 90, ground - 10);
        g.stroke();
        g.restore();
      }

      // Enemy propelled BACKWARD towards Deep!
      const reboundP = d.smooth(d.seg(t, 5.0, 7.2));
      enemyX = d.mix(blockX + 60, deepBaseX + 40, reboundP);
      enemyY = ground - Math.sin(reboundP * Math.PI) * 60;
      enemyClip = 'Launched';

      // Deep lands and prepares sweeping finisher
      if (t >= 7.2) {
        deepClip = 'Slash';
        enemyX = d.mix(deepBaseX + 40, 580, d.smooth(d.seg(t, 7.2, 9.0)));
        enemyY = ground;
        enemyClip = 'Knockdown';
        d.burst(deepBaseX + 40, ground - 35, d.seg(t, 7.2, 8.2), '#e07a5f', 90);
      } else {
        deepClip = 'Idle';
      }
    }

    d.sprite('block', blockClip, blockX, ground, t, {scale: 1.25});
    d.shadow(deepX, ground, 34);
    d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25});
    d.shadow(enemyX, ground, 30);
    d.sprite('enemy', enemyClip, enemyX, enemyY, t, {scale: 1.25});
    d.label('DEEP', deepX, ground + 22, '#e07a5f');
    d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
  },

  // -------------------------------------------------------------
  // SCENE 3: LÔI NGỤC CỘT KIẾM (THUNDER PYLON)
  // -------------------------------------------------------------
  'thunder-pylon': function(d, t, missed, scene) {
    const g = d.g;
    const ground = d.ground;

    const swordX = 380;
    let blockX = 140;
    let deepX = 220;
    let enemyX = 460;
    let enemyY = ground;
    let enemyClip = 'Idle';

    // --- BEAT 0: CẮM MỐC CHIẾN THUẬT (0.0s - 2.4s) ---
    if (t < 2.4) {
      // Deep throws sword
      const throwP = d.smooth(d.seg(t, 0.4, 1.8));
      deepX = d.mix(220, 260, throwP);
      d.shadow(deepX, ground, 34);
      d.sprite('deep', (t < 1.4) ? 'SkyStomp' : 'Idle', deepX, ground, t, {scale: 1.25});

      if (t >= 1.4) {
        d.sprite('vfx', 'Sword_Normal', swordX, ground, t, {scale: 1.25});
        d.burst(swordX, ground - 10, d.seg(t, 1.4, 2.2), '#f59e0b', 60);
      }
      d.shadow(blockX, ground, 34);
      d.sprite('block', 'Idle', blockX, ground, t, {scale: 1.25});
    } else if (t < 5.2) {
      // Block transforms to Lightning & dashes to sword hilt
      const dashP = d.smooth(d.seg(t, 2.4, 4.0));
      blockX = d.mix(140, swordX - 35, dashP);

      d.shadow(deepX, ground, 34);
      d.sprite('deep', 'Idle', deepX, ground, t, {scale: 1.25});

      // Lightning crackling on Block
      d.sparks(blockX, ground - 40, t, '#facc15', 16, 40);
      d.shadow(blockX, ground, 34);
      d.sprite('block', 'Lightning', blockX, ground, t, {scale: 1.25, loop: true});

      d.sprite('vfx', 'Sword_Normal', swordX, ground, t, {scale: 1.25});
    }

    // --- BRANCH: MISSED vs HIT ---
    if (missed && t >= 4.5) {
      d.event('LỆCH NHỊP: MẤT ĐIỆN TÍCH CỘT THU LÔI!');
      // Block fails to hit sword in time
      d.shadow(blockX, ground, 34);
      d.sprite('block', 'Idle', blockX, ground, t, {scale: 1.25});
      d.shadow(deepX, ground, 34);
      d.sprite('deep', 'Run', d.mix(260, swordX, d.smooth(d.seg(t, 5.0, 7.0))), ground, t, {scale: 1.25});
      d.sprite('vfx', 'Sword_Normal', swordX, ground, t, {scale: 1.25});

      d.shadow(enemyX, ground, 30);
      d.sprite('enemy', 'Idle', enemyX, ground, t, {scale: 1.25});
      d.label('BLOCK', blockX, ground + 22, '#38d9a9');
      d.label('DEEP', deepX, ground + 22, '#e07a5f');
      d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
      return;
    }

    // HIT BRANCH: Lightning Rod Discharge & Sweeping Finisher
    if (!missed && t >= 5.2) {
      d.event('LÔI NGỤC TƯƠNG TÁC: THUNDER ROD DISCHARGE!');

      // Active charged sword
      if (t < 8.0) {
        d.sprite('vfx', 'Sword_Charged', swordX, ground, t, {scale: 1.25});
        // Giant 360 electric lightning field
        d.ring(swordX, ground - 30, 80 + Math.sin(t * 15) * 10, 35 + Math.cos(t * 15) * 5, '#facc15', 2.5, 0.8);
        d.ring(swordX, ground - 30, 130 + Math.cos(t * 12) * 15, 55 + Math.sin(t * 12) * 8, '#38bdf8', 1.5, 0.6);
        d.sparks(swordX, ground - 30, t, '#facc15', 28, 90);

        // Enemy paralyzed in lightning stun
        enemyClip = 'Hurt';
        enemyX = 460 + Math.sin(t * 40) * 4;
        d.sparks(enemyX, ground - 30, t, '#38bdf8', 10, 30);

        // Deep dashes forward to retrieve
        const grabP = d.smooth(d.seg(t, 6.0, 8.0));
        deepX = d.mix(260, swordX - 15, grabP);
        d.shadow(deepX, ground, 34);
        d.sprite('deep', 'Run', deepX, ground, t, {scale: 1.25, loop: true});
      } else {
        // Deep wields supercharged sword in massive sweeping crescent slash!
        deepX = swordX + 20;
        deepY = ground;
        d.shadow(deepX, ground, 34);
        d.sprite('deep', 'Slash', deepX, deepY, t, {scale: 1.25});

        // Electric crescent wave
        const slashP = d.seg(t, 8.0, 9.5);
        d.burst(deepX + 30, ground - 35, slashP, '#facc15', 120);
        d.ring(deepX + 40, ground - 35, 90 * slashP, 40 * slashP, '#38bdf8', 3, 1 - slashP);

        // Enemy blown away
        const blowP = d.smooth(d.seg(t, 8.0, 10.0));
        enemyX = d.mix(460, 640, blowP);
        enemyClip = (t > 9.2) ? 'Knockdown' : 'Launched';
      }

      d.shadow(blockX, ground, 34);
      d.sprite('block', 'Lightning', blockX, ground, t, {scale: 1.25, loop: true});
    }

    d.shadow(enemyX, ground, 30);
    d.sprite('enemy', enemyClip, enemyX, enemyY, t, {scale: 1.25, loop: true});
    d.label('BLOCK', blockX, ground + 22, '#38d9a9');
    d.label('DEEP', deepX, ground + 22, '#e07a5f');
    d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
  },

  // -------------------------------------------------------------
  // SCENE 4: BỆ PHÓNG CẢM TỬ: THIÊN PHẠT TRẢM (ORBITAL DUNK)
  // -------------------------------------------------------------
  'orbital-dunk': function(d, t, missed, scene) {
    const g = d.g;
    const ground = d.ground;

    const blockX = 260;
    let deepX = 100;
    let deepY = ground;
    let deepClip = 'Run';

    let enemyX = 520;
    let enemyY = ground;
    let enemyClip = 'Idle';

    // Block in Vault pose
    d.shadow(blockX, ground, 36);
    d.sprite('block', (t > 2.3 && t < 3.2) ? 'SpatialPunch' : 'Vault', blockX, ground, t, {scale: 1.25});
    d.label('BLOCK (BỆ PHÓNG VAJRA)', blockX, ground + 22, '#38d9a9');

    // --- BEAT 0: DÀN THẾ BỆ ĐỠ & RUN UP (0.0s - 2.2s) ---
    if (t < 2.2) {
      const runP = d.seg(t, 0.0, 2.2);
      deepX = d.mix(100, blockX - 25, runP);
      deepClip = 'Run';
      d.shadow(deepX, ground, 34);
      d.sprite('deep', deepClip, deepX, ground, t, {scale: 1.25, loop: true});
    }

    // --- BRANCH: MISSED vs HIT ---
    if (missed && t >= 3.8) {
      d.event('LỆCH NHỊP: HỤT BỆ PHÓNG CẢM TỬ!');
      // Low stumbling jump
      const tripP = d.smooth(d.seg(t, 2.2, 4.5));
      deepX = d.mix(blockX, 360, tripP);
      deepY = ground - Math.sin(tripP * Math.PI) * 40;
      deepClip = (t > 4.2) ? 'Idle' : 'Jump';

      d.shadow(deepX, ground, 30);
      d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25});
      d.shadow(enemyX, ground, 30);
      d.sprite('enemy', 'Idle', enemyX, ground, t, {scale: 1.25});
      d.label('DEEP', deepX, ground + 22, '#e07a5f');
      d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
      return;
    }

    // HIT BRANCH: Sky Rocket Launch & Cataclysmic Orbital Dunk!
    if (!missed && t >= 2.2) {
      if (t < 4.8) {
        // Vault launch trigger at t = 2.3
        if (t > 2.2 && t < 2.8) {
          d.burst(blockX + 10, ground - 25, d.seg(t, 2.2, 2.8), '#38d9a9', 70);
        }

        // Deep rockets skyward to y = 45!
        const launchP = d.smooth(d.seg(t, 2.2, 3.4));
        deepX = d.mix(blockX, 390, launchP);
        deepY = d.mix(ground, 45, launchP);
        deepClip = 'Dunk';

        // Spin energy aura on peak
        if (t > 3.4) {
          d.ring(deepX, deepY - 30, 45, 20, '#e07a5f', 3, 0.9);
          d.sparks(deepX, deepY - 30, t, '#f59e0b', 20, 50);
          d.event('THIÊN PHẠT: ORBITAL CATACLYSM DUNK!');
        }

        d.shadow(deepX, ground, 20, 0.15);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25});
      } else if (t < 7.8) {
        // Diving hammer slam downward into target at x = 500!
        const diveP = d.smooth(d.seg(t, 4.8, 5.6));
        deepX = d.mix(390, 500, diveP);
        deepY = d.mix(45, ground, diveP);
        deepClip = 'Dunk';

        // Earth split explosion at t = 5.6!
        if (t >= 5.6) {
          const impactP = d.seg(t, 5.6, 7.2);
          d.burst(500, ground, impactP, '#e07a5f', 160);
          d.sparks(500, ground - 20, t, '#f59e0b', 32, 90);

          // Massive ground crack lines
          g.save();
          g.strokeStyle = '#f59e0b';
          g.lineWidth = 4;
          g.beginPath();
          g.moveTo(500, ground);
          g.lineTo(340, ground);
          g.moveTo(500, ground);
          g.lineTo(680, ground);
          g.moveTo(500, ground);
          g.lineTo(470, ground + 20);
          g.moveTo(500, ground);
          g.lineTo(540, ground + 18);
          g.stroke();
          g.restore();

          // Enemy blasted into air
          const blowP = d.smooth(d.seg(t, 5.6, 7.5));
          enemyX = d.mix(520, 620, blowP);
          enemyY = ground - Math.sin(blowP * Math.PI) * 150;
          enemyClip = 'Launched';
        }

        d.shadow(deepX, ground, 34);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25});
      } else {
        // Deep landing in crater triumphantly
        deepX = 500;
        deepY = ground;
        deepClip = 'Idle';
        d.shadow(deepX, ground, 34);
        d.sprite('deep', deepClip, deepX, deepY, t, {scale: 1.25});

        enemyX = 640;
        enemyY = ground;
        enemyClip = 'Knockdown';
        d.event('HOÀN TẤT: THIÊN PHẠT BỔ TRẢM!');
      }
    }

    d.shadow(enemyX, ground, 30);
    d.sprite('enemy', enemyClip, enemyX, enemyY, t, {scale: 1.25});
    d.label('DEEP', deepX, ground + 22, '#e07a5f');
    d.label('BASTONNE GUARD', enemyX, ground + 22, '#94a3b8');
  }
};
"""

def write_choreography():
    (TARGET_DIR / "choreography.js").write_text(CHOREOGRAPHY_CODE, encoding="utf-8")
    print("choreography.js written.")

if __name__ == "__main__":
    write_choreography()
