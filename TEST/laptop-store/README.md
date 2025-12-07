# Laptop Store - Trang Web Bán Laptop

## 📋 Mô Tả Dự Án
Trang web bán laptop đầy đủ chức năng được xây dựng bằng các công nghệ mã nguồn mở. Ứng dụng hỗ trợ xem danh sách sản phẩm, tìm kiếm, lọc, giỏ hàng, thanh toán và quản lý admin.

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React.js** - UI library
- **HTML5, CSS3 (SCSS)** - Markup & styling
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Redux** - State management (optional)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **CORS** - Cross-origin support

### Tools & Development
- **Git & GitHub** - Version control
- **ESLint & Prettier** - Code quality
- **npm** - Package manager
- **Postman/REST Client** - API testing

## 📦 Cấu Trúc Thư Mục

```
laptop-store/
├── frontend/                  # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── styles/           # SCSS files
│   │   ├── utils/            # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── backend/                   # Node.js + Express backend
│   ├── controllers/          # Route handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env.example
├── database/                 # Database files & scripts
│   ├── schema.sql            # Database schema
│   ├── sample-data.sql       # Sample data
│   └── laptop-store.db       # SQLite database
├── docs/                     # Documentation
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   └── USER_MANUAL.md
├── .gitignore
└── README.md
```

## 🚀 Cài Đặt & Chạy

### Yêu cầu
- Node.js >= 14.0
- npm >= 6.0
- SQLite3

### 1. Clone Repository
```bash
git clone <repository-url>
cd laptop-store
```

### 2. Cài Đặt Backend
```bash
cd backend
npm install
npm start
```

Backend sẽ chạy trên `http://localhost:5000`

### 3. Cài Đặt Frontend
```bash
cd frontend
npm install
npm start
```

Frontend sẽ chạy trên `http://localhost:3000`

## 📚 Tính Năng Chính

### Người Dùng
- ✅ Xem danh sách sản phẩm
- ✅ Lọc theo hãng, giá, cấu hình
- ✅ Xem chi tiết sản phẩm
- ✅ Tìm kiếm sản phẩm
- ✅ Giỏ hàng
- ✅ Thanh toán
- ✅ Đăng nhập/Đăng ký
- ✅ Lịch sử đơn hàng

### Quản Trị
- ✅ CRUD sản phẩm
- ✅ Quản lý đơn hàng
- ✅ Quản lý người dùng
- ✅ Thống kê

## 📖 Tài Liệu

Xem chi tiết trong thư mục `docs/`:
- [INSTALLATION.md](docs/INSTALLATION.md) - Hướng dẫn cài đặt chi tiết
- [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) - Tài liệu API
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Sơ đồ cơ sở dữ liệu
- [USER_MANUAL.md](docs/USER_MANUAL.md) - Hướng dẫn sử dụng

## 🎯 Quy Trình Phát Triển

### Git Workflow
1. Tạo branch từ `main`
2. Commit thường xuyên với message rõ ràng
3. Push code lên branch
4. Tạo Pull Request

### Ví Dụ Commit Messages
```
feat: add product filtering by price
fix: resolve cart total calculation bug
docs: update API documentation
style: format code with prettier
refactor: improve product service
```

## 📝 Ghi Chú

- Database mặc định sử dụng SQLite cho mục đích học tập
- Có thể thay đổi sang MySQL/PostgreSQL bằng cách cập nhật backend
- Sample data có ~20 laptop từ các hãng: Dell, HP, Lenovo, Asus, Acer, Apple, MSI

## 👥 Tác Giả

Dự án tập luyện cho môn Thực Hành Mã Nguồn Mở

## 📄 Giấy Phép

MIT License
