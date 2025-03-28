@echo off
echo Starting Git Push Automation...
echo.

:: Navigate to your project directory (change the path if needed)
cd /d "C:\Users\vrajc\Desktop\Study Materials\OneDrive - Sheridan College\Semester 5\Capstone\capstone_backend_java\capstone_backend_java"

:: Get current date and time
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set currentDate=%%c-%%b-%%a
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set currentTime=%%a:%%b

:: Git commands
git add .
git commit -m "Auto-commit at %currentDate% %currentTime%"
git push

echo.
echo Git push completed!
pause