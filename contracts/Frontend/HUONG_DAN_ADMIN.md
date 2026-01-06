# 🔐 HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG ADMIN - BẦU CỬ CÔNG KHAI

## ✅ Xác nhận: Trang Bầu Cử Công Khai đã có đầy đủ các chức năng!

Trang **index.html (Bầu cử Công khai)** hiện đã có **TẤT CẢ** các chức năng quản trị giống với trang Bầu cử Khép kín, bao gồm:

### 📋 Các Chức Năng Admin Có Sẵn:

1. **📊 Điều Khiển Trạng Thái Bầu Cử**
   - ▶️ Bắt đầu đăng ký ứng viên
   - 🗳️ Bắt đầu bỏ phiếu
   - 🏁 Kết thúc bầu cử

2. **👥 Đăng Ký Cử Tri**
   - Đăng ký từng cử tri
   - Đăng ký hàng loạt (nhiều địa chỉ)

3. **➕ Thêm Ứng Viên (Admin)**
   - Thêm ứng viên trực tiếp (không cần đăng ký)
   - Chọn vị trí: Lớp trưởng, Lớp phó, Bí thư

4. **👨‍🎓 Danh Sách Sinh Viên**
   - Tải danh sách từ MongoDB (nếu có backend)

---

## 🎯 HƯỚNG DẪN KÍCH HOẠT CHỨC NĂNG ADMIN

### Bước 1: Cấu hình MetaMask

1. **Thêm mạng Hardhat Local**:
   ```
   Network Name: Hardhat Local
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   Currency Symbol: ETH
   ```

2. **Import Tài khoản Admin**:
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - Địa chỉ sẽ là: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Tài khoản này có 10,000 ETH

### Bước 2: Đăng Nhập Web

1. Truy cập: http://127.0.0.1:8000/login.html
2. Đăng nhập với:
   - Username: `admin`
   - Password: `admin123`

### Bước 3: Kết Nối MetaMask

1. Trên trang chính, nhấn nút **"🦊 Kết nối MetaMask"**
2. MetaMask sẽ bật lên → Chọn account Admin (0xf39F...)
3. Nhấn "Connect"

### Bước 4: Kiểm Tra Tab Quản Trị

Sau khi kết nối thành công:
- ✅ Tab **"Đăng Ký Ứng Viên"** sẽ hiện
- ✅ Tab **"Quản Trị"** sẽ hiện (CHỈ cho Admin)
- ✅ Thông báo: "Kết nối thành công! 🔑 Bạn là Admin - Có quyền truy cập đầy đủ!"

---

## 🚀 SỬ DỤNG CÁC CHỨC NĂNG ADMIN

### 1. Khởi động quy trình bầu cử

```
Tab "Quản Trị" → Điều Khiển Trạng Thái Bầu Cử
```

**Quy trình:**
1. Nhấn **"▶️ Bắt đầu đăng ký ứng viên"**
   → Trạng thái chuyển sang: "Đăng ký"
   
2. Thêm ứng viên (2 cách):
   - **Cách 1**: Admin tự thêm → Tab "Quản Trị" → "Thêm Ứng Viên"
   - **Cách 2**: Cử tri tự đăng ký → Tab "Đăng Ký Ứng Viên"
   
3. Nhấn **"🗳️ Bắt đầu bỏ phiếu"**
   → Trạng thái chuyển sang: "Bỏ phiếu"
   → Cử tri có thể bỏ phiếu
   
4. Nhấn **"🏁 Kết thúc bầu cử"**
   → Trạng thái: "Kết thúc"
   → Xem kết quả tại tab "Kết Quả"

### 2. Đăng ký cử tri

```
Tab "Quản Trị" → Đăng Ký Cử Tri
```

**Đăng ký từng người:**
1. Nhập địa chỉ ví (ví dụ: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`)
2. Nhấn "Đăng ký cử tri"

**Đăng ký hàng loạt:**
1. Nhập nhiều địa chỉ, mỗi địa chỉ 1 dòng:
   ```
   0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
   0x90F79bf6EB2c4f870365E785982E1f101E93b906
   ```
2. Nhấn "Đăng ký hàng loạt"
3. Các cử tri này sẽ có quyền đăng ký làm ứng viên

### 3. Thêm ứng viên (Admin)

```
Tab "Quản Trị" → Thêm Ứng Viên (Admin)
```

1. Nhập tên: `Nguyễn Văn A`
2. Chọn vị trí: `Lớp trưởng`
3. Nhấn "Thêm ứng viên"

**Lưu ý:** Admin có thể thêm ứng viên bất kỳ lúc nào, không cần đăng ký trước.

---

## 🔍 KIỂM TRA NHANH

### Nếu không thấy Tab "Quản Trị":

1. **Kiểm tra đã kết nối MetaMask chưa?**
   - Xem góc trên phải, phải có: "Đã kết nối" + địa chỉ ví

2. **Kiểm tra địa chỉ có đúng là Admin không?**
   - Địa chỉ Admin: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Mở MetaMask → Xem địa chỉ đang kết nối
   - Nếu sai → Chuyển sang account đúng → Reload trang → Kết nối lại

3. **Kiểm tra Console log:**
   - F12 → Console
   - Tìm dòng: `Is admin: true`
   - Nếu `false` → Địa chỉ không phải admin

### Test nhanh với 20 accounts có sẵn:

Hardhat cung cấp 20 accounts test, mỗi account có 10,000 ETH:

| STT | Địa chỉ | Private Key | Vai trò |
|-----|---------|-------------|---------|
| 0 | 0xf39F...2266 | 0xac097...f2ff80 | **ADMIN** |
| 1 | 0x7099...79C8 | 0x59c69...b78690d | Cử tri |
| 2 | 0x3C44...93BC | 0x5de41...dab365a | Cử tri |

---

## 📝 KẾT LUẬN

✅ **Trang Bầu cử Công khai (index.html) đã có ĐẦY ĐỦ các chức năng quản trị!**

Các chức năng này chỉ hiển thị khi:
1. Đã đăng nhập vào website
2. Đã kết nối MetaMask
3. Kết nối với địa chỉ Admin đúng

Nếu bạn vẫn không thấy tab "Quản Trị", hãy:
- Reload lại trang (Ctrl + F5)
- Kiểm tra Console log (F12)
- Đảm bảo đã kết nối đúng account admin trong MetaMask

---

**© 2025 - Hệ Thống Bầu Cử Blockchain**
