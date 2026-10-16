"""Local GIF to MP4 converter. Python standard library + FFmpeg only."""
from __future__ import annotations

import argparse
import os
from pathlib import Path
import queue
import shutil
import subprocess
import tempfile
import threading
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

APP_DIR = Path(__file__).resolve().parent
DEFAULT_OUTPUT = APP_DIR / "converted"
NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)


def find_ffmpeg() -> str:
    for candidate in (APP_DIR / "ffmpeg.exe", APP_DIR / "bin" / "ffmpeg.exe"):
        if candidate.is_file():
            return str(candidate)
    found = shutil.which("ffmpeg")
    if found:
        return found
    root = Path(os.environ.get("LOCALAPPDATA", "")) / "Microsoft/WinGet/Packages"
    for candidate in root.glob("Gyan.FFmpeg*/ffmpeg*/bin/ffmpeg.exe"):
        return str(candidate)
    raise RuntimeError("FFmpeg was not found. Put ffmpeg.exe in APP_tool or install FFmpeg and reopen the app.")


class Cancelled(Exception):
    pass


def convert(source: Path, output_dir: Path, *, crf: int = 18, scale: int = 1,
            repeats: int = 1, fps: int = 60, cancel: threading.Event | None = None) -> Path:
    """Encode into a temporary file, then publish under a new, unused name."""
    source = source.expanduser().resolve()
    if source.suffix.lower() != ".gif" or not source.is_file():
        raise ValueError(f"Not an accessible GIF file: {source}")
    if scale not in (1, 2, 3, 4) or not 1 <= repeats <= 100 or not 0 <= crf <= 51 or fps not in (25, 30, 50, 60):
        raise ValueError("Invalid conversion settings.")
    ffmpeg = find_ffmpeg()
    if cancel and cancel.is_set():
        raise Cancelled()
    output_dir.mkdir(parents=True, exist_ok=True)
    handle, temp_name = tempfile.mkstemp(prefix=".gif-convert-", suffix=".mp4", dir=output_dir)
    os.close(handle)
    temporary = Path(temp_name)
    # Using 60 fps (or 50/30 fps) ensures full iOS / iPhone Photos compatibility.
    # Framerates >= 100 fps cause iPhone to flag the video as Slo-Mo and disable editing.
    filters = (
        f"[0:v]fps={fps},format=rgba,split[bg][fg];"
        "[bg]drawbox=color=black:t=fill:replace=1[base];"
        "[base][fg]overlay=shortest=1:format=auto,"
        f"scale=iw*{scale}:ih*{scale}:flags=neighbor,"
        "pad=ceil(iw/2)*2:ceil(ih/2)*2:color=black,format=yuv420p[v]"
    )
    command = [ffmpeg, "-hide_banner", "-loglevel", "error", "-nostdin", "-y",
               "-stream_loop", str(repeats - 1), "-ignore_loop", "1", "-i", str(source),
               "-filter_complex", filters, "-map", "[v]", "-an", "-c:v", "libx264",
               "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
               "-preset", "medium", "-crf", str(crf),
               "-movflags", "+faststart", str(temporary)]
    process = None
    try:
        # A disk-backed log avoids blocking FFmpeg on a full stderr pipe.
        with tempfile.TemporaryFile() as errors:
            process = subprocess.Popen(command, stdout=subprocess.DEVNULL, stderr=errors,
                                       creationflags=NO_WINDOW)
            while True:
                try:
                    process.wait(timeout=0.15)
                    break
                except subprocess.TimeoutExpired:
                    if cancel and cancel.is_set():
                        process.terminate()
                        process.wait()
                        raise Cancelled()
            if cancel and cancel.is_set():
                raise Cancelled()
            if process.returncode:
                errors.seek(0)
                detail = errors.read().decode("utf-8", errors="replace").strip()
                raise RuntimeError(detail[-3000:] or "FFmpeg could not convert this GIF.")
        if temporary.stat().st_size == 0:
            raise RuntimeError("FFmpeg produced an empty output.")
        index = 0
        while True:
            suffix = f" ({index})" if index else ""
            destination = output_dir / f"{source.stem}{suffix}.mp4"
            try:
                # Windows rename refuses an existing destination. On POSIX,
                # hard-link publication supplies the same no-overwrite guarantee.
                if os.name == "nt":
                    os.rename(temporary, destination)
                else:
                    os.link(temporary, destination)
            except FileExistsError:
                index += 1
                continue
            return destination
    finally:
        if process is not None and process.poll() is None:
            process.terminate()
            process.wait()
        temporary.unlink(missing_ok=True)


