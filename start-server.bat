@echo off
cls
echo ============================================
echo    KHOI DONG WEB SERVER
echo ============================================
echo.
echo [1] Dang khoi dong server...
echo.

REM Lay dia chi IP cua may
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do set IP=%%a
set IP=%IP: =%

echo [2] Server dang chay tai:
echo.
echo     LOCAL:   http://localhost:8000
echo     NETWORK: http://%IP%:8000
echo.
echo ============================================
echo  CHIA SE LINK NAY CHO MAY KHAC TREN CUNG MANG:
echo  http://%IP%:8000/login.html
echo ============================================
echo.
echo [!] Nhan CTRL+C de dung server
echo.

REM Chay server
npx http-server -p 8000 -o login.html

pause
