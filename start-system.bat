@echo off
chcp 65001 >nul
cls
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║  🚀 HỆ THỐNG BẦU CỬ BLOCKCHAIN - AUTO STARTUP    ║
echo ╚═══════════════════════════════════════════════════╝
echo.

REM Dọn dẹp các process cũ
echo [1/6] 🧹 Đang dọn dẹp các process cũ...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8545" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
timeout /t 2 /nobreak >nul
echo    ✓ Đã dọn dẹp

REM Khởi động Hardhat Node
echo.
echo [2/6] ⛓️  Đang khởi động Hardhat Blockchain...
start "Hardhat Node" cmd /k "cd /d %~dp0 && npx hardhat node"
timeout /t 8 /nobreak >nul
echo    ✓ Blockchain đã khởi động

REM Deploy Contract
echo.
echo [3/6] 📝 Đang deploy Smart Contract...
cd /d %~dp0
npx hardhat run scripts/deploy.js --network localhost > temp_deploy.txt 2>&1
timeout /t 2 /nobreak >nul

REM Lấy địa chỉ contract từ output
for /f "tokens=*" %%i in ('findstr /C:"deployed to:" temp_deploy.txt') do (
    set line=%%i
)
for /f "tokens=5" %%a in ("%line%") do set CONTRACT_ADDRESS=%%a
del temp_deploy.txt

if defined CONTRACT_ADDRESS (
    echo    ✓ Contract deployed: %CONTRACT_ADDRESS%
) else (
    echo    ✗ Lỗi deploy contract
    pause
    exit /b 1
)

REM Cập nhật địa chỉ contract trong app.js
echo.
echo [4/6] 🔧 Đang cập nhật contract address...
powershell -Command "(Get-Content 'contracts\Frontend\app.js') -replace \"const CONTRACT_ADDRESS = '0x[a-fA-F0-9]{40}'\", \"const CONTRACT_ADDRESS = '%CONTRACT_ADDRESS%'\" | Set-Content 'contracts\Frontend\app.js'"
echo    ✓ Đã cập nhật app.js

REM Khởi động Backend
echo.
echo [5/6] 🔧 Đang khởi động Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0\backend && npm start"
timeout /t 4 /nobreak >nul
echo    ✓ Backend đã khởi động

REM Khởi động Frontend
echo.
echo [6/6] 💻 Đang khởi động Frontend...
start "Frontend Server" cmd /k "cd /d %~dp0\contracts\Frontend && npm run serve"
timeout /t 3 /nobreak >nul
echo    ✓ Frontend đã khởi động

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║  ✅ HỆ THỐNG ĐÃ KHỞI ĐỘNG THÀNH CÔNG!           ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo 🌐 THÔNG TIN TRUY CẬP:
echo    • Blockchain:  http://127.0.0.1:8545
echo    • Backend:     http://localhost:5000
echo    • Frontend:    http://localhost:8000
echo.
echo 📝 CONTRACT ADDRESS: %CONTRACT_ADDRESS%
echo 👤 ADMIN ACCOUNT:    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🔗 Đang mở trình duyệt...
timeout /t 2 /nobreak >nul
start http://localhost:8000
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║  📋 HƯỚNG DẪN SỬ DỤNG:                           ║
echo ╠═══════════════════════════════════════════════════╣
echo ║  1. Trang web đã mở trong trình duyệt            ║
echo ║  2. Nhấn Ctrl + Shift + R để refresh             ║
echo ║  3. Click "Kết nối MetaMask"                     ║
echo ║  4. Chọn tài khoản và chấp nhận kết nối          ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo ⚠️  NẾU VẪN LỖI: Reset MetaMask account trong Settings
echo.
pause
