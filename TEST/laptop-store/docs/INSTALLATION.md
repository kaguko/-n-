# Hướng Dẫn Cài Đặt & Chạy Laptop Store

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: >= 14.0
- **npm**: >= 6.0
- **Python** (optional): >= 3.7 (nếu muốn chạy backend Python)
- **SQLite3**: Đi kèm với Node.js

## 🚀 Bước 1: Chuẩn Bị

### 1.1 Clone Repository
```bash
git clone <repository-url>
cd laptop-store
```

### 1.2 Cấu trúc dự án
```
laptop-store/
├── frontend/              # React.js application
├── backend/               # Node.js + Express API
├── database/              # Database files
├── docs/                  # Documentation
└── README.md
```

## 🔧 Bước 2: Cài Đặt Backend

### 2.1 Điều hướng đến thư mục backend
```bash
cd backend
```

### 2.2 Cài đặt dependencies
```bash
npm install
```

### 2.3 Tạo file `.env`
Sao chép `.env.example` thành `.env`:
```bash
cp .env.example .env
```

Chỉnh sửa `.env` nếu cần:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
DATABASE_PATH=../database/laptop-store.db
CORS_ORIGIN=http://localhost:3000
```

### 2.4 Khởi động backend
```bash
npm start
```

Backend sẽ chạy trên: `http://localhost:5000`

## 📦 Bước 3: Tạo & Khởi Tạo Database

### 3.1 Khởi tạo database (Tự động)
Mở browser và truy cập:
```
http://localhost:5000/api/init-db
```

Bạn sẽ nhận được response:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

Điều này sẽ:
- Tạo các bảng từ `schema.sql`
- Import dữ liệu mẫu từ `sample-data.sql`
- Tạo file `laptop-store.db` trong thư mục `database/`

### 3.2 Kiểm tra API (Tùy chọn)
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 💻 Bước 4: Cài Đặt Frontend

### 4.1 Mở terminal mới, điều hướng đến thư mục frontend
```bash
cd frontend
```

### 4.2 Cài đặt dependencies
```bash
npm install
```

### 4.3 Tạo file `.env`
```bash
cp .env.example .env
```

Nội dung `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4.4 Khởi động frontend
```bash
npm start
```

Frontend sẽ tự động mở trên: `http://localhost:3000`

## ✅ Bước 5: Kiểm Tra Cài Đặt

### Trang web chính
- Homepage: `http://localhost:3000`
- Danh sách sản phẩm: `http://localhost:3000/products`
- Đăng nhập: `http://localhost:3000/login`

### Test Đăng Nhập (Admin)
```
Email: admin@laptopstore.com
Password: (Cần hash password trước khi đăng nhập lần đầu)
```

Hoặc đăng ký tài khoản mới:
- Truy cập: `http://localhost:3000/register`
- Điền thông tin
- Đăng nhập

### Test API
```bash
# Danh sách sản phẩm
curl http://localhost:5000/api/products

# Danh sách danh mục
curl http://localhost:5000/api/categories

# Danh sách hãng
curl http://localhost:5000/api/products/brands
```

## 🐛 Troubleshooting

### Backend không khởi động
1. Kiểm tra port 5000 có đang sử dụng:
   ```bash
   netstat -ano | findstr :5000  # Windows
   lsof -i :5000                 # macOS/Linux
   ```

2. Xóa node_modules và cài lại:
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

### Frontend không kết nối API
1. Kiểm tra CORS_ORIGIN trong backend/.env
2. Kiểm tra REACT_APP_API_URL trong frontend/.env
3. Đảm bảo backend đang chạy trước khi khởi động frontend

### Database không được tạo
1. Xóa file `database/laptop-store.db` nếu tồn tại
2. Truy cập lại `http://localhost:5000/api/init-db`
3. Kiểm tra quyền truy cập thư mục `database/`

### Lỗi npm
```bash
npm cache clean --force
npm install
```

## 📚 Chi Tiết Cấu Hình

### Backend Architecture
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

### Frontend Architecture
- **Framework**: React.js 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **State Management**: localStorage (+ React Context optional)

## 🔐 Bảo Mật

### Thay đổi JWT Secret
Trong `backend/.env`:
```
JWT_SECRET=your_very_long_secret_key_here
```

### Cấu hình CORS
Trong `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
```

## 🚀 Triển Khai Production

### Build Frontend
```bash
cd frontend
npm run build
```

Các file static sẽ được tạo trong thư mục `build/`

### Cấu hình Backend
Thay đổi trong `backend/.env`:
```
NODE_ENV=production
JWT_SECRET=long_random_secret_key
DATABASE_PATH=/path/to/database/laptop-store.db
CORS_ORIGIN=https://yourdomain.com
```

### Deploy Options
1. **Heroku**
2. **DigitalOcean**
3. **AWS EC2**
4. **Docker** (xem docker-compose.yml)
5. **VPS**

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong terminal
2. Xem file `.env` đúng chưa
3. Đảm bảo tất cả dependencies đã install
4. Kiểm tra port 3000 và 5000 không bị chiếm dụng

---

**Bây giờ bạn đã sẵn sàng phát triển Laptop Store! 🎉**
