@echo off
echo ========================================
echo Link Tracker - Deployment Helper
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Go to: https://git-scm.com/download/win
    echo 2. Download and install Git
    echo 3. Restart this script
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed!
echo.

REM Check if already initialized
if exist .git (
    echo [INFO] Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    echo [OK] Git initialized
)

echo.
echo Adding files to Git...
git add .
echo [OK] Files added

echo.
echo Creating commit...
git commit -m "Initial commit - Link Tracker app"
echo [OK] Commit created

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create a repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: link-tracker
echo    - Click "Create repository"
echo.
echo 2. Copy your repository URL
echo    Example: https://github.com/YOUR_USERNAME/link-tracker.git
echo.
echo 3. Run these commands (replace with YOUR URL):
echo.
echo    git remote add origin YOUR_GITHUB_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. Then deploy on Render:
echo    - Go to: https://dashboard.render.com
echo    - Click "New +" -^> "Web Service"
echo    - Connect your GitHub repository
echo    - Add environment variable: HOST_URL
echo.
echo ========================================
echo.
pause
