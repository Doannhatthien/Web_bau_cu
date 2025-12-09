# Hệ Thống Bầu Cử Lớp - Blockchain

🗳️ Hệ thống bầu cử lớp online dựa trên công nghệ Blockchain - Minh bạch & Bảo mật

## ✨ Tính năng

- 🔐 **Đăng nhập/Đăng ký** - Xác thực người dùng an toàn
- 👥 **Quản lý ứng viên** - Đăng ký và hiển thị danh sách ứng viên
- 🗳️ **Bỏ phiếu** - Hệ thống bỏ phiếu minh bạch
- 📊 **Kết quả real-time** - Xem kết quả bầu cử trực tiếp
- 👑 **Quản trị** - Dashboard dành cho admin
- 🎨 **Giao diện đẹp** - Màu sắc hiện đại (cam, hồng, đỏ, xanh lá)

## 🚀 Cài đặt

### Yêu cầu
- Node.js (v18+)
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

## 💻 Chạy ứng dụng

### Chạy web server
```bash
# Cách 1: Sử dụng npm
npm run serve

# Cách 2: Click file .bat
start-server.bat
# hoặc
RUN-WEB.bat
```

Server sẽ chạy tại: `http://localhost:8000`

### Chạy blockchain node (tùy chọn)
```bash
# Terminal 1: Chạy Hardhat node
npm run node

# Terminal 2: Deploy smart contract
npm run deploy:localhost
```

## 🔑 Tài khoản demo

**Admin:**
- Username: `admin`
- Password: `admin123`

**Student:**
- Username: `student1`
- Password: `123456`

## 📁 Cấu trúc thư mục

```
BLOCKCHAIN/
├── contracts/           # Smart contracts (Solidity)
├── scripts/            # Deploy scripts
├── test/               # Test files
├── artifacts/          # Compiled contracts
├── login.html          # Trang đăng nhập
├── index.html          # Trang chính
├── style.css           # CSS trang chính
├── login.css           # CSS trang đăng nhập
├── auth.js             # Xác thực người dùng
├── app.js              # Logic ứng dụng
└── hardhat.config.js   # Cấu hình Hardhat
```

## 🌐 Chia sẻ qua mạng LAN

Để chia sẻ với máy khác trong cùng mạng:

1. Chạy `start-server.bat`
2. Lấy link hiển thị (ví dụ: `http://192.168.x.x:8000/login.html`)
3. Chia sẻ link cho người khác

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript
- **Blockchain**: Ethereum, Solidity, Hardhat
- **Web3**: Web3.js
- **Server**: http-server (Node.js)

## 📝 License

MIT License

## 👨‍💻 Tác giả

Phát triển bởi nhóm sinh viên

---

⭐ Nếu thấy hữu ích, hãy cho project một star nhé!
