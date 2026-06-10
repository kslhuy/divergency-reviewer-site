# Settings Menu Mockup Notes

Mockup assets:
- `Settings_menu_generated.png`: full-size 1620x912 settings screen.
- `settings_menu_mockup_805x456.png`: half-size preview for quick review.
- `Settings_menu_generated_v2.png`: cleaner full-size 1620x912 version with no redundant category tabs.
- `settings_menu_mockup_v2_805x456.png`: cleaner 805x456 preview.
- `settings_menu_sections/Settings_section_video.png`: v3 tabbed Video page.
- `settings_menu_sections/Settings_section_audio.png`: v3 tabbed Audio page.
- `settings_menu_sections/Settings_section_controls.png`: v3 tabbed Controls page.
- `settings_menu_sections/Settings_section_gameplay.png`: v3 tabbed Gameplay page.
- `settings_menu_sections/Settings_section_misc.png`: v3 tabbed Misc page.
- `settings_menu_sections/Settings_sections_contact_sheet.png`: preview sheet for all v3 section pages.

The screen reuses the pause/options menu language: dark sewer backdrop, brass bevels, gold active selection, purple banner hangers, chain/gear ornaments, and the existing bottom controller prompt strip.

The v2 layout is the recommended one: it removes the top `Video / Audio / Control / Gameplay / Misc` tab row because the screen already shows the active groups at once. This gives the setting rows more space and avoids suggesting that the player is only inside one tab.

The v3 section set is the recommended layout if settings should behave like a tabbed menu. It returns to the v1 tab style, but each tab has its own image and a roomier two-panel body, so the screen is more symmetrical and less compact.

## Suggested Settings

Video:
- Resolution: `1920x1080`
- Window mode: `Borderless`
- V-Sync: `On`
- Brightness slider
- UI Scale slider
- Damage numbers: `On`

Audio:
- Master volume slider
- Music volume slider
- SFX volume slider
- Voice volume slider
- Mute background audio: `On`
- Subtitles: `On`

Keyboard:
- Move: `W A S D`
- Attack: `J`
- Heavy: `K`
- Dash: `Space`
- Guard: `Shift`
- Pause: `Esc`
- Skills: `Q W E R`

Footer/quick settings:
- Screen shake amount
- Rumble toggle
- Language selector
- Reset defaults action

## Sprite Direction

Use these existing pause menu sprites as the first pass implementation references:
- `pause_menu_options_sprites/frame/*`
- `pause_menu_options_sprites/window_controls/*`
- `pause_menu_options_sprites/bottom_controls/*`
- `pause_menu_options_sprites/tabs/tab_active_diamond.png`
- `pause_menu_options_sprites/option_icons/icon_options_gear.png`
