import os
import sys
import json
import time
import shutil
import requests
import re

# Base paths
BASE_DIR = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site"
SITE_AUDIO_DIR = os.path.join(BASE_DIR, "content", "gameplay", "audio")
UNITY_SOUND_DIR = r"C:\Users\Quang Huy Nugyen\LF2Revie\Assets\Sound\DevLogs"
STUDIO_GEN_DIR = r"C:\Users\Quang Huy Nugyen\Videos\Marketting_game\Music_SoundFX_MrLinken91\Music_SoundFX_MrLinken91\output\generated"

os.makedirs(SITE_AUDIO_DIR, exist_ok=True)
os.makedirs(UNITY_SOUND_DIR, exist_ok=True)
os.makedirs(STUDIO_GEN_DIR, exist_ok=True)

ACESTEP_URL = "http://127.0.0.1:7865/gradio_api/call/__call__"
STUDIO_URL = "http://127.0.0.1:8765"

def parse_target_seconds(target_str, item_type="sfx"):
    t = str(target_str).lower().strip()
    if "64" in t or "32 bars" in t:
        return 64.0
    if "30" in t and "45" in t:
        return 25.0
    if "15" in t and "20" in t:
        return 18.0
    if "10" in t and "15" in t:
        return 12.0
    if "4" in t and "6" in t:
        return 5.0
    if "3" in t and "4" in t:
        return 3.5
    if "1" in t and "2" in t:
        return 2.0
    
    match = re.search(r"(\d+(?:\.\d+)?)\s*s", t)
    if match:
        val = float(match.group(1))
        if val < 1.2:
            return 1.2
        return val
    
    if item_type == "music":
        return 45.0
    elif item_type == "ambient":
        return 20.0
    return 1.5

