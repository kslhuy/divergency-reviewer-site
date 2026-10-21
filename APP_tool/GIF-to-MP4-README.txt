GIF & MP4 CONVERTER — LOCAL WINDOWS APP

1. Double-click "Open GIF to MP4.cmd".
2. Click "Add files..." and select one or more GIF animations or MP4 videos.
   You can also paste a file path, including a quoted path, then click "Add pasted path".
3. Choose the destination folder and click either:
   - "Convert to MP4": keeps original aspect ratio (with optional 1x/2x/3x/4x pixel scale).
   - "Convert to 9:16 size": standard 1080x1920 vertical video for YouTube Shorts,
     TikTok, Instagram Reels, and mobile viewing, centered on black.
4. Click "Open output folder" to find your videos.

You can also drag one or more GIF or MP4 files onto the .cmd launcher.
Files stay on your computer; nothing is uploaded.

Default destination: APP_tool\converted
Existing videos are preserved: repeated names become "name (1).mp4", etc.
9:16 videos are saved as "name (9x16).mp4".
Failed or cancelled conversions remove their temporary files.

SETTINGS
- Quality: High (default), Balanced, or Smaller file.
- Pixel scale: Fit (default, fits 9:16 canvas or keeps original size), or crisp
  nearest-neighbor 1x/2x/3x/4x pixel art scale.
- Play count: encode the animation/video once, or repeat it in the video.
  The GIF's infinite-loop flag is ignored. Original frame timing is retained.
- Frame rate: 60 fps (default, optimized for iPhone & Web), 50 fps, or 30 fps.
  Frame rates <= 60 fps ensure the video plays at normal speed on iOS/iPhone Photos
  and can be natively edited (trimmed/cropped) without triggering Apple's Slo-Mo mode.
- Output: H.264 video, High profile level 4.1 / 4.2, yuv420p, AAC audio (if source has audio), MP4 fast-start.
- H.264 MP4 has no transparency; transparent areas use black.
- Odd dimensions are padded to even numbers, not cropped.

REQUIREMENTS
Python 3.10+ with Tkinter, and FFmpeg with libx264.
Both were found on this computer when the app was created.
FFmpeg is discovered from APP_tool\ffmpeg.exe, APP_tool\bin\ffmpeg.exe,
PATH, or the standard WinGet Gyan.FFmpeg package folder.

COMMAND LINE (optional)
python gif_to_mp4.py "G:\path with spaces\animation.gif" --output "C:\Videos"
python gif_to_mp4.py "animation.gif" --output ".\converted" --9-16
python gif_to_mp4.py "animation.gif" --output ".\converted" --scale 2 --repeats 3

If the launcher does not open, run "python gif_to_mp4.py" in a terminal
inside APP_tool to see the error details.