class ConverterApp:
    def __init__(self, root: tk.Tk, initial: list[str]):
        self.root = root
        self.files: list[Path] = []
        self.events = queue.Queue()
        self.cancel = threading.Event()
        self.busy = False
        self.closing = False
        self.controls = []
        root.title("GIF to MP4")
        root.geometry("840x700")
        root.minsize(720, 620)
        root.configure(bg="#f4f6fa")
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("TFrame", background="#f4f6fa")
        style.configure("TLabel", background="#f4f6fa", font=("Segoe UI", 10))
        style.configure("TButton", padding=(12, 7), font=("Segoe UI", 10))
        style.configure("Title.TLabel", font=("Segoe UI", 25, "bold"), foreground="#192746")
        body = ttk.Frame(root, padding=24)
        body.pack(fill="both", expand=True)
        ttk.Label(body, text="GIF → MP4", style="Title.TLabel").pack(anchor="w")
        ttk.Label(body, text="Convert animations locally. Original timing. Crisp pixel art.").pack(anchor="w", pady=(3, 18))
        row = ttk.Frame(body)
        row.pack(fill="x")
        self.button(row, "Add GIFs…", self.browse).pack(side="left")
        self.button(row, "Remove selected", self.remove).pack(side="left", padx=8)
        self.button(row, "Clear", self.clear).pack(side="left")
        frame = ttk.Frame(body)
        frame.pack(fill="both", expand=True, pady=10)
        self.listbox = tk.Listbox(frame, selectmode="extended", height=7, font=("Segoe UI", 10),
                                  relief="flat", bg="white", selectbackground="#305dcc")
        scroll = ttk.Scrollbar(frame, orient="vertical", command=self.listbox.yview)
        horizontal = ttk.Scrollbar(frame, orient="horizontal", command=self.listbox.xview)
        self.listbox.configure(yscrollcommand=scroll.set, xscrollcommand=horizontal.set)
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(0, weight=1)
        self.listbox.grid(row=0, column=0, sticky="nsew")
        scroll.grid(row=0, column=1, sticky="ns")
        horizontal.grid(row=1, column=0, sticky="ew")
        path_row = ttk.Frame(body)
        path_row.pack(fill="x")
        self.path = tk.StringVar()
        entry = ttk.Entry(path_row, textvariable=self.path)
        entry.pack(side="left", fill="x", expand=True, padx=(0, 8))
        entry.bind("<Return>", lambda _: self.add_path())
        self.controls.append(entry)
        self.button(path_row, "Add pasted path", self.add_path).pack(side="right")
        ttk.Label(body, text="Paste a GIF path above, or drag GIF files onto Open GIF to MP4.cmd.").pack(anchor="w", pady=(4, 14))
        ttk.Label(body, text="Save MP4 files to").pack(anchor="w")
        out_row = ttk.Frame(body)
        out_row.pack(fill="x", pady=(5, 12))
        self.output = tk.StringVar(value=str(DEFAULT_OUTPUT))
        out_entry = ttk.Entry(out_row, textvariable=self.output)
        out_entry.pack(side="left", fill="x", expand=True, padx=(0, 8))
        self.controls.append(out_entry)
        self.button(out_row, "Choose folder…", self.choose_output).pack(side="right")
        settings = ttk.Frame(body)
        settings.pack(fill="x")
        self.quality = tk.StringVar(value="High")
        self.scale = tk.StringVar(value="1")
        self.repeats = tk.StringVar(value="1")
        self.fps = tk.StringVar(value="60 fps (iPhone/Web)")
        for label, variable, values, width in (
            ("Quality", self.quality, ("High", "Balanced", "Smaller file"), 12),
            ("Pixel scale", self.scale, ("1", "2", "3", "4"), 6),
            ("Play count", self.repeats, ("1", "2", "3", "5", "10"), 6),
            ("Frame rate", self.fps, ("60 fps (iPhone/Web)", "50 fps", "30 fps"), 18),
        ):
            ttk.Label(settings, text=label).pack(side="left", padx=(0, 6))
            combo = ttk.Combobox(settings, textvariable=variable, values=values, state="readonly", width=width)
            combo.pack(side="left", padx=(0, 14))
            self.controls.append(combo)
        ttk.Label(body, text="H.264 MP4 • iPhone & Web compatible (normal speed + editable) • Black background").pack(anchor="w", pady=12)
        action_row = ttk.Frame(body)
        action_row.pack(fill="x")
        self.button(action_row, "Convert to MP4", self.start).pack(side="left")
        self.cancel_button = ttk.Button(action_row, text="Cancel", command=self.cancel.set, state="disabled")
        self.cancel_button.pack(side="left", padx=8)
        ttk.Button(action_row, text="Open output folder", command=self.open_output).pack(side="right")
        self.progress = ttk.Progressbar(body, mode="indeterminate")
        self.progress.pack(fill="x", pady=(14, 6))
        self.status = tk.StringVar(value="Ready — add one or more GIF files.")
        ttk.Label(body, textvariable=self.status).pack(anchor="w")
        self.log = tk.Text(body, height=6, font=("Segoe UI", 9), bg="white", relief="flat", wrap="word", state="disabled")
        self.log.pack(fill="both", expand=True, pady=(8, 0))
        self.add_files(initial)
        root.protocol("WM_DELETE_WINDOW", self.close)
        root.after(100, self.poll)

    def button(self, parent, text, command):
        button = ttk.Button(parent, text=text, command=command)
        self.controls.append(button)
        return button

    def add_files(self, paths):
        if self.busy:
            return
        invalid = []
        for value in paths:
            path = Path(value.strip().strip('"')).expanduser().resolve()
            if not path.is_file() or path.suffix.lower() != ".gif":
                invalid.append(str(path))
            elif path not in self.files:
                self.files.append(path)
                self.listbox.insert("end", str(path))
        if invalid:
            messagebox.showerror("Cannot add file", "Select an accessible .gif file:\n\n" + "\n".join(invalid))

    def browse(self):
        self.add_files(filedialog.askopenfilenames(title="Select GIF animations", filetypes=[("GIF animations", "*.gif")]))

    def add_path(self):
        if self.path.get().strip():
            self.add_files([self.path.get()])
            self.path.set("")

    def remove(self):
        for index in reversed(self.listbox.curselection()):
            self.listbox.delete(index)
            self.files.pop(index)

    def clear(self):
        self.files.clear()
        self.listbox.delete(0, "end")

    def choose_output(self):
        chosen = filedialog.askdirectory(title="Save MP4 files to")
        if chosen:
            self.output.set(chosen)

    def open_output(self):
        try:
            if not self.output.get().strip():
                raise ValueError("Choose an output folder first.")
            path = Path(self.output.get()).expanduser().resolve()
            path.mkdir(parents=True, exist_ok=True)
            os.startfile(str(path))
        except Exception as exc:
            messagebox.showerror("Cannot open folder", str(exc))

    def start(self):
        if self.busy:
            return
        if not self.files:
            messagebox.showinfo("Add GIFs", "Add at least one GIF before converting.")
            return
        try:
            find_ffmpeg()
            if not self.output.get().strip():
                raise ValueError("Choose an output folder first.")
            output = Path(self.output.get()).expanduser().resolve()
            output.mkdir(parents=True, exist_ok=True)
        except Exception as exc:
            messagebox.showerror("Cannot start", str(exc))
            return
        fps_val = int(self.fps.get().split()[0])
        settings = dict(crf={"High": 18, "Balanced": 23, "Smaller file": 28}[self.quality.get()],
                        scale=int(self.scale.get()), repeats=int(self.repeats.get()),
                        fps=fps_val)
        self.busy = True
        self.cancel.clear()
        for control in self.controls:
            control.configure(state="disabled")
        self.cancel_button.configure(state="normal")
        self.progress.start(12)
        threading.Thread(target=self.work, args=(list(self.files), output, settings), daemon=True).start()

    def work(self, files, output, settings):
        succeeded = failed = 0
        try:
            for index, source in enumerate(files, 1):
                if self.cancel.is_set():
                    break
                self.events.put(("status", f"Converting {index}/{len(files)}: {source.name}"))
                try:
                    target = convert(source, output, cancel=self.cancel, **settings)
                    succeeded += 1
                    self.events.put(("log", f"Saved: {target}"))
                except Cancelled:
                    break
                except Exception as exc:
                    failed += 1
                    self.events.put(("log", f"FAILED — {source.name}: {exc}"))
        finally:
            prefix = "Cancelled" if self.cancel.is_set() else "Finished"
            self.events.put(("done", f"{prefix} — {succeeded} converted, {failed} failed."))

    def poll(self):
        try:
            while True:
                event, value = self.events.get_nowait()
                if event == "log":
                    self.log.configure(state="normal")
                    self.log.insert("end", value + "\n")
                    self.log.see("end")
                    self.log.configure(state="disabled")
                else:
                    self.status.set(value)
                if event == "done":
                    self.busy = False
                    self.progress.stop()
                    for control in self.controls:
                        control.configure(state="readonly" if isinstance(control, ttk.Combobox) else "normal")
                    self.cancel_button.configure(state="disabled")
                    if self.closing:
                        self.root.destroy()
                        return
        except queue.Empty:
            pass
        self.root.after(100, self.poll)

    def close(self):
        if self.busy:
            self.closing = True
            self.cancel.set()
            self.status.set("Stopping conversion…")
        else:
            self.root.destroy()


def main():
    parser = argparse.ArgumentParser(description="Convert GIFs to H.264 MP4 locally.")
    parser.add_argument("files", nargs="*")
    parser.add_argument("--output", type=Path, help="Convert without opening the GUI, saving to this folder")
    parser.add_argument("--scale", type=int, choices=(1, 2, 3, 4), default=1)
    parser.add_argument("--repeats", type=int, default=1)
    parser.add_argument("--fps", type=int, choices=(25, 30, 50, 60), default=60)
    args = parser.parse_args()
    if args.output:
        if not args.files:
            parser.error("Provide at least one GIF file for conversion.")
        for value in args.files:
            print(convert(Path(value), args.output.resolve(), scale=args.scale, repeats=args.repeats, fps=args.fps))
    else:
        if os.name == "nt":
            import ctypes
            try:
                ctypes.windll.shcore.SetProcessDpiAwareness(1)
            except (AttributeError, OSError):
                pass
        root = tk.Tk()
        ConverterApp(root, args.files)
        root.mainloop()


if __name__ == "__main__":
    main()
