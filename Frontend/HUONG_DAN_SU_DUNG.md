# HƯỚNG DẪN SỬ DỤNG HỆ THỐNG BẦU CỬ BLOCKCHAIN

## 🚀 KHỞI ĐỘNG HỆ THỐNG

### Bước 1: Khởi động Hardhat Node
Mở Terminal 1:
```bash
cd D:\HK9\T3_Nhoms3_T.Vinh\Web_bau_cu
npx hardhat node
```
**LƯU Ý:** Giữ cửa sổ này mở, KHÔNG ĐÓNG!

### Bước 2: Deploy Smart Contract
Mở Terminal 2 (sau 3 giây khi node đã khởi động):
```bash
cd D:\HK9\T3_Nhoms3_T.Vinh\Web_bau_cu
npx hardhat run scripts/deploy.js --network localhost
```
Lưu địa chỉ contract: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### Bước 3: Khởi động Web Server
Mở Terminal 3:
```bash
cd D:\HK9\T3_Nhoms3_T.Vinh\Web_bau_cu\contracts\Frontend
npx http-server -p 8080
```

## 🔐 ĐĂNG NHẬP

1. Mở trình duyệt: http://localhost:8080/login.html

2. **Đăng nhập Admin:**
   - Username: `admin`
   - Password: `admin123`

3. **Đăng nhập Sinh viên:**
   - Username: `student1`
   - Password: `123456`

## 🦊 THIẾT LẬP METAMASK

### Thêm mạng Hardhat Local:
- **Network Name:** Hardhat Local
- **RPC URL:** http://127.0.0.1:8545
- **Chain ID:** 31337
- **Currency Symbol:** ETH

### Import tài khoản Admin (Account #0):
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Địa chỉ: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

## 📋 LUỒNG SỬ DỤNG HOÀN CHỈNH

### 🔹 ADMIN - THIẾT LẬP HỆ THỐNG

1. **Đăng nhập với tài khoản admin**
   - Vào: http://localhost:8080/login.html
   - Username: `admin`, Password: `admin123`

2. **Kết nối MetaMask**
   - Nhấn nút "KẾT NỐI METAMASK"
   - Chọn tài khoản đã import
   - Nhấn "Confirm"

3. **Đăng ký cử tri** (Tab Quản Trị)
   - Copy địa chỉ ví: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Dán vào ô "Địa chỉ ví cử tri"
   - Nhấn "Đăng ký cử tri"
   - Confirm trong MetaMask

4. **Bắt đầu giai đoạn đăng ký ứng viên**
   - Nhấn nút "▶️ BẮT ĐẦU ĐĂNG KÝ ỨNG VIÊN"
   - Confirm trong MetaMask
   - Đợi transaction thành công
   - Trạng thái đổi sang "Đăng ký"

5. **Đăng ký ứng viên** (Tab Đăng Ký Ứng Viên)
   - Họ tên: `Nguyễn Văn A`
   - Vị trí: Chọn `Lớp trưởng`
   - Giới thiệu: `Tôi cam kết...`
   - Nhấn "ĐĂNG KÝ ỨNG CỬ"
   - Confirm trong MetaMask

6. **Bắt đầu bỏ phiếu** (Tab Quản Trị)
   - Nhấn "🗳️ BẮT ĐẦU BỎ PHIẾU"
   - Confirm trong MetaMask
   - Trạng thái đổi sang "Bỏ phiếu"

7. **Bỏ phiếu** (Tab Bỏ Phiếu)
   - Chọn ứng viên
   - Nhấn "Bỏ phiếu cho ứng viên này"
   - Confirm trong MetaMask

8. **Xem kết quả** (Tab Kết Quả)
   - Nhấn "Làm mới kết quả"
   - Xem biểu đồ và số phiếu

9. **Kết thúc bầu cử** (Tab Quản Trị)
   - Nhấn "🏁 KẾT THÚC BẦU CỬ"
   - Confirm trong MetaMask

### 🔹 SINH VIÊN - THAM GIA BẦU CỬ

1. **Đăng nhập**
   - Username: `student1`, Password: `123456`

2. **Kết nối MetaMask**
   - Import Account #1: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
   - Kết nối

3. **Đăng ký ứng viên** (nếu admin đã bật chế độ Registration)
   - Tab "Đăng Ký Ứng Viên"
   - Điền thông tin
   - Submit

4. **Bỏ phiếu** (khi admin bật chế độ Voting)
   - Tab "Bỏ Phiếu"
   - Chọn ứng viên
   - Vote

5. **Xem kết quả**
   - Tab "Kết Quả"
   - Xem số phiếu và biểu đồ

## 🔒 BẦU CỬ KHÉP KÍN

1. **Chuyển sang chế độ khép kín**
   - Nhấn nút "🔒 BẦU CỬ KHÉP KÍN"

2. **Nhập mật khẩu**
   - Mật khẩu mặc định (do admin cấu hình)
   - Hoặc xem trong tab "Cấu hình"

3. **Thực hiện bỏ phiếu**
   - Tương tự chế độ công khai
   - Nhưng có thêm lớp bảo mật mật khẩu

## ❌ CÁC LỖI THƯỜNG GẶP & CÁCH SỬA

### 1. "Chưa kết nối"
- **Nguyên nhân:** MetaMask chưa kết nối
- **Giải pháp:** Nhấn "KẾT NỐI METAMASK"

### 2. "Chi admin moi co quyen thuc hien"
- **Nguyên nhân:** Không phải tài khoản admin
- **Giải pháp:** Import Account #0 vào MetaMask

### 3. "Ban chua duoc dang ky lam cu tri"
- **Nguyên nhân:** Admin chưa đăng ký địa chỉ làm cử tri
- **Giải pháp:** Admin vào tab Quản Trị → Đăng ký cử tri

### 4. "Khong dung trang thai bau cu"
- **Nguyên nhân:** Trạng thái bầu cử không đúng
- **Giải pháp:** 
  - Đăng ký ứng viên: Cần state = "Đăng ký"
  - Bỏ phiếu: Cần state = "Bỏ phiếu"

### 5. "Lỗi tải danh sách ứng viên"
- **Nguyên nhân:** Contract chưa deploy hoặc Hardhat node chưa chạy
- **Giải pháp:** Kiểm tra lại Terminal 1 (node) và Terminal 2 (deploy)

### 6. "ECONNREFUSED 127.0.0.1:8545"
- **Nguyên nhân:** Hardhat node không chạy
- **Giải pháp:** Chạy lại `npx hardhat node`

## 📝 DANH SÁCH 20 TÀI KHOẢN TEST

### Account #0 - ADMIN
- Địa chỉ: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

### Account #1
- Địa chỉ: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

### Account #2
- Địa chỉ: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
- Private Key: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

*... (18 tài khoản khác tương tự)*

## 🎯 DEMO CHO GIÁO VIÊN

1. Mở 3 Terminal theo thứ tự
2. Đăng nhập admin
3. Kết nối MetaMask
4. Demo luồng: Setup → Registration → Voting → End
5. Đăng nhập student1 để demo bỏ phiếu
6. Xem kết quả cuối cùng

## 📞 HỖ TRỢ

- Nếu gặp lỗi, kiểm tra Console (F12)
- Xem Terminal có báo lỗi không
- Đảm bảo cả 3 Terminal đang chạy
- MetaMask phải kết nối đúng network "Hardhat Local"
