# API Documentation - Laptop Store

## 📌 Base URL
```
http://localhost:5000/api
```

## 🔐 Authentication
Sử dụng JWT Token. Thêm header vào tất cả protected endpoints:
```
Authorization: Bearer <token>
```

---

## 🛒 Products API

### GET /products
Lấy danh sách sản phẩm với filter

**Query Parameters:**
- `search` (string) - Tìm kiếm theo tên
- `brand` (string) - Lọc theo hãng
- `category_id` (number) - Lọc theo danh mục
- `min_price` (number) - Giá tối thiểu
- `max_price` (number) - Giá tối đa

**Example:**
```bash
GET /products?brand=Dell&min_price=15000000&max_price=50000000
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dell XPS 15",
      "brand": "Dell",
      "price": 42990000,
      "cpu": "Intel Core i7-13700H",
      "ram": "16GB DDR5",
      "storage": "1TB NVMe SSD",
      "graphics": "NVIDIA RTX 4070",
      "display": "15.6 inch 4K OLED",
      "stock": 15,
      "category_id": 1,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### GET /products/:id
Lấy chi tiết sản phẩm

**Example:**
```bash
GET /products/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dell XPS 15",
    ...
  }
}
```

### POST /products
Tạo sản phẩm mới (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Laptop",
  "category_id": 1,
  "brand": "Dell",
  "price": 25000000,
  "description": "Description here",
  "cpu": "Intel Core i5",
  "ram": "8GB",
  "storage": "512GB SSD",
  "graphics": "Intel Iris Xe",
  "display": "15.6 inch FHD",
  "image": "/images/laptop.jpg",
  "stock": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 25,
    ...
  }
}
```

### PUT /products/:id
Cập nhật sản phẩm (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "price": 26000000,
  "stock": 12
}
```

### DELETE /products/:id
Xóa sản phẩm (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

### GET /products/brands
Lấy danh sách tất cả hãng

**Response:**
```json
{
  "success": true,
  "data": ["Dell", "HP", "Lenovo", "ASUS", ...]
}
```

---

## 📂 Categories API

### GET /categories
Lấy tất cả danh mục

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Gaming Laptops",
      "description": "High-performance gaming laptops",
      "image": "/images/gaming.jpg"
    }
  ]
}
```

### GET /categories/:id
Lấy chi tiết danh mục

### POST /categories
Tạo danh mục (Admin only)

**Request Body:**
```json
{
  "name": "New Category",
  "description": "Description",
  "image": "/images/category.jpg"
}
```

### PUT /categories/:id
Cập nhật danh mục (Admin only)

### DELETE /categories/:id
Xóa danh mục (Admin only)

---

## 👤 Authentication API

### POST /auth/register
Đăng ký tài khoản mới

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "0912345678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "full_name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### POST /auth/login
Đăng nhập

**Request Body:**
```json
{
  "email": "admin@laptopstore.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@laptopstore.com",
      "role": "admin",
      "full_name": "Admin Store"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### GET /auth/profile
Lấy thông tin profile (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "phone": "0912345678",
    "address": "123 Main St",
    "city": "Hanoi"
  }
}
```

### PUT /auth/profile
Cập nhật profile (Protected)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "full_name": "John Smith",
  "phone": "0987654321",
  "address": "456 New St",
  "city": "HCM",
  "province": "HCM",
  "zip_code": "700000"
}
```

---

## 📦 Orders API

### GET /orders
Lấy danh sách đơn hàng (Protected)

**Query Parameters:**
- `status` (string) - Lọc theo trạng thái: pending, confirmed, shipped, delivered, cancelled
- `user_id` (number) - Lọc theo user (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_number": "ORD-1705312800000-abc123de",
      "user_id": 2,
      "total_amount": 85980000,
      "status": "pending",
      "payment_method": "cash",
      "shipping_address": "123 Customer St",
      "shipping_phone": "0987654321",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### GET /orders/:id
Lấy chi tiết đơn hàng (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_number": "ORD-1705312800000-abc123de",
    "total_amount": 85980000,
    "status": "pending",
    "items": [
      {
        "id": 1,
        "order_id": 1,
        "product_id": 1,
        "quantity": 2,
        "price": 42990000,
        "name": "Dell XPS 15",
        "image": "/images/dell-xps-15.jpg"
      }
    ]
  }
}
```

### POST /orders
Tạo đơn hàng mới (Protected)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ],
  "payment_method": "cash",
  "shipping_address": "123 Customer St",
  "shipping_phone": "0987654321",
  "notes": "Giao hàng buổi sáng"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "order_number": "ORD-1705312800000-abc123de",
    "total_amount": 85980000,
    "status": "pending",
    "items": [...]
  }
}
```

### PUT /orders/:id/status
Cập nhật trạng thái đơn (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending` - Chờ xác nhận
- `confirmed` - Đã xác nhận
- `shipped` - Đang giao
- `delivered` - Đã giao
- `cancelled` - Đã hủy

### GET /orders/admin/statistics
Lấy thống kê (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 42,
    "totalRevenue": 2500000000,
    "topProducts": [
      {
        "name": "Dell XPS 15",
        "total_sold": 15
      },
      {
        "name": "MacBook Pro 16",
        "total_sold": 12
      }
    ]
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🧪 Testing API

### Sử dụng cURL

```bash
# Danh sách sản phẩm
curl http://localhost:5000/api/products

# Tìm kiếm sản phẩm
curl "http://localhost:5000/api/products?search=Dell&brand=Dell"

# Đăng nhập
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@laptopstore.com","password":"password123"}'

# Tạo sản phẩm (với token)
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Sử dụng Postman
1. Import collection từ `docs/postman-collection.json`
2. Set environment variables
3. Chạy requests

### Sử dụng REST Client (VS Code)
Xem file `docs/requests.http`

---

## 📊 Data Models

### Product
```javascript
{
  id: number,
  name: string,
  category_id: number,
  brand: string,
  price: decimal,
  description: string,
  cpu: string,
  ram: string,
  storage: string,
  graphics: string,
  display: string,
  image: string,
  stock: number,
  created_at: datetime,
  updated_at: datetime
}
```

### User
```javascript
{
  id: number,
  username: string,
  email: string,
  password: string (hashed),
  full_name: string,
  phone: string,
  address: string,
  city: string,
  province: string,
  zip_code: string,
  role: 'customer' | 'admin',
  is_active: boolean,
  created_at: datetime,
  updated_at: datetime
}
```

### Order
```javascript
{
  id: number,
  user_id: number,
  order_number: string,
  total_amount: decimal,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  payment_method: string,
  shipping_address: string,
  shipping_phone: string,
  notes: string,
  created_at: datetime,
  updated_at: datetime,
  items: OrderItem[]
}
```

### OrderItem
```javascript
{
  id: number,
  order_id: number,
  product_id: number,
  quantity: number,
  price: decimal,
  created_at: datetime
}
```

---

## 🔗 Useful Links
- Backend Repository: `/backend`
- Frontend Repository: `/frontend`
- Database Schema: `/database/schema.sql`
- Sample Data: `/database/sample-data.sql`
