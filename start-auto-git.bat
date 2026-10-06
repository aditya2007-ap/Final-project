@echo off
title Zentora Auto-Git Sync Daemon
echo ====================================================
echo Starting Zentora Auto-Git Sync...
echo Any changes you save will automatically be pushed to GitHub!
echo ====================================================
echo.
cd /d "%~dp0"
node auto-git.js
pause
