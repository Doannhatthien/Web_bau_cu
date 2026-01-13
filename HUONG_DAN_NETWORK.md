# HƯỚNG DẪN CHIA SẺ LINK CHO ỨNG CỬ VIÊN

## 🌐 Địa chỉ IP của máy bạn: 172.20.10.7

## 📱 LINK ĐỂ CHIA SẺ

Gửi link này cho ứng cử viên:
```
http://172.20.10.7:8000/login.html
```

## ✅ YÊU CẦU

### Trên máy chủ (máy của bạn):
1. ✅ Đã cài đặt và chạy hệ thống
2. ⚠️ **BẮT BUỘC: Mở Firewall** (xem bên dưới)
3. ✅ Giữ 3 cửa sổ terminal đang chạy

### Trên điện thoại/máy khác:
1. ✅ Cùng mạng WiFi với máy chủ
2. ✅ Có trình duyệt web
3. 🔐 Có MetaMask (nếu cần vote bằng blockchain)

## 🔥 MỞ FIREWALL (BẮT BUỘC)

### Cách 1: Tự động (Chạy PowerShell với quyền Admin)
```powershell
# Click phải vào PowerShell -> Run as Administrator
# Sau đó chạy lệnh:

netsh advfirewall firewall add rule name="Blockchain Frontend" dir=in action=allow protocol=TCP localport=8000
netsh advfirewall firewall add rule name="Blockchain Backend" dir=in action=allow protocol=TCP localport=5000
netsh advfirewall firewall add rule name="Blockchain Node" dir=in action=allow protocol=TCP localport=8545
```

### Cách 2: Thủ công
1. Mở **Windows Defender Firewall**
2. Click **Advanced settings**
3. Click **Inbound Rules** -> **New Rule**
4. Chọn **Port** -> Next
5. Chọn **TCP** và nhập: **8000, 5000, 8545**
6. Chọn **Allow the connection**
7. Đặt tên: **Blockchain Voting System**

## 🚀 KHỞI ĐỘNG HỆ THỐNG

### Cách 1: Sử dụng script tự động
```batch
cd C:\BLOCKCHAIN
.\start-network.bat
```

### Cách 2: Thủ công (3 terminal)
```powershell
# Terminal 1: Blockchain
cd C:\BLOCKCHAIN
npx hardhat node

# Terminal 2: Backend
cd C:\BLOCKCHAIN\backend
npm start

# Terminal 3: Frontend
cd C:\BLOCKCHAIN\Frontend
npm run serve
```

## 📋 TEST KẾT NỐI

### Từ máy chủ:
- Frontend: http://localhost:8000
- Backend: http://localhost:5000
- Blockchain: http://localhost:8545

### Từ điện thoại/máy khác:
- Frontend: http://172.20.10.7:8000
- Backend: http://172.20.10.7:5000

## 🔐 TÀI KHOẢN MẪU

Admin:
- Username: `admin`
- Password: `admin123`

Sinh viên:
- Username: `student1`, Password: `123456`
- Username: `student2`, Password: `123456`

## 📝 HƯỚNG DẪN CHO ỨNG CỬ VIÊN

1. Kết nối cùng WiFi với máy chủ
2. Mở trình duyệt trên điện thoại
3. Truy cập: http://172.20.10.7:8000/login.html
4. Click "Đăng ký ngay"
5. Điền thông tin:
   - Họ và tên
   - Tên đăng nhập
   - Mã sinh viên
   - Mật khẩu
6. Click "Đăng Ký"
7. Hệ thống tự động tạo wallet address

## ⚠️ XỬ LÝ SỰ CỐ

### Không kết nối được:
1. ✅ Kiểm tra cùng WiFi
2. ✅ Kiểm tra Firewall đã mở
3. ✅ Kiểm tra 3 service đang chạy
4. ✅ Ping thử: `ping 172.20.10.7`

### Lỗi CORS:
- Backend đã được cấu hình cho IP: 172.20.10.7
- Nếu IP thay đổi, cần cập nhật trong backend/server.js

### Blockchain không connect:
- MetaMask chỉ cần cho admin/vote
- Đăng ký account không cần MetaMask
- Vote mới cần MetaMask
