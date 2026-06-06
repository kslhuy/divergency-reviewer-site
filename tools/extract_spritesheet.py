import argparse
import json
import re
from pathlib import Path

from PIL import Image


SAFE_NAME_RE = re.compile(r"[^A-Za-z0-9_.-]+")


def safe_name(name):
    return SAFE_NAME_RE.sub("_", name).strip("._") or "sprite"


def resolve_atlas_path(metadata_path, image_value):
    image_path = Path(image_value)
    if image_path.is_absolute():
        return image_path

    sibling_path = metadata_path.parent / image_path
    if sibling_path.exists():
        return sibling_path

    return metadata_path.parent / image_path.name


def main():
    parser = argparse.ArgumentParser(
        description="Extract individual PNG sprites from a spritesheet JSON atlas."
    )
    parser.add_argument("metadata", help="Path to spritesheet JSON metadata.")
    parser.add_argument("output_dir", help="Directory where PNG sprites will be written.")
    parser.add_argument(
        "--group-folders",
        action="store_true",
        help="Write sprites into subfolders based on the metadata group field.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing PNG files in the output directory.",
    )
    args = parser.parse_args()

    metadata_path = Path(args.metadata)
    output_dir = Path(args.output_dir)

    data = json.loads(metadata_path.read_text(encoding="utf-8"))
    atlas_path = resolve_atlas_path(metadata_path, data["image"])

    if not atlas_path.exists():
        raise FileNotFoundError(f"Atlas image not found: {atlas_path}")

    atlas = Image.open(atlas_path).convert("RGBA")
    output_dir.mkdir(parents=True, exist_ok=True)

    written = 0
    for name, sprite in data["sprites"].items():
        frame = sprite["frame"]
        crop_box = (
            frame["x"],
            frame["y"],
            frame["x"] + frame["w"],
            frame["y"] + frame["h"],
        )
        crop = atlas.crop(crop_box)

        target_dir = output_dir
        if args.group_folders:
            target_dir = output_dir / safe_name(sprite.get("group", "ungrouped"))
            target_dir.mkdir(parents=True, exist_ok=True)

        target_path = target_dir / f"{safe_name(name)}.png"
        if target_path.exists() and not args.force:
            raise FileExistsError(
                f"Output already exists: {target_path}. Use --force to overwrite."
            )

        crop.save(target_path)
        written += 1

    print(f"Extracted {written} sprites from {atlas_path} to {output_dir}")


if __name__ == "__main__":
    main()
