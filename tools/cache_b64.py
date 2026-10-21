import base64

with open('fonts/alagard/alagard.woff2', 'rb') as f:
    woff2_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('fonts/alagard/ui_gothic_title_plaque_clean.png', 'rb') as f:
    plaque_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('tools/b64_assets.py', 'w', encoding='utf-8') as f:
    f.write(f'WOFF2_B64 = """{woff2_b64}"""\n')
    f.write(f'PLAQUE_B64 = """{plaque_b64}"""\n')

print('Cached base64 assets to tools/b64_assets.py')
