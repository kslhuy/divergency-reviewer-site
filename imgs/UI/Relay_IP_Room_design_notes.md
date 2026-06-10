# Relay / IP Room UI Notes

Mockup assets:
- `Relay_IP_Room_relay_selected.png`: full-size screen with Relay selected.
- `relay_ip_room_relay_selected_805x456.png`: 805x456 Relay preview.
- `Relay_IP_Room_ip_local_selected.png`: full-size screen with IP Local selected.
- `relay_ip_room_ip_local_selected_805x456.png`: 805x456 IP Local preview.

The screen is intended to open after `START STORY` from the main menu. It keeps the main menu illustration as the dimmed backdrop, then replaces the current temporary room UI with a centered brass modal using the same language as the main menu and settings screens: dark metal panels, muted gold bevels, aged brass dividers, purple side banners, corner ornaments, and the existing bottom controller prompt strip.

Revision direction:
- Keep the UI dark fantasy and old-metal, closer to `settings_menu_sections/Settings_section_misc.png`.
- Avoid futuristic neon borders and oversized network symbols.
- Keep the Relay/IP entry field moderate in size so it reads like a menu row, not a banner.
- Keep title and subtitle dividers outside the text bounds; no decorative line should run through `LAN / DIRECT IP CONNECTION` or `JOIN THROUGH RELAY CODE`.
- Show a larger populated room list so multiple available rooms are visible at once, with the first row selected and a clear `JOIN SELECTED` action.

Layout:
- Top mode tabs switch between `RELAY` and `IP LOCAL`.
- The left panel shows five joinable room rows plus `REFRESH` and `JOIN SELECTED`.
- The right panel keeps create-host settings visible without requiring a separate floating menu.
- The manual `ROOM CODE` / `HOST IP` entry field lives in the right panel under `HOST ROOM`, followed by `JOIN` / `CONNECT`.
- The player name row remains persistent at the bottom of the modal.

Regenerate with:

```powershell
python tools\generate_relay_ip_room_ui.py
```
