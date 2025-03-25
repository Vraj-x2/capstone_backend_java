@echo off
title Git Push Automation
color 0a

:: Check if in git repo
git rev-parse --is-inside-work-tree 2>nul >nul
if errorlevel 1 (
    echo Error: Not in a Git repository
    pause
    exit /b 1
)

echo Starting Git push process...
echo.

:: Show remote info
git remote -v
echo.

:: Add files
git add .

:: Commit
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set mydate=%%c-%%b-%%a
for /f "tokens=1-3 delims=:." %%a in ("%time%") do set mytime=%%a-%%b-%%c
git commit -m "Auto-commit: %mydate%_%mytime%" || (
    echo No changes to commit
    pause
    exit /b 0
)

:: Push with retry logic
echo Pushing to GitHub...
git push origin main || (
    echo Push failed! Trying alternative authentication...
    git push origin main 2>nul || (
        echo.
        echo #############################################
        echo # Push failed! Possible solutions:
        echo # 1. Run: git remote set-url origin git@github.com:Vraj-x2/capstone_backend_java.git
        echo # 2. Check Windows Credential Manager for GitHub entries
        echo # 3. Use a GitHub Personal Access Token as password
        echo #############################################
    )
)

echo.
pause