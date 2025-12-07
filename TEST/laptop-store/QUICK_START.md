# 🚀 Quick Start Guide

Bắt đầu nhanh với Laptop Store trong 5 phút!

---

## 📋 Yêu Cầu

- Node.js >= 14
- npm >= 6
- Git

---

## ⚡ Cài Đặt Nhanh

### 1️⃣ Clone & Setup

```bash
git clone <repository-url>
cd laptop-store
```

### 2️⃣ Backend

```bash
cd backend

# Cài dependencies
npm install

# Khởi động server
npm start
```

✅ Backend chạy: `http://localhost:5000`

### 3️⃣ Khởi Tạo Database

Mở browser, truy cập:
```
http://localhost:5000/api/init-db
```

✅ Database initialized!

### 4️⃣ Frontend (Terminal mới)

```bash
cd frontend

# Cài dependencies
npm install

# Khởi động frontend
npm start
```

✅ Frontend chạy: `http://localhost:3000` (tự động mở)

---

## ✅ Kiểm Tra

1. **Trang chủ**: `http://localhost:3000`
2. **Danh sách sản phẩm**: Xem sản phẩm Dell, HP, Lenovo, etc.
3. **Giỏ hàng**: Thêm sản phẩm vào giỏ
4. **Đăng ký**: Tạo tài khoản mới
5. **Đặt hàng**: Hoàn thành mua hàng

---

## 🎯 Tính Năng Chính

✅ Xem 25+ laptop từ 7 hãng nổi tiếng  
✅ Tìm kiếm & lọc theo hãng, giá  
✅ Giỏ hàng lưu local  
✅ Đăng ký/Đăng nhập  
✅ Đặt hàng  
✅ Xem lịch sử đơn  
✅ Admin panel (quản lý sản phẩm, đơn, thống kê)  

---

## 📚 API Test (Tùy chọn)

```bash
# Danh sách sản phẩm
curl http://localhost:5000/api/products

# Danh mục
curl http://localhost:5000/api/categories

# Kiểm tra API
curl http://localhost:5000/api/health
```

---

## 🔒 Admin Login (Nếu cần)

Sử dụng tài khoản admin:
```
Email: admin@laptopstore.com
Password: (cần cấu hình trong database)
```

Hoặc đăng ký tài khoản mới sau đó:
1. Vào DB (database/laptop-store.db)
2. Update role = 'admin' cho tài khoản đó

---

## 🆘 Troubleshooting

| Vấn đề | Giải pháp |
|--------|----------|
| Port 5000 đang sử dụng | Đổi PORT trong backend/.env |
| Port 3000 đang sử dụng | Kill process hoặc dùng port khác |
| API không kết nối | Kiểm tra CORS_ORIGIN trong backend/.env |
| Database không được tạo | Truy cập `/api/init-db` lại |
| Không thể đặt hàng | Phải đăng nhập trước |

---

## 📂 File Cấu Hình

### Backend
- `backend/.env` - Cấu hình backend
- `backend/server.js` - Main server
- `database/schema.sql` - Database schema

### Frontend
- `frontend/.env` - Cấu hình frontend
- `frontend/src/App.js` - Main app
- `frontend/src/services/api.js` - API client

---

## 🔗 Links Hữu Ích

- 📖 [Installation Guide](docs/INSTALLATION.md)
- 📚 [API Documentation](docs/API_DOCUMENTATION.md)
- 💾 [Database Schema](docs/DATABASE_SCHEMA.md)
- 👥 [User Manual](docs/USER_MANUAL.md)
- 🤝 [Contributing](CONTRIBUTING.md)

---

## 🎓 Tiếp Theo

1. **Khám phá Frontend**: Xem components trong `src/components/`
2. **Khám phá Backend**: Xem routes trong `backend/routes/`
3. **Đọc Tài Liệu**: Xem `docs/` folder
4. **Chỉnh Sửa Dữ Liệu**: Edit `database/sample-data.sql`
5. **Thêm Tính Năng**: Follow [Contributing Guide](CONTRIBUTING.md)

---

## 💡 Tips

- Frontend cache sản phẩm ở localStorage
- Backend lưu JWT token ở header
- Database được reset mỗi lần khởi tạo
- Dùng REST Client (VS Code) để test API

---

## 📞 Cần Giúp?

1. Kiểm tra [Troubleshooting](#-troubleshooting)
2. Xem logs trong terminal
3. Đọc [INSTALLATION.md](docs/INSTALLATION.md)
4. Tạo issue trên GitHub

---

**Bây giờ bạn sẵn sàng! 🎉 Mở `http://localhost:3000` và bắt đầu khám phá!**
