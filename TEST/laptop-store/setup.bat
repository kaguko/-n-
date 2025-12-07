@echo off
setlocal enabledelayedexpansion
echo.
echo ========================================
echo  🚀 Laptop Store - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed: 
node --version
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd /d "e:\TEST\laptop-store\backend"

if not exist node_modules (
    echo Installing Backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed.
)

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

echo.
echo ========================================
echo ✅ Backend is ready
echo ========================================
echo.

REM Frontend Setup
echo 🎨 Setting up Frontend...
cd /d "e:\TEST\laptop-store\frontend"

if not exist node_modules (
    echo Installing Frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

echo.
echo ========================================
echo ✅ Frontend is ready
echo ========================================
echo.
echo.
echo 📋 NEXT STEPS:
echo.
echo 1. Start Backend (open new terminal):
echo    cd e:\TEST\laptop-store\backend && node server.js
echo.
echo 2. Initialize Database (wait 2 seconds, then in browser):
echo    http://localhost:5000/api/init-db
echo.
echo 3. Start Frontend (open new terminal):
echo    cd e:\TEST\laptop-store\frontend && npm start
echo.
echo 4. Open in browser:
echo    http://localhost:3000
echo.
echo 📚 Documentation:
echo    - Quick Start: e:\TEST\laptop-store\QUICK_START.md
echo    - Installation: e:\TEST\laptop-store\docs\INSTALLATION.md
echo    - API Docs: e:\TEST\laptop-store\docs\API_DOCUMENTATION.md
echo.
pause
