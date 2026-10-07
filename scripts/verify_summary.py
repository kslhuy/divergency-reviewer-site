import os
import soundfile as sf
import numpy as np

site = r"content/gameplay/audio"
samples = [
    'mus_devlogs_combat_loop.wav', 
    'mus_devlogs_boss_release.wav', 
    'amb_sewer_room_loop.wav', 
    'sfx_step_concrete.wav', 
    'sfx_fist_swing.wav', 
    'sfx_deep_sword_heavy.wav', 
    'sfx_grenade_explode.wav', 
    'sfx_soldier_gun_shot.wav', 
    'sfx_deep_energy_release.wav', 
    'sfx_solei_fire_burst.wav', 
    'sfx_bigmm_slice.wav', 
    'sfx_cylinder_bounce.wav', 
    'sfx_ui_select_ally.wav', 
    'vox_bigmm_taunt_01.wav'
]

print(f"{'Filename':<30} | {'Format':<8} | {'SR (Hz)':<7} | {'Dur (s)':<7} | {'Peak':<5} | {'RMS':<7}")
print("-" * 75)
for f in samples:
    p = os.path.join(site, f)
    if os.path.exists(p):
        info = sf.info(p)
        data, sr = sf.read(p)
        peak = np.max(np.abs(data))
        rms = np.sqrt(np.mean(data**2))
        print(f"{f:<30} | {info.subtype:<8} | {info.samplerate:<7} | {info.duration:<7.2f} | {peak:<5.2f} | {rms:<7.4f}")
