@echo off
REM Start Backend in new window
start "Backend Server" cmd /k "cd /d e:\TEST\laptop-store\backend && node server-fixed.js"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend in new window
start "Frontend React" cmd /k "cd /d e:\TEST\laptop-store\frontend && npm start"

REM Wait and show status
timeout /t 3 /nobreak
echo.
echo ========================================
echo ✅ LAPTOP STORE STARTING
echo ========================================
echo.
echo 🔌 Backend: http://localhost:5000
echo 🎨 Frontend: http://localhost:3000
echo.
echo Admin Login:
echo   Email: admin@example.com
echo   Password: admin123
echo.
echo Press any key to open browser...
pause
start http://localhost:3000
