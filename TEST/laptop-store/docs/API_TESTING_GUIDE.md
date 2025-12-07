# API Testing Guide - Laptop Store

Hướng dẫn chi tiết để test các API endpoints của Laptop Store.

## Chuẩn bị

### 1. Khởi động ứng dụng
```bash
# Terminal 1 - Backend
cd e:\TEST\laptop-store\backend
node server-fixed.js

# Terminal 2 - Frontend
cd e:\TEST\laptop-store\frontend
npm start
```

### 2. Khởi tạo Database
Truy cập: http://localhost:5000/api/init-db

## Testing Endpoints

### A. Products API

#### 1. Lấy tất cả sản phẩm
```bash
GET http://localhost:5000/api/products
```

**Với filter:**
```bash
GET http://localhost:5000/api/products?category=1&brand=Dell&sort=price&order=asc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dell XPS 13",
      "price": 999,
      "brand": "Dell",
      "category_id": 1,
      "cpu": "Intel Core i7-13700K",
      "ram": "16GB",
      "storage": "512GB SSD",
      "screen_size": "13.3 inch FHD",
      "battery_life": "12 hours",
      "description": "Ultrabook cơ động..."
    }
  ]
}
```

#### 2. Lấy chi tiết sản phẩm
```bash
GET http://localhost:5000/api/products/1
```

#### 3. Thêm sản phẩm mới (Admin)
```bash
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "name": "Asus VivoBook 15",
  "price": 599,
  "brand": "Asus",
  "category_id": 2,
  "cpu": "AMD Ryzen 5",
  "ram": "8GB",
  "storage": "256GB SSD",
  "screen_size": "15.6 inch",
  "battery_life": "8 hours",
  "description": "Laptop tầm trung với hiệu suất tốt"
}
```

#### 4. Cập nhật sản phẩm (Admin)
```bash
PUT http://localhost:5000/api/products/1
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "price": 1099,
  "cpu": "Intel Core i9"
}
```

#### 5. Xóa sản phẩm (Admin)
```bash
DELETE http://localhost:5000/api/products/1
Authorization: Bearer YOUR_TOKEN
```

#### 6. Lấy danh sách nhãn hiệu
```bash
GET http://localhost:5000/api/products/brands
```

### B. Categories API

#### 1. Lấy tất cả danh mục
```bash
GET http://localhost:5000/api/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Gaming",
      "description": "Laptop chuyên cho gaming"
    }
  ]
}
```

#### 2. Thêm danh mục (Admin)
```bash
POST http://localhost:5000/api/categories
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Convertible",
  "description": "Laptop gập được 2 trong 1"
}
```

### C. Authentication API

#### 1. Đăng ký
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "nguyen@example.com",
  "password": "password123",
  "phone": "0123456789",
  "address": "123 Đường ABC, TP.HCM"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### 2. Đăng nhập
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

#### 3. Lấy thông tin người dùng
```bash
GET http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_TOKEN
```

### D. Orders API

#### 1. Tạo đơn hàng mới
```bash
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "price": 999
    },
    {
      "product_id": 2,
      "quantity": 2,
      "price": 599
    }
  ],
  "total_amount": 2197,
  "payment_method": "credit_card",
  "shipping_address": "123 Đường ABC, TP.HCM"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "total_amount": 2197,
    "status": "pending",
    "created_at": "2025-12-06"
  }
}
```

#### 2. Lấy đơn hàng của người dùng
```bash
GET http://localhost:5000/api/orders
Authorization: Bearer YOUR_TOKEN
```

#### 3. Lấy chi tiết đơn hàng
```bash
GET http://localhost:5000/api/orders/1
Authorization: Bearer YOUR_TOKEN
```

#### 4. Cập nhật trạng thái đơn hàng
```bash
PUT http://localhost:5000/api/orders/1/status
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "shipped"
}
```

## Testing Tools

### Sử dụng PowerShell/cURL

#### Test GET
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/products" -UseBasicParsing
$response.Content | ConvertFrom-Json | Select-Object -First 1
```

#### Test POST
```powershell
$headers = @{
  "Content-Type" = "application/json"
  "Authorization" = "Bearer YOUR_TOKEN"
}

$body = @{
  name = "Asus VivoBook"
  price = 599
  brand = "Asus"
  category_id = 2
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/products" `
  -Method POST `
  -Headers $headers `
  -Body $body
```

### Sử dụng Postman

1. Import từ backend `/api/openapi.json` (nếu có)
2. Tạo các request thủ công
3. Set Authorization header: `Bearer YOUR_TOKEN`

### Sử dụng React Frontend

1. Truy cập: http://localhost:3000
2. Click "Đăng nhập"
3. Sử dụng tài khoản admin:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Truy cập Admin Dashboard: http://localhost:3000/admin

## Test Data

### Admin Account
```
Email: admin@example.com
Password: admin123
Role: admin
```

### Customer Account
```
Email: customer@example.com
Password: customer123
Role: customer
```

### Sample Products
- Dell XPS 13 - $999
- HP Pavilion 15 - $599
- Lenovo ThinkPad X1 - $1299
- ASUS ROG Gaming - $1799
- Acer Swift 3 - $699
- MacBook Pro - $1999
- MSI GE75 - $1899

## Error Codes

| Code | Pesan | Giải pháp |
|------|-------|-----------|
| 400 | Bad Request | Kiểm tra lại format request |
| 401 | Unauthorized | Kiểm tra token hoặc đăng nhập lại |
| 403 | Forbidden | Bạn không có quyền truy cập |
| 404 | Not Found | Resource không tồn tại |
| 500 | Server Error | Liên hệ quản trị viên |

## Best Practices

1. **Luôn include Token**: Sử dụng Bearer token trong Authorization header
2. **Kiểm tra Content-Type**: Đảm bảo `application/json`
3. **Validate Input**: Kiểm tra dữ liệu trước khi gửi
4. **Handle Errors**: Luôn kiểm tra response status code
5. **Test theo thứ tự**: Register → Login → Create Order → Update Status

## Troubleshooting

### Backend không chạy
```bash
# Kiểm tra port 5000
netstat -ano | findstr :5000

# Xóa database cũ
del database\laptop-store.db

# Khởi động lại
node server-fixed.js
```

### Token không valid
- Hãy chắc chắn token chưa hết hạn
- Kiểm tra format: `Authorization: Bearer TOKEN`
- Đăng nhập lại để lấy token mới

### CORS Error
- Kiểm tra CORS_ORIGIN trong .env
- Đảm bảo frontend chạy trên port 3000
- Kiểm tra header Content-Type

## Next Steps

1. Thử tất cả endpoints
2. Test error cases
3. Tải Postman collection
4. Viết unit tests
5. Chuẩn bị cho production
