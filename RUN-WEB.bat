@echo off
cls
echo ============================================
echo         WEB SERVER - BAU CU LOP
echo ============================================
echo.
echo Dang khoi dong server...
echo.

cd /d "%~dp0"

REM Chay server
start /min cmd /c "npx http-server -p 8000"

timeout /t 3 /nobreak >nul

echo ============================================
echo   SERVER DANG CHAY!
echo ============================================
echo.
echo [LOCAL - Chi may nay]:
echo    http://localhost:8000/login.html
echo.
echo [NETWORK - Cac may khac cung mang]:
echo    http://172.21.0.10:8000/login.html
echo.
echo ============================================
echo.
echo [!] Mo trinh duyet va truy cap link tren
echo [!] Nhan phim bat ky de dong cua so nay
echo [!] Server se tiep tuc chay o cua so khac
echo.
pause

echo.
echo De DUNG server, tim cua so cmd chay http-server
echo va nhan CTRL+C
echo.
pause
