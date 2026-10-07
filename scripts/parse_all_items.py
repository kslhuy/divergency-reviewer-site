import os
import re
import json

doc_path = r"C:\Users\Quang Huy Nugyen\LF2Revie\Docs\DevLogsMusicAndSFXPrompts.md"

with open(doc_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

items = []
current_section = None

# We can parse line by line to accurately identify sections and items
i = 0
while i < len(lines):
    line = lines[i]
    # Check section header
    sec_match = re.match(r"^##\s+(.*)", line)
    if sec_match:
        current_section = sec_match.group(1).strip()
        i += 1
        continue
    
    # Check music items: ### MUS...
    mus_match = re.match(r"^###\s+(MUS\d+.*)", line)
    if mus_match:
        mus_title = mus_match.group(1).strip()
        # next lines will have File: `...`. Target: ...
        i += 1
        file_name = None
        target = None
        prompt_lines = []
        while i < len(lines) and not lines[i].startswith("#"):
            l = lines[i]
            fn_match = re.search(r"File:\s*`([^`]+)`", l)
            if fn_match:
                file_name = fn_match.group(1).strip()
            tgt_match = re.search(r"Target:\s*([^.\n]+)", l)
            if tgt_match:
                target = tgt_match.group(1).strip()
            
            if l.startswith(">"):
                prompt_lines.append(l.lstrip("> ").strip())
            i += 1
        
        prompt = " ".join(prompt_lines).strip()
        if file_name and prompt:
            items.append({
                "category": "Music",
                "section": current_section or "Music prompts",
                "stem": file_name.replace(".wav", ""),
                "file_name": file_name,
                "target": target or "45s",
                "prompt": prompt,
                "type": "music"
            })
        continue

    # Check table rows: | `stem` | target | prompt |
    row_match = re.match(r"^\|\s*`([^`]+)`\s*\|\s*([^\|]+)\|\s*([^\|]+)\|", line)
    if row_match and current_section and "Integration notes" not in current_section:
        stem = row_match.group(1).strip()
        target = row_match.group(2).strip()
        prompt = row_match.group(3).strip()
        
        # Decide category and subfolder based on current_section or stem
        # "Movement and physical reactions" -> Movement
        # "Melee attacks and defense" -> Melee
        # "Mark arrows and grenades" -> Ranged
        # "Gun soldiers and bullet contacts" -> Ranged
        # "Deep energy attacks and optional Solei fire" -> Skills
        # "Big MM attack identity" -> Boss
        # "Optional Stranger rebound exercise" -> Rebound
        # "Command and interface feedback" -> UI
        # "Sewer ambience" -> Ambience
        # "Optional character effort and boss voice" -> Voice
        cat_map = {
            "Movement and physical reactions": "Movement",
            "Melee attacks and defense": "Melee",
            "Mark arrows and grenades": "Ranged",
            "Gun soldiers and bullet contacts": "Ranged",
            "Deep energy attacks and optional Solei fire": "Skills",
            "Big MM attack identity": "Boss",
            "Optional Stranger rebound exercise": "Rebound",
            "Command and interface feedback": "UI",
            "Sewer ambience": "Ambience",
            "Optional character effort and boss voice": "Voice",
        }
        category = cat_map.get(current_section, "SFX")
        
        # Determine item type (sfx, ambient, voice)
        item_type = "sfx"
        if category == "Ambience" and "loop" in stem:
            item_type = "ambient"
        elif category == "Voice":
            item_type = "voice" # or sfx/stable audio
        
        items.append({
            "category": category,
            "section": current_section,
            "stem": stem,
            "file_name": f"{stem}.wav",
            "target": target,
            "prompt": prompt,
            "type": item_type
        })
    
    i += 1

print(f"Total parsed items: {len(items)}")
# Print category summary
counts = {}
for it in items:
    cat = it["category"]
    counts[cat] = counts.get(cat, 0) + 1

for cat, count in counts.items():
    print(f"  {cat}: {count} items")

with open(r"c:\Users\Quang Huy Nugyen\divergency-reviewer-site\scripts\all_parsed_audio_items.json", "w", encoding="utf-8") as f:
    json.dump(items, f, indent=2, ensure_ascii=False)

print("Saved to scripts/all_parsed_audio_items.json")
