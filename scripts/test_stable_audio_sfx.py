import sys
import os
import torch
import soundfile as sf
import numpy as np

print("Python:", sys.executable)
print("Torch CUDA:", torch.cuda.is_available())

try:
    from stable_audio_3 import StableAudioModel
    print("Successfully imported StableAudioModel")
except Exception as e:
    print("Failed to import StableAudioModel:", e)
    sys.exit(1)

model_name = "small-sfx"
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Loading {model_name} on {device}...")
model = StableAudioModel.from_pretrained(model_name, device=device, model_half=(device == "cuda"))
print("Model loaded. Config:", getattr(model, "model_config", {}))

# Let's test a prompt with different parameters
prompt = "One boot footfall on damp rough concrete: firm rubber sole contact, tiny grit scrape, dry low-mid body, no splash."

tests = [
    {"duration": 1.2, "steps": 8, "cfg": 3.5, "name": "dur1.2_s8_cfg3.5"},
    {"duration": 1.2, "steps": 25, "cfg": 1.0, "name": "dur1.2_s25_cfg1.0"},
    {"duration": 1.2, "steps": 25, "cfg": 4.0, "name": "dur1.2_s25_cfg4.0"},
    {"duration": 5.0, "steps": 25, "cfg": 4.0, "name": "dur5.0_s25_cfg4.0"},
    {"duration": 5.0, "steps": 8, "cfg": 1.0, "name": "dur5.0_s8_cfg1.0"},
]

out_dir = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\scratch_audio_test"
os.makedirs(out_dir, exist_ok=True)

sr = int(model.model_config.get("sample_rate", 44100))

for t in tests:
    print(f"\n--- Testing: {t['name']} (dur={t['duration']}, steps={t['steps']}, cfg={t['cfg']}) ---")
    try:
        audio = model.generate(
            prompt=prompt,
            negative_prompt="vocals, speech, noise, music",
            duration=t['duration'],
            steps=t['steps'],
            cfg_scale=t['cfg'],
            seed=42,
            batch_size=1,
            truncate_output_to_duration=True,
            chunked_decode=True
        )
        audio = audio.to(torch.float32).cpu()
        peak = audio.abs().max().item()
        # normalized
        if peak > 1e-8:
            norm_audio = audio / peak * 0.95
        else:
            norm_audio = audio
        
        arr = norm_audio[0].transpose(0, 1).numpy() # (samples, channels)
        rms = np.sqrt(np.mean(arr**2))
        non_silent = np.mean(np.abs(arr) > 0.05)
        print(f"Shape: {arr.shape}, Peak: {peak:.4f}, RMS: {rms:.4f}, Active ratio (>0.05): {non_silent:.2%}")
        
        out_wav = os.path.join(out_dir, f"{t['name']}.wav")
        sf.write(out_wav, arr, sr, subtype='PCM_16')
        print(f"Saved: {out_wav} (PCM_16)")
    except Exception as e:
        print(f"Error testing {t['name']}: {e}")
