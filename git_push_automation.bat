@echo off
title Automatic Git Push
color 0a

:: Change directory to your project path if needed
:: cd /d "C:\path\to\your\project"

echo Starting automatic Git push process...
echo.

:: Git commands
git add .
git commit -m "Automatic commit: %date% %time%"
git push origin main

echo.
echo Push completed successfully!
pause