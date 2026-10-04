import os
import sys
import torch
import soundfile as sf
import numpy as np

try:
    from stable_audio_3 import StableAudioModel
except ImportError:
    print("Cannot import stable_audio_3")
    sys.exit(1)

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Loading small-sfx on {device}...")
model = StableAudioModel.from_pretrained("small-sfx", device=device, model_half=(device == "cuda"))
sr = int(model.model_config.get("sample_rate", 44100))

prompts = [
    ("sfx_step_concrete", "One boot footfall on damp rough concrete: firm rubber sole contact, tiny grit scrape, dry low-mid body, no splash, crisp isolated game sound effect.", 2.5),
    ("sfx_fist_swing", "One quick martial fist punch swing through air: short dry whoosh, subtle clothing rustle, clean arcade foley.", 2.5),
    ("sfx_blunt_hit_heavy", "One heavy blunt combat strike impact: deep bone-jarring punch to torso, dense solid thud, no echo.", 2.5),
    ("sfx_grenade_explode", "One tactical grenade explosion: sharp sudden blast crack, deep concussive pressure thud, brief flying debris.", 4.0),
    ("sfx_soldier_gun_shot", "One crisp military service rifle shot: sharp supersonic muzzle crack, tight mechanical bolt snap, short dry indoor decay.", 2.5),
]

out_dir = r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\scratch_quality_test"
os.makedirs(out_dir, exist_ok=True)

def trim_lead_silence(arr, sr, threshold=0.02, pad_ms=10):
    # arr: (samples, channels)
    env = np.max(np.abs(arr), axis=1)
    indices = np.where(env > threshold)[0]
    if len(indices) == 0:
        return arr
    start_idx = max(0, indices[0] - int(sr * pad_ms / 1000))
    # also trim trailing silence after sound dies down
    last_idx = min(len(arr), indices[-1] + int(sr * 150 / 1000))
    return arr[start_idx:last_idx]

for name, prompt, dur in prompts:
    print(f"\n[*] Generating {name} ({dur}s)...")
    audio = model.generate(
        prompt=prompt,
        negative_prompt="music, musical instruments, singing, speech, distortion, clipping, white noise, hiss, hum, wall of sound",
        duration=dur,
        steps=8,
        cfg_scale=1.0,
        seed=101,
        batch_size=1,
        truncate_output_to_duration=True,
        chunked_decode=True
    )
    audio = audio.to(torch.float32).cpu()
    peak = audio.abs().max().item()
    if peak > 1e-8:
        audio = audio / peak * 0.95
    arr = audio[0].transpose(0, 1).numpy()
    
    raw_path = os.path.join(out_dir, f"{name}_raw.wav")
    sf.write(raw_path, arr, sr, subtype='PCM_16')
    
    # Also save trimmed version
    trimmed = trim_lead_silence(arr, sr)
    trim_path = os.path.join(out_dir, f"{name}.wav")
    sf.write(trim_path, trimmed, sr, subtype='PCM_16')
    
    rms = np.sqrt(np.mean(trimmed**2))
    print(f"[V] Saved {name}: raw dur={len(arr)/sr:.2f}s, trimmed dur={len(trimmed)/sr:.2f}s, peak={np.max(np.abs(trimmed)):.3f}, RMS={rms:.4f}")

print("\nDone all quality tests!")
