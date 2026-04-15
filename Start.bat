@echo off
chcp 65001 >nul
title Giáo Trình Python - Server
echo ============================================
echo   🐍 Giáo Trình Lập Trình Python
echo   Starting server...
echo ============================================
echo.
cd /d "%~dp0"
npm run dev
pause
