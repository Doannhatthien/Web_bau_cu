@echo off
echo ============================================
echo    CHAY WEB SERVER
echo ============================================
echo.
cd /d C:\class-election-blockchain
echo Dang khoi dong web server...
echo.
echo Trang web se chay tai: http://localhost:8000
echo.
python -m http.server 8000
pause