def sync_file_to_all(src_path, category, prompt="", duration=2.0, mode="sfx"):
    if not os.path.exists(src_path) or os.path.getsize(src_path) < 1000:
        return False
    
    filename = os.path.basename(src_path)
    
    # 1. Site audio
    site_path = os.path.join(SITE_AUDIO_DIR, filename)
    if os.path.abspath(src_path) != os.path.abspath(site_path):
        shutil.copy2(src_path, site_path)
        
    # 2. Unity folder: Assets/Sound/DevLogs/<Category>/filename
    cat_dir = os.path.join(UNITY_SOUND_DIR, category)
    os.makedirs(cat_dir, exist_ok=True)
    unity_path = os.path.join(cat_dir, filename)
    if os.path.abspath(src_path) != os.path.abspath(unity_path):
        shutil.copy2(src_path, unity_path)
        
    # 3. Studio generated folder
    studio_path = os.path.join(STUDIO_GEN_DIR, filename)
    if os.path.abspath(src_path) != os.path.abspath(studio_path):
        shutil.copy2(src_path, studio_path)
        
    # Metadata for Aura Studio
    meta_path = os.path.splitext(studio_path)[0] + ".json"
    meta = {
        "id": os.path.splitext(filename)[0],
        "category": category,
        "engine": "acestep" if mode == "music" and duration >= 30.0 else "stable_audio",
        "mode": mode,
        "prompt": prompt,
        "duration": duration,
        "file": filename,
        "created_at": time.time(),
    }
    try:
        with open(meta_path, "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)
    except Exception:
        pass
    
    return True

def wait_until_studio_idle(timeout=60):
    start = time.time()
    while time.time() - start < timeout:
        try:
            p = requests.get(f"{STUDIO_URL}/api/progress", timeout=5).json()
            if not p.get("active"):
                return True
        except Exception:
            pass
        time.sleep(1.0)
    return False

def generate_acestep(prompt, filename, duration=64.0, steps=45, guidance_scale=15.0):
    dest_path = os.path.join(SITE_AUDIO_DIR, filename)
    payload = {
        "data": [
            "wav",                          # format
            float(duration),                # duration
            prompt,                         # prompt/tags
            "[instrumental]",               # lyrics
            int(steps),                     # infer_steps
            float(guidance_scale),          # guidance_scale
            "euler", "apg", 10.0, None, 0.5, 0.0, 3.0,
            True, False, True, None, 0.0, 0.0, False, 0.5, None, "none", 1.0
        ]
    }
    print(f"[*] Calling ACE-Step for {filename} ({duration}s, steps={steps})...")
    try:
        res = requests.post(ACESTEP_URL, json=payload, timeout=30)
        if res.status_code != 200:
            print(f"[!] ACE-Step error: {res.status_code} - {res.text}")
            return None
        
        event_id = res.json().get("event_id")
        stream_url = f"{ACESTEP_URL}/{event_id}"
        
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
                        audio_url = audio_info.get("url")
                        audio_local_path = audio_info.get("path")
                        if not audio_url and audio_local_path:
                            audio_url = f"http://127.0.0.1:7865/gradio_api/file={audio_local_path}"
                        elif audio_url and not audio_url.startswith("http"):
                            audio_url = f"http://127.0.0.1:7865{audio_url}"
                        
                        if audio_local_path and os.path.exists(audio_local_path):
                            shutil.copy2(audio_local_path, dest_path)
                        elif audio_url:
                            dl = requests.get(audio_url, timeout=60)
                            if dl.status_code == 200:
                                with open(dest_path, "wb") as f:
                                    f.write(dl.content)
                        
                        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
                            print(f"[V] ACE-Step completed {filename} in {elapsed:.1f}s")
                            return dest_path
                        return None
                    elif current_event == "error":
                        print(f"[!] ACE-Step error: {raw_data}")
                        return None
    except Exception as e:
        print(f"[!] ACE-Step exception: {e}")
        return None
    return None

def generate_stable_audio(prompt, filename, mode="soundfx", duration=1.5, steps=8, cfg_scale=3.5):
    dest_path = os.path.join(SITE_AUDIO_DIR, filename)
    
    # Ensure studio is idle before submitting
    if not wait_until_studio_idle(45):
        print(f"[!] Studio did not become idle. Forcing cancel...")
        try:
            requests.post(f"{STUDIO_URL}/api/cancel", timeout=5)
            time.sleep(2)
        except Exception:
            pass

    payload = {
        "engine": "stable_audio",
        "mode": "soundfx" if mode == "soundfx" else "music",
        "prompt": prompt,
        "negative_prompt": "vocals, speech, noise" if mode == "soundfx" else "",
        "duration": float(duration),
        "steps": int(steps),
        "cfg_scale": float(cfg_scale),
        "guidance_scale": float(cfg_scale),
        "format": "wav",
        "normalize": True,
        "seamless_loop": (mode != "soundfx"),
        "output_dir": "generated"
    }
    
    # Retry posting if busy
    res = None
    for retry in range(4):
        try:
            res = requests.post(f"{STUDIO_URL}/api/generate", json=payload, timeout=15)
            if res.status_code == 200:
                data = res.json()
                if data.get("ok"):
                    break
            time.sleep(2.0)
        except Exception as e:
            time.sleep(2.0)

    if not res or res.status_code != 200:
        print(f"[!] Aura Studio failed to accept job: {res.text if res else 'No response'}")
        return None
    
    job_info = res.json()
    job_id = job_info.get("job_id")
    
    # Poll progress
    for _ in range(75):
        time.sleep(1.2)
        try:
            p = requests.get(f"{STUDIO_URL}/api/progress", timeout=5).json()
        except Exception:
            continue
            
        cur_job = p.get("job_id")
        if cur_job and cur_job != job_id:
            # Different job, skip
            continue
            
        if not p.get("active"):
            if p.get("stage") == "completed" and p.get("output_url"):
                dl_url = f"{STUDIO_URL}{p['output_url']}"
                r = requests.get(dl_url, timeout=30)
                if r.status_code == 200:
                    with open(dest_path, "wb") as f:
                        f.write(r.content)
                    return dest_path
            else:
                print(f"[!] Aura Studio failed: {p.get('message') or p.get('error')}")
                return None
    return None

def main():
    items_path = os.path.join(BASE_DIR, "scripts", "all_parsed_audio_items.json")
    with open(items_path, "r", encoding="utf-8") as f:
        items = json.load(f)
    
    status_file = os.path.join(BASE_DIR, "scripts", "batch_status.json")
    status = {}
    if os.path.exists(status_file):
        try:
            with open(status_file, "r", encoding="utf-8") as f:
                status = json.load(f)
        except Exception:
            status = {}

    print(f"Total items in catalogue: {len(items)}")
    
    # Priority Order
    cat_priority = {
        "Music": 1,
        "Ambience": 2,
        "Movement": 3,
        "Melee": 4,
        "Ranged": 5,
        "Skills": 6,
        "Boss": 7,
        "Rebound": 8,
        "UI": 9,
        "Voice": 10
    }
    
    sorted_items = sorted(items, key=lambda x: cat_priority.get(x["category"], 99))
    
    total = len(sorted_items)
    completed_count = 0
    
    for idx, item in enumerate(sorted_items, 1):
        stem = item["stem"]
        filename = item["file_name"]
        cat = item["category"]
        duration = parse_target_seconds(item["target"], item["type"])
        prompt = item["prompt"]
        item_type = item["type"]
        
        # Check if already generated
        site_file = os.path.join(SITE_AUDIO_DIR, filename)
        unity_file = os.path.join(UNITY_SOUND_DIR, cat, filename)
        
        existing_src = None
        if os.path.exists(site_file) and os.path.getsize(site_file) > 1000:
            existing_src = site_file
        elif os.path.exists(unity_file) and os.path.getsize(unity_file) > 1000:
            existing_src = unity_file
        
        if existing_src:
            sync_file_to_all(existing_src, cat, prompt, duration, item_type)
            status[stem] = {"status": "success", "file": filename, "category": cat, "reused": True, "size_kb": os.path.getsize(existing_src)//1024}
            completed_count += 1
            print(f"[{idx}/{total}] ALREADY EXISTS / SYNCED: {filename} ({cat})")
            continue
            
        print(f"\n=======================================================")
        print(f"[{idx}/{total}] GENERATING: {filename} [{cat}] (Target: {duration}s)")
        print(f"Prompt: {prompt[:90]}...")
        print(f"=======================================================", flush=True)
        
        gen_path = None
        if cat == "Music" and duration >= 30.0:
            # ACE-Step for long complex loops
            gen_path = generate_acestep(prompt, filename, duration=duration, steps=45, guidance_scale=15.0)
        elif cat == "Ambience":
            # Stable audio music mode for seamless loops
            gen_path = generate_stable_audio(prompt, filename, mode="music", duration=duration, steps=10, cfg_scale=2.5)
        elif cat == "Music":
            # Short musical accents (MUS04, MUS05, MUS06, MUS07)
            gen_path = generate_stable_audio(prompt, filename, mode="music", duration=duration, steps=10, cfg_scale=3.5)
        else:
            # SFX, UI, Voice, Movement, Melee, Ranged, Skills, Boss, Rebound
            gen_path = generate_stable_audio(prompt, filename, mode="soundfx", duration=duration, steps=8, cfg_scale=3.5)
            
        if gen_path and os.path.exists(gen_path):
            sync_file_to_all(gen_path, cat, prompt, duration, item_type)
            size_kb = os.path.getsize(gen_path)//1024
            status[stem] = {"status": "success", "file": filename, "category": cat, "size_kb": size_kb}
            completed_count += 1
            print(f"[V] SUCCESS [{completed_count}/{total}]: {filename} ({size_kb} KB)")
        else:
            status[stem] = {"status": "failed", "file": filename, "category": cat}
            print(f"[X] FAILED: {filename}")
            
        # Write progress status
        with open(status_file, "w", encoding="utf-8") as f:
            json.dump(status, f, indent=2, ensure_ascii=False)
            
        time.sleep(0.5)

    print(f"\n=======================================================")
    print(f"Batch generation complete! {completed_count}/{total} files generated.")
    print(f"=======================================================")

if __name__ == "__main__":
    main()
