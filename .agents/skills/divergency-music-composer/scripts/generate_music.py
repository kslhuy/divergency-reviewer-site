import requests
import json
import time
import sys
import os
import shutil
import argparse
from ensure_server import start_server, is_server_running, is_studio_running

# Configure UTF-8 stdout if possible on Windows
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

STUDIO_GEN_DIR = r"C:\Users\Quang Huy Nugyen\Videos\Marketting_game\Music_SoundFX_MrLinken91\Music_SoundFX_MrLinken91\output\generated"

def sync_to_studio(file_path, prompt, mode="acestep", duration=45.0):
    """Sync newly created audio file and metadata to Aura Studio history."""
    try:
        if not os.path.exists(STUDIO_GEN_DIR):
            os.makedirs(STUDIO_GEN_DIR, exist_ok=True)
        base_name = os.path.basename(file_path)
        dest = os.path.join(STUDIO_GEN_DIR, base_name)
        if os.path.abspath(file_path) != os.path.abspath(dest):
            shutil.copy2(file_path, dest)
        
        # Save companion JSON for history & presets inspection
        meta_dest = os.path.splitext(dest)[0] + ".json"
        meta = {
            "id": os.path.splitext(base_name)[0],
            "engine": mode,
            "mode": mode,
            "prompt": prompt,
            "duration": duration,
            "file": base_name,
            "created_at": time.time(),
        }
        with open(meta_dest, "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)
        print(f"[+] Dong bo vao Aura Studio Library: {dest}")
    except Exception as e:
        print(f"[*] Note: Could not sync to Aura Studio: {e}")

def generate_sfx_or_ambient(prompt, mode="soundfx", duration=3.0, steps=10, 
                            cfg_scale=3.5, output_name=None, output_dir=None, audio_format="wav"):
    """Tao hieu ung am thanh (SFX) hoac Vong lap Ambient qua Aura Studio Engine."""
    studio_url = "http://127.0.0.1:8765"
    if not is_studio_running():
        print("[*] Aura Studio (port 8765) chua mo. Dang khoi dong...")
        start_server(prefer_studio=True)
        time.sleep(3)

    if not output_dir:
        output_dir = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\content\gameplay\audio"
    os.makedirs(output_dir, exist_ok=True)

    if not output_name:
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        prefix = "sfx" if mode == "soundfx" else "ambient"
        output_name = f"{prefix}_{timestamp}"
    
    if not output_name.endswith(f".{audio_format}"):
        output_file_name = f"{output_name}.{audio_format}"
    else:
        output_file_name = output_name
    
    destination_path = os.path.join(output_dir, output_file_name)

    payload = {
        "engine": "stable_audio",
        "mode": "soundfx" if mode == "soundfx" else "music",
        "prompt": prompt,
        "negative_prompt": "vocals, speech, noise" if mode == "soundfx" else "",
        "duration": float(duration),
        "steps": int(steps),
        "cfg_scale": float(cfg_scale),
        "guidance_scale": float(cfg_scale),
        "format": audio_format,
        "normalize": True,
        "seamless_loop": (mode != "soundfx"),
        "output_dir": "generated"
    }

    print(f"\n=======================================================")
    print(f"[*] Khoi tao tac vu tao Sound FX / Ambient qua Aura Studio:")
    print(f"    - Mode: {mode.upper()} | Output: {destination_path}")
    print(f"    - Thoi luong: {duration}s | Steps: {steps} | CFG: {cfg_scale}")
    print(f"    - Prompt: {prompt}")
    print(f"=======================================================", flush=True)

    try:
        gen_res = requests.post(f"{studio_url}/api/generate", json=payload, timeout=10)
        if gen_res.status_code != 200:
            print(f"[!] Loi khi gui lenh toi Aura Studio: {gen_res.status_code} - {gen_res.text}")
            return None
        
        # Poll progress
        for _ in range(60):
            time.sleep(1.5)
            p = requests.get(f"{studio_url}/api/progress", timeout=5).json()
            pct = p.get("percent", 0)
            stg = p.get("stage", "running")
            print(f"[*] Tien trinh: {pct}% ({stg}) - {p.get('message', '')}", flush=True)
            if not p.get("active"):
                if p.get("stage") == "completed" and p.get("output_url"):
                    download_url = f"{studio_url}{p['output_url']}"
                    r = requests.get(download_url, timeout=30)
                    if r.status_code == 200:
                        with open(destination_path, "wb") as f:
                            f.write(r.content)
                        size_mb = len(r.content) / (1024 * 1024)
                        print(f"[V] DA LUU THANH CONG: {destination_path} ({size_mb:.2f} MB)")
                        sync_to_studio(destination_path, prompt, mode=mode, duration=duration)
                        return {
                            "status": "success",
                            "file_path": destination_path,
                            "file_size_mb": size_mb,
                            "duration": duration,
                            "mode": mode,
                            "prompt": prompt,
                            "studio_url": studio_url
                        }
                else:
                    print(f"[!] Tac vu that bai: {p.get('error') or p.get('message')}")
                    return None
        print("[!] Het thoi gian cho tao am thanh.")
        return None
    except Exception as exc:
        print(f"[!] Ngoai le khi tao SFX: {exc}")
        return None

def generate_music(prompt, lyrics="[instrumental]", duration=45.0, infer_steps=50, 
                   guidance_scale=15.0, output_name=None, output_dir=None, audio_format="wav", seed=-1):
    # 1. Tu dong kiem tra va khoi dong server neu chua chay
    if not start_server():
        print("[!] Khong the ket noi hoac khoi dong server ACE-Step.")
        return None

    # 2. Chuan bi thu muc luu file
    if not output_dir:
        output_dir = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\content\gameplay\audio"
    os.makedirs(output_dir, exist_ok=True)

    if not output_name:
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        output_name = f"ost_{timestamp}"
    
    if not output_name.endswith(f".{audio_format}"):
        output_file_name = f"{output_name}.{audio_format}"
    else:
        output_file_name = output_name
    
    destination_path = os.path.join(output_dir, output_file_name)

    actual_seeds = [int(seed)] if seed >= 0 else None

    # 3. Cau hinh payload theo dung Gradio 5 API cua ACE-Step
    url = "http://127.0.0.1:7865/gradio_api/call/__call__"
    payload = {
        "data": [
            audio_format,                   # format ('wav', 'mp3', 'flac', 'ogg')
            float(duration),                # audio_duration (-1 or float)
            prompt,                         # Tags (Prompt)
            lyrics,                         # Lyrics ([instrumental] for non-vocal)
            int(infer_steps),               # Infer Steps (30 - 60 recommended)
            float(guidance_scale),          # Guidance Scale (12.0 - 18.0)
            "euler",                        # Scheduler Type ('euler')
            "apg",                          # CFG Type ('apg')
            10.0,                           # Granularity Scale
            actual_seeds,                   # manual seeds
            0.5,                            # Guidance Interval
            0.0,                            # Guidance Interval Decay
            3.0,                            # Min Guidance Scale
            True,                           # use ERG for tag
            False,                          # use ERG for lyric
            True,                           # use ERG for diffusion
            None,                           # OSS Steps
            0.0,                            # Guidance Scale Text
            0.0,                            # Guidance Scale Lyric
            False,                          # Enable Audio2Audio
            0.5,                            # Refer audio strength
            None,                           # Reference Audio
            "none",                         # Lora Name or Path
            1.0                             # Lora weight
        ]
    }

    print(f"\n=======================================================")
    print(f"[*] Khoi tao tac vu tao nhac voi ACE-Step 3.5B:")
    print(f"    - File dau ra: {destination_path}")
    print(f"    - Thoi luong: {duration}s | Steps: {infer_steps} | Guidance: {guidance_scale}")
    print(f"    - Lyrics/Che do: {lyrics}")
    print(f"    - Tags/Prompt: {prompt}")
    print(f"=======================================================", flush=True)

    try:
        res = requests.post(url, json=payload, timeout=20)
        if res.status_code != 200:
            print(f"[!] Loi khi gui yeu cau toi server: {res.status_code} - {res.text}", flush=True)
            return None
        
        event_id = res.json().get("event_id")
        stream_url = f"{url}/{event_id}"
        print(f"[*] Da nhan Event ID: {event_id}. Dang ket noi luong SSE de nhan audio...", flush=True)

        current_event = None
        start_time = time.time()
        with requests.get(stream_url, stream=True, timeout=600) as stream_res:
            for line in stream_res.iter_lines():
                if not line:
                    continue
                line_str = line.decode('utf-8', errors='replace')
                if line_str.startswith("event: "):
                    current_event = line_str[7:].strip()
                elif line_str.startswith("data: "):
                    raw_data = line_str[6:].strip()
                    if current_event == "heartbeat":
                        continue
                    if current_event == "complete":
                        elapsed = time.time() - start_time
                        result = json.loads(raw_data)
                        audio_info = result[0]
                        params_info = result[1] if len(result) > 1 else {}
                        
                        audio_url = audio_info.get("url")
                        audio_local_path = audio_info.get("path")

                        if not audio_url and audio_local_path:
                            audio_url = f"http://127.0.0.1:7865/gradio_api/file={audio_local_path}"
                        elif audio_url and not audio_url.startswith("http"):
                            audio_url = f"http://127.0.0.1:7865{audio_url}"
                        
                        print(f"[+] Tao nhac HOAN TAT trong {elapsed:.1f}s!", flush=True)
                        print(f"[*] Dang luu tep am thanh ve du an...", flush=True)

                        saved = False
                        # Cach 1: Copy truc tiep neu co path cuc bo
                        if audio_local_path and os.path.exists(audio_local_path):
                            shutil.copy2(audio_local_path, destination_path)
                            saved = True
                        # Cach 2: Tai qua HTTP
                        elif audio_url:
                            dl_res = requests.get(audio_url, timeout=60)
                            if dl_res.status_code == 200:
                                with open(destination_path, "wb") as f:
                                    f.write(dl_res.content)
                                saved = True

                        if saved and os.path.exists(destination_path):
                            file_size_mb = os.path.getsize(destination_path) / (1024 * 1024)
                            print(f"[V] DA LUU THANH CONG: {destination_path} ({file_size_mb:.2f} MB)", flush=True)
                            sync_to_studio(destination_path, prompt, mode="acestep", duration=duration)
                            return {
                                "status": "success",
                                "file_path": destination_path,
                                "file_size_mb": file_size_mb,
                                "duration": duration,
                                "elapsed_seconds": elapsed,
                                "prompt": prompt,
                                "lyrics": lyrics,
                                "studio_url": "http://127.0.0.1:8765"
                            }
                        else:
                            print(f"[!] Loi khi tai hoac sao chep file ket qua.", flush=True)
                            return None

                    elif current_event == "error":
                        print(f"[!] Loi tu may chu tao nhac: {raw_data}", flush=True)
                        return None
    except Exception as e:
        print(f"[!] Ngoai le trong qua trinh tao nhac: {e}", flush=True)
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Autonomous Music & SoundFX Generator for Divergency via ACE-Step & Aura Studio")
    parser.add_argument("--prompt", type=str, required=True, help="Tags / Prompt describing style, instruments, mood, tempo")
    parser.add_argument("--mode", type=str, default="music", choices=["music", "sfx", "ambient"], help="Generation mode: music (ACE-Step OST), sfx (Sound FX), ambient (Loops)")
    parser.add_argument("--lyrics", type=str, default="[instrumental]", help="Lyrics structure or [instrumental] for non-vocal")
    parser.add_argument("--duration", type=float, default=None, help="Duration in seconds (default 45s for music, 3s for sfx, 25s for ambient)")
    parser.add_argument("--infer-steps", type=int, default=None, help="Inference diffusion steps")
    parser.add_argument("--guidance-scale", type=float, default=None, help="Guidance / CFG scale")
    parser.add_argument("--seed", type=int, default=-1, help="Seed (-1 is random)")
    parser.add_argument("--output-name", type=str, default=None, help="Output file base name")
    parser.add_argument("--output-dir", type=str, default=None, help="Output directory")
    parser.add_argument("--format", type=str, default="wav", choices=["wav", "mp3", "flac", "ogg"], help="Output audio format")

    args = parser.parse_args()

    if args.mode in ["sfx", "ambient"]:
        duration = args.duration if args.duration is not None else (3.0 if args.mode == "sfx" else 25.0)
        steps = args.infer_steps if args.infer_steps is not None else (10 if args.mode == "sfx" else 12)
        cfg = args.guidance_scale if args.guidance_scale is not None else (3.5 if args.mode == "sfx" else 2.5)

        res = generate_sfx_or_ambient(
            prompt=args.prompt,
            mode="soundfx" if args.mode == "sfx" else "music",
            duration=duration,
            steps=steps,
            cfg_scale=cfg,
            output_name=args.output_name,
            output_dir=args.output_dir,
            audio_format=args.format
        )
    else:
        duration = args.duration if args.duration is not None else 45.0
        steps = args.infer_steps if args.infer_steps is not None else 50
        guidance = args.guidance_scale if args.guidance_scale is not None else 15.0

        res = generate_music(
            prompt=args.prompt,
            lyrics=args.lyrics,
            duration=duration,
            infer_steps=steps,
            guidance_scale=guidance,
            output_name=args.output_name,
            output_dir=args.output_dir,
            audio_format=args.format,
            seed=args.seed
        )

    if res:
        print("\nJSON_RESULT:" + json.dumps(res))
        sys.exit(0)
    else:
        sys.exit(1)
