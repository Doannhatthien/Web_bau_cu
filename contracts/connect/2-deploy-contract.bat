@echo off
echo ============================================
echo    DEPLOY SMART CONTRACT
echo ============================================
echo.
cd /d C:\class-election-blockchain
echo Dang deploy contract len blockchain...
echo.
npx hardhat run scripts/deploy.js --network localhost
echo.
echo ============================================
echo LUU LAI DIA CHI CONTRACT PHIA TREN!
echo ============================================
echo.
echo Cap nhat dia chi contract vao file app.js:
echo Vi tri: dong 26
echo Thay: const CONTRACT_ADDRESS = '0x0000...'
echo.
pause
