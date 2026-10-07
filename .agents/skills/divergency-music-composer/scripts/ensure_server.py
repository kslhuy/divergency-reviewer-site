import urllib.request
import subprocess
import time
import sys
import os

ACE_STEP_URL = "http://127.0.0.1:7865/config"
STUDIO_URL = "http://127.0.0.1:8765/api/health"

MARKETTING_DIR = r"C:\Users\Quang Huy Nugyen\Videos\Marketting_game"
ACESTEP_DIR = os.path.join(MARKETTING_DIR, "ACE-Step")
STUDIO_DIR = os.path.join(MARKETTING_DIR, "Music_SoundFX_MrLinken91", "Music_SoundFX_MrLinken91")
STUDIO_BAT = os.path.join(MARKETTING_DIR, "START_AUDIO_STUDIO.bat")
ACESTEP_BAT = os.path.join(ACESTEP_DIR, "START_ACE_STEP.bat")

def is_server_running(url=ACE_STEP_URL):
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=2) as response:
            return response.status == 200
    except Exception:
        return False

def is_studio_running():
    return is_server_running(STUDIO_URL)

def start_server(prefer_studio=True):
    ace_running = is_server_running(ACE_STEP_URL)
    studio_running = is_server_running(STUDIO_URL)

    if ace_running:
        print("[+] ACE-Step engine is already running on http://127.0.0.1:7865/")
        if studio_running:
            print("[+] Aura Audio Studio is also running on http://127.0.0.1:8765/")
        return True

    print("[*] ACE-Step is not running. Launching server...")
    
    # Try master launcher first
    if prefer_studio and os.path.exists(STUDIO_BAT):
        print(f"[*] Starting via START_AUDIO_STUDIO.bat...")
        subprocess.Popen(
            ["cmd.exe", "/c", STUDIO_BAT], 
            cwd=MARKETTING_DIR, 
            creationflags=subprocess.CREATE_NEW_CONSOLE if sys.platform == "win32" else 0
        )
    elif os.path.exists(ACESTEP_BAT):
        print(f"[*] Starting via START_ACE_STEP.bat...")
        subprocess.Popen(
            ["cmd.exe", "/c", ACESTEP_BAT], 
            cwd=ACESTEP_DIR, 
            creationflags=subprocess.CREATE_NEW_CONSOLE if sys.platform == "win32" else 0
        )
    else:
        venv_py = os.path.join(ACESTEP_DIR, ".venv", "Scripts", "python.exe")
        run_script = os.path.join(ACESTEP_DIR, "run_ace_step.py")
        if os.path.exists(venv_py) and os.path.exists(run_script):
            subprocess.Popen(
                [venv_py, run_script], 
                cwd=ACESTEP_DIR, 
                creationflags=subprocess.CREATE_NEW_CONSOLE if sys.platform == "win32" else 0
            )
        else:
            print("[!] Could not locate launcher or Python in ACE-Step directory.")
            return False

    # Wait up to 45 seconds for ACE-Step to be responsive
    for i in range(25):
        time.sleep(2)
        if is_server_running(ACE_STEP_URL):
            print("[+] ACE-Step engine successfully started and responsive!")
            return True
        print(f"[*] Waiting for ACE-Step engine... ({(i+1)*2}s)")

    print("[!] Timed out waiting for ACE-Step server to start.")
    return False

if __name__ == "__main__":
    success = start_server()
    sys.exit(0 if success else 1)

