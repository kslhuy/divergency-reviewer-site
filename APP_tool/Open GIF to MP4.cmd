@echo off
setlocal
cd /d "%~dp0"
where pythonw.exe >nul 2>&1
if not errorlevel 1 (
    start "" pythonw.exe "%~dp0gif_to_mp4.py" %*
    exit /b
)
where pyw.exe >nul 2>&1
if not errorlevel 1 (
    start "" pyw.exe -3 "%~dp0gif_to_mp4.py" %*
    exit /b
)
echo Python with Tkinter is required. Install Python 3 and reopen this launcher.
pause
