@echo off
chcp 65001 >nul
title Divergency - Bản Xem Toàn Bộ Nội Dung (Local Reviewer)
echo ========================================================
echo   Dang cap nhat ban xem Offline day du (Divergency_Reviewer_Local.html)...
echo ========================================================
node build-reviewer-html.mjs --local
echo.
echo Dang mo trinh duyet vao tab Gameplay...
start "" "%~dp0Divergency_Reviewer_Local.html#gameplay"
