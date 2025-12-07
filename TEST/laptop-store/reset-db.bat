@echo off
cd /d "e:\TEST\laptop-store\backend"
start "" node server-fixed.js
timeout /t 3
echo.
echo Waiting for server to start...
timeout /t 2
echo.
echo Resetting database...
powershell -Command "(Invoke-WebRequest -Uri 'http://localhost:5000/api/reset-db' -UseBasicParsing).Content | ConvertFrom-Json | Format-List"
echo.
echo ✅ Done! 
echo.
echo Bạn có thể đăng nhập với:
echo   Email: admin@example.com
echo   Password: admin123
