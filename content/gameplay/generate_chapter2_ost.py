import requests
import json
import os
import sys
import shutil
import argparse

if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Danh sách 4 Theme âm nhạc không lời thiết kế riêng cho Chapter 2 (Bán đảo Sakuri)
CHAPTER_2_THEMES = {
    "1": {
        "id": "sakuri_snow_pure_truth",
        "title": "Tuyết Lạnh & Chuông Gió Ngọc (Theme Sakuri & Solei - Sự Thật Thuần Khiết)",
        "description": "Khoảnh khắc Solei hạ kiếm, khúc hát ru của mẹ hòa cùng chuông gió ngọc xoa dịu tâm trí Sakuri giữa đỉnh núi tuyết.",
        "prompt": "traditional japanese, weeping shakuhachi flute, koto, delicate jade wind chimes, snow mountain ambient pads, emotional cinematic strings, gentle piano lullaby motif, melancholic, ethereal, pure, peaceful catharsis, slow tempo, 72 BPM, high quality game soundtrack",
        "duration": 45.0,
        "infer_steps": 50,
        "guidance_scale": 15.0,
    },
    "2": {
        "id": "kurotake_bamboo_ryozan",
        "title": "Rừng Tre Đen Kurotake & Thác Nước Tướng Quân Ryozan",
        "description": "Không gian rừng tre thâm u, tiếng nước đổ rền vang dưới chân cầu đá và lời thề bảo hộ bi tráng của Ryozan.",
        "prompt": "dark oriental, suspenseful, atmospheric, traditional japanese, shamisen, shakuhachi, hollow bamboo slit drums, heavy taiko, misty waterfall ambience, ancient warrior tragic oath, cinematic video game bgm, 88 BPM",
        "duration": 45.0,
        "infer_steps": 50,
        "guidance_scale": 15.0,
    },
    "3": {
        "id": "underground_noh_temple",
        "title": "Đền Ngầm Kanzaki & Khói Độc Hắc Trầm Hương",
        "description": "Sân khấu kịch Noh đẫm máu hoang phế, âm mưu cung đấu tàn độc và trận chiến với Rết Song Kiếm mang mặt nạ Hannya.",
        "prompt": "dark japanese gothic, creepy noh theatre atmosphere, ominous biwa plucks, dissonant hichiriki flute, eerie woodwinds, ritualistic taiko beats, dark ambient drone, tense, claustrophobic mystery, 76 BPM",
        "duration": 45.0,
        "infer_steps": 50,
        "guidance_scale": 15.0,
    },
    "4": {
        "id": "sakuri_soundwave_frenzy",
        "title": "Sóng Âm Cuồng Loạn (Sakuri Frenzy Boss Battle)",
        "description": "Trận chiến cao trào khi Sakuri xé dải lụa bịt mắt, giải phóng móng vuốt và sóng âm điên cuồng vì quá tải hàng triệu lời dối trá.",
        "prompt": "epic boss battle, aggressive hybrid orchestral, thundering taiko drums, dark japanese cinematic, furious staccato strings, heavy brass, sonic resonance pulses, frantic koto arpeggios, intense gothic climax, fast tempo, 138 BPM",
        "duration": 45.0,
        "infer_steps": 55,
        "guidance_scale": 16.0,
    }
}

def generate_track(theme_key, output_dir=None):
    if theme_key not in CHAPTER_2_THEMES:
        print(f"[!] Theme '{theme_key}' không hợp lệ. Chọn từ 1 đến 4.")
        return False

    theme = CHAPTER_2_THEMES[theme_key]
    print(f"\n=======================================================")
    print(f"[*] Bắt đầu tạo nhạc: {theme['title']}")
    print(f"[*] Ý nghĩa bối cảnh: {theme['description']}")
    print(f"[*] Tags/Prompt: {theme['prompt']}")
    print(f"[*] Thời lượng: {theme['duration']}s | Infer Steps: {theme['infer_steps']}")
    print(f"=======================================================")

    url = "http://127.0.0.1:7865/gradio_api/call/__call__"
    payload = {
        "data": [
            "wav",                          # format
            float(theme["duration"]),       # audio_duration
            theme["prompt"],                # Tags
            "[instrumental]",               # Lyrics (Bắt buộc [instrumental] để tạo nhạc không lời)
            int(theme["infer_steps"]),      # Infer Steps
            float(theme["guidance_scale"]), # Guidance Scale
            "euler",                        # Scheduler Type
            "apg",                          # CFG Type
            10.0,                           # Granularity Scale
            None,                           # manual seeds
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

    try:
        res = requests.post(url, json=payload, timeout=15)
        if res.status_code != 200:
            print(f"[!] Không thể kết nối tới server ACE-Step: {res.status_code} - {res.text}")
            return False
        
        event_id = res.json().get("event_id")
        stream_url = f"{url}/{event_id}"
        print(f"[*] Đang nhận phản hồi từ ACE-Step (Event ID: {event_id}). Vui lòng chờ...")

        current_event = None
        with requests.get(stream_url, stream=True, timeout=600) as stream_res:
            for line in stream_res.iter_lines():
                if not line:
                    continue
                line_str = line.decode('utf-8')
                if line_str.startswith("event: "):
                    current_event = line_str[7:].strip()
                elif line_str.startswith("data: "):
                    raw_data = line_str[6:].strip()
                    if current_event == "heartbeat":
                        continue
                    if current_event == "complete":
                        result = json.loads(raw_data)
                        audio_info = result[0]
                        
                        audio_url = audio_info.get("url")
                        file_path = audio_info.get("path")
                        if not audio_url and file_path:
                            audio_url = f"http://127.0.0.1:7865/gradio_api/file={file_path}"
                        elif audio_url and not audio_url.startswith("http"):
                            audio_url = f"http://127.0.0.1:7865{audio_url}"
                        
                        if not output_dir:
                            output_dir = os.path.dirname(os.path.abspath(__file__))
                        
                        file_name = f"{theme['id']}.wav"
                        save_path = os.path.join(output_dir, file_name)

                        saved = False
                        if file_path and os.path.exists(file_path):
                            shutil.copy2(file_path, save_path)
                            saved = True
                        elif audio_url:
                            print(f"[*] Đang tải file nhạc từ: {audio_url}")
                            r = requests.get(audio_url, timeout=60)
                            if r.status_code == 200:
                                with open(save_path, "wb") as f:
                                    f.write(r.content)
                                saved = True

                        if saved and os.path.exists(save_path):
                            size_bytes = os.path.getsize(save_path)
                            print(f"[V] ĐÃ TẠO VÀ LƯU THÀNH CÔNG: {save_path} ({size_bytes} bytes)\n")
                            return True
                        else:
                            print(f"[!] Lỗi khi tải hoặc sao chép file kết quả.")
                            return False
                    elif current_event == "error":
                        print(f"[!] Lỗi từ máy chủ: {raw_data}")
                        return False
    except Exception as e:
        print(f"[!] Ngoại lệ trong quá trình tạo: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Tạo nhạc không lời cho Divergency Chapter 2 qua ACE-Step")
    parser.add_argument("--track", choices=["1", "2", "3", "4", "all"], default="1", 
                        help="Chọn track cần tạo (1, 2, 3, 4 hoặc all)")
    args = parser.parse_args()

    if args.track == "all":
        for k in ["1", "2", "3", "4"]:
            generate_track(k)
    else:
        generate_track(args.track)
