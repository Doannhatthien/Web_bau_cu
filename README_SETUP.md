# 🗳️ Hệ Thống Bầu Cử Lớp Blockchain

## 📁 Cấu Trúc Dự Án (Đã Dọn Dẹp)

```
Web_bau_cu/
├── contracts/
│   ├── ClassElection.sol          # Smart contract chính
│   └── Frontend/                  # Frontend (HTML/CSS)
│       ├── index.html            # Trang bầu cử công khai
│       ├── login.html            # Trang đăng nhập
│       ├── private-voting.html   # Trang bầu cử khép kín
│       ├── election-config.html  # Trang cấu hình
│       ├── style.css             # CSS chính
│       ├── login.css             # CSS đăng nhập
│       └── HUONG_DAN_SU_DUNG.md  # Hướng dẫn chi tiết
│
├── backend/
│   ├── server.js                 # Express server
│   ├── config/                   # Cấu hình
│   │   ├── blockchain.js        # Web3 config
│   │   └── database.js          # MongoDB config
│   ├── controllers/             # Business logic
│   ├── middleware/              # Auth & error handling
│   ├── models/                  # Database models
│   └── routes/                  # API routes
│
├── scripts/
│   └── deploy.js                # Script deploy contract
│
├── test/
│   └── ClassElection.test.js    # Unit tests
│
├── hardhat.config.js            # Hardhat configuration
├── package.json                 # Dependencies
├── start-all.bat               # Khởi động toàn bộ hệ thống
└── start-system.bat            # Script khởi động chi tiết

```

## 🚀 Khởi Động Hệ Thống

### Cách 1: Tự Động (Khuyên dùng)
```bash
start-all.bat
```
Script này sẽ tự động:
1. Khởi động Hardhat node
2. Deploy smart contract
3. Khởi động backend server
4. Khởi động frontend server

### Cách 2: Thủ Công
```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3: Start backend
cd backend
npm start

# Terminal 4: Start frontend
cd contracts/Frontend
npx http-server -p 8000
```

## 📝 Thông Tin Quan Trọng

### Contract Address (Hiện tại)
```
0x67d269191c92Caf3cD7723F116c85e6E9bf55933
```

### Admin Account
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

### Test Accounts (Cử Tri)
**Account #1:**
- Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

**Account #2:**
- Address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
- Private Key: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

**Account #3:**
- Address: `0x90F79bf6EB2c4f870365E785982E1f101E93b906`
- Private Key: `0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6`

### Web Login
**Admin:**
- Username: `admin`
- Password: `admin123`

**Student:**
- Username: `student1`
- Password: `123456`

## 🔧 Các Lệnh Hữu Ích

```bash
# Deploy contract mới
npx hardhat run scripts/deploy.js --network localhost

# Chạy tests
npx hardhat test

# Compile contract
npx hardhat compile

# Clean cache
npx hardhat clean
```

## 📚 Tài Liệu

Xem hướng dẫn chi tiết tại: `contracts/Frontend/HUONG_DAN_SU_DUNG.md`

## 🛠️ Tech Stack

- **Blockchain:** Ethereum (Hardhat)
- **Smart Contract:** Solidity ^0.8.0
- **Backend:** Node.js + Express + MongoDB
- **Frontend:** HTML + CSS + JavaScript + Web3.js
- **Wallet:** MetaMask

## ⚠️ Lưu Ý

1. Hệ thống đã được setup sẵn với 3 cử tri và 3 ứng viên
2. Trạng thái hiện tại: **VOTING** (sẵn sàng bỏ phiếu)
3. Mỗi cử tri chỉ bỏ phiếu được 1 lần
4. Contract address thay đổi mỗi khi deploy lại

## 📞 Hỗ Trợ

Nếu gặp vấn đề, kiểm tra:
1. Hardhat node có đang chạy không
2. Contract đã deploy chưa
3. MetaMask đã kết nối đúng mạng chưa (Hardhat Local)
4. Address trong MetaMask có khớp không

---

© 2025 - Hệ Thống Bầu Cử Blockchain
