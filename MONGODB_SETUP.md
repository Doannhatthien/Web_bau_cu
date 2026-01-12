# Hướng Dẫn Kết Nối MongoDB

## Bước 1: Cài đặt MongoDB

### Tùy chọn 1: MongoDB Local (Khuyên dùng cho dev)
1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Cài đặt và chạy MongoDB service
3. Mở MongoDB Compass (GUI tool đi kèm)

### Tùy chọn 2: MongoDB Atlas (Cloud - Miễn phí)
- Bạn đã có URI trong `.env`:
```
mongodb+srv://BauCuWeb:wpgjFkXMN1Z5EFpZ@cluster0.viv3ng4.mongodb.net/BauCuDB
```

## Bước 2: Cài đặt dependencies

```bash
cd backend
npm install
```

## Bước 3: Seed dữ liệu mẫu

```bash
cd backend
node seedDatabase.js
```

Sẽ tạo 3 tài khoản:
- **admin** / admin123 (Admin)
- **student1** / 123456 (Student)  
- **student2** / 123456 (Student)

## Bước 4: Khởi động Backend Server

```bash
cd backend
npm start
```

Server sẽ chạy tại: **http://localhost:5000**

## Bước 5: Sửa Frontend để dùng MongoDB

### Cách 1: Đổi tên file (Khuyên dùng)
```bash
cd contracts/Frontend

# Backup file cũ
ren auth.js auth-local.js

# Dùng file MongoDB
ren auth-mongo.js auth.js
```

### Cách 2: Sửa trong login.html
Thay dòng:
```html
<script src="auth.js"></script>
```

Thành:
```html
<script src="auth-mongo.js"></script>
```

## Bước 6: Khởi động Frontend

```bash
cd contracts/Frontend
npx http-server -p 8000
```

## Bước 7: Test hệ thống

1. Mở http://127.0.0.1:8000/login.html
2. Đăng nhập với:
   - Username: `student1`
   - Password: `123456`
3. Kết nối MetaMask với wallet: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`

## Kiểm tra Backend đang chạy

Mở browser: http://localhost:5000/api/test

Nếu thấy response JSON → Backend OK!

## API Endpoints

- **POST** `/api/auth/register` - Đăng ký user mới
- **POST** `/api/auth/login` - Đăng nhập
- **GET** `/api/auth/me` - Lấy thông tin user (cần token)

## Troubleshooting

### Lỗi "ECONNREFUSED 127.0.0.1:5000"
→ Backend chưa chạy. Chạy: `cd backend && npm start`

### Lỗi "MongooseError: Operation users.find() buffering"
→ MongoDB chưa chạy hoặc URI sai

### Lỗi CORS
→ Kiểm tra `CORS_ORIGIN` trong `.env`:
```
CORS_ORIGIN=http://localhost:8000
```

## Cấu trúc Database

### Collection: `users`
```javascript
{
  username: String,
  password: String (hashed),
  fullName: String,
  studentId: String,
  walletAddress: String,
  role: 'student' | 'admin',
  hasVoted: Boolean,
  votedAt: Date,
  createdAt: Date
}
```

## Lợi ích của MongoDB

✅ Lưu trữ lâu dài (không mất khi reload browser)
✅ Bảo mật hơn (password được hash)
✅ Nhiều user có thể dùng cùng lúc
✅ Có thể query, tìm kiếm dễ dàng
✅ Scale được khi có nhiều users

## Scripts hữu ích

```bash
# Xem logs MongoDB
mongod --dbpath /data/db

# Connect MongoDB CLI
mongosh

# Xem tất cả users
db.users.find()

# Xóa tất cả users
db.users.deleteMany({})

# Seed lại data
node seedDatabase.js
```

## Quay lại localStorage (nếu cần)

```bash
cd contracts/Frontend
ren auth.js auth-mongo.js
ren auth-local.js auth.js
```
