# Laptop Store - Trang Web Bán Laptop

## 📋 Mô Tả Dự Án
Trang web bán laptop đầy đủ chức năng được xây dựng bằng các công nghệ mã nguồn mở. Ứng dụng hỗ trợ xem danh sách sản phẩm, tìm kiếm, lọc, giỏ hàng, thanh toán và quản lý admin.

## ✅ Các Vấn Đã Được Fix
- **Database**: Chuyển từ SQLite sang PostgreSQL để tránh native binary issues
- **Schema**: Thêm các columns cần thiết: `brand`, `cpu`, `ram`, `storage`, `graphics`, `display`
- **File paths**: Sửa đường dẫn database từ `../database` → `./database`
- **Authentication**: Sửa lỗi xác thực với bcrypt password verification

## 🧪 Test Status
- ✅ **Init-db**: Tạo schema + sample data (20+ sản phẩm laptop)
- ✅ **Login**: admin@example.com / admin123
- ✅ **Products API**: Trả về dữ liệu đầy đủ
- ✅ **Frontend load**: Status 200, kết nối backend thành công

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React 18.2.0** - UI library
- **Tailwind CSS 3.3.2** - Utility-first CSS framework
- **React Router 6.11.2** - Client-side routing
- **React Icons 4.8.0** - Icon library
- **Axios 1.4.0** - HTTP client
- **HTML5, CSS3** - Markup & styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database (đã chuyển từ SQLite)
- **JWT** - Authentication
- **bcrypt** - Password hashing
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
│   │   ├── services/         # API services (Axios)
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── backend/                   # Node.js + Express backend
│   ├── controllers/          # Route handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware (auth, error)
│   ├── database/             # Database connection & queries
│   │   ├── connection.js     # PostgreSQL connection
│   │   ├── schema.sql        # Database schema
│   │   └── seed.sql          # Sample data
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env.example
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

### Yêu cầu hệ thống
- **Node.js** >= 14.0
- **npm** >= 6.0
- **PostgreSQL** >= 12.0
- **pgAdmin** (optional, for database management)

### 1. Clone Repository
```bash
git clone <repository-url>
cd laptop-store
```

### 2. Cài Đặt Backend
```bash
cd backend
npm install
```

### 3. Cấu hình PostgreSQL
```bash
# Tạo database
createdb laptop_store

# Chạy schema và seed data
psql -d laptop_store -f database/schema.sql
psql -d laptop_store -f database/seed.sql
```

### 4. Cấu hình Environment Variables
Tạo file `.env` trong thư mục `backend/`:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=laptop_store
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
```

### 5. Khởi động Backend
```bash
npm start
# Hoặc chạy development mode
npm run dev
```
Backend sẽ chạy trên `http://localhost:5000`

### 6. Cài Đặt Frontend
```bash
cd frontend
npm install
```

### 7. Cấu hình Frontend Environment
Tạo file `.env` trong thư mục `frontend/`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 8. Khởi động Frontend
```bash
npm start
```
Frontend sẽ chạy trên `http://localhost:3000`

## 🔐 Tài Khoản Mặc Định
- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

## 📚 Tính Năng Chính

### Người Dùng
- ✅ Xem danh sách sản phẩm với đầy đủ thông số (CPU, RAM, Storage, Graphics, Display)
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
- ✅ Thống kê doanh thu

## 📖 Tài Liệu

Xem chi tiết trong thư mục `docs/`:
- [INSTALLATION.md](docs/INSTALLATION.md) - Hướng dẫn cài đặt chi tiết
- [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) - Tài liệu API endpoints
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Sơ đồ cơ sở dữ liệu
- [USER_MANUAL.md](docs/USER_MANUAL.md) - Hướng dẫn sử dụng

## 🗄️ Database Schema (Cập nhật)

### Tables chính:
1. **users** - Người dùng
2. **products** - Sản phẩm (đã thêm: brand, cpu, ram, storage, graphics, display)
3. **orders** - Đơn hàng
4. **order_items** - Chi tiết đơn hàng
5. **categories** - Danh mục

## 🎯 Quy Trình Phát Triển

### Git Workflow
1. Tạo branch từ `main`:
   ```bash
   git checkout -b feature/feature-name
   ```
2. Commit thường xuyên với message rõ ràng
3. Push code lên branch:
   ```bash
   git push origin feature/feature-name
   ```
4. Tạo Pull Request trên GitHub

### Quy ước Commit Messages
```
feat: add product filtering by specifications
fix: resolve PostgreSQL connection issue
docs: update installation guide for PostgreSQL
style: improve UI with Tailwind classes
refactor: migrate from SQLite to PostgreSQL
test: add API endpoint tests
chore: update dependencies
```

## 🐛 Troubleshooting

### Vấn đề thường gặp:
1. **Kết nối PostgreSQL thất bại**
   - Kiểm tra PostgreSQL service đang chạy
   - Verify credentials trong `.env` file
   - Kiểm tra firewall settings

2. **Frontend không kết nối được backend**
   - Kiểm tra CORS configuration
   - Verify `REACT_APP_API_URL` trong frontend `.env`
   - Kiểm tra backend đang chạy trên port 5000

3. **Authentication errors**
   - Clear browser cookies/local storage
   - Kiểm tra JWT secret khớp giữa frontend và backend

## 🚀 Deployment

### Backend (Vercel/Heroku/Railway)
1. Set up PostgreSQL add-on
2. Configure environment variables
3. Deploy with `npm start`

### Frontend (Vercel/Netlify)
1. Set build command: `npm run build`
2. Set environment variables
3. Deploy

## 👥 Tác Giả
Dự án thực hành mã nguồn mở - Phát triển ứng dụng web fullstack

## 📄 Giấy Phép
MIT License

## 🔗 Liên Kết Nhanh
- [Backend API](http://localhost:5000/api)
- [Frontend](http://localhost:3000)
- [Admin Panel](http://localhost:3000/admin) (cần đăng nhập admin)
- [GitHub Repository](https://github.com/your-username/laptop-store)

---
*Lưu ý: Đảm bảo PostgreSQL đã được cài đặt và chạy trước khi khởi động backend.*
