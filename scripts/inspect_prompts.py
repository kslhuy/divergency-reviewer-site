import os
import re
import json

doc_path = r"C:\Users\Quang Huy Nugyen\LF2Revie\Docs\DevLogsMusicAndSFXPrompts.md"

if not os.path.exists(doc_path):
    print(f"File not found: {doc_path}")
    exit(1)

with open(doc_path, "r", encoding="utf-8") as f:
    text = f.read()

print(f"File size: {len(text)} chars")
lines = text.splitlines()
print(f"Lines: {len(lines)}")

# Find all tables or music prompts
# Look for sections
sections = re.findall(r"(^#+\s+.*)", text, re.MULTILINE)
print("Sections found:")
for s in sections:
    print("  ", s)
