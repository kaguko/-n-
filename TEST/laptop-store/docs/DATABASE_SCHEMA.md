# Database Schema - Laptop Store

## 📋 Tổng Quan

Database sử dụng **SQLite3** với 8 bảng chính để lưu trữ dữ liệu liên quan đến sản phẩm, người dùng, đơn hàng, và đánh giá.

---

## 📊 Sơ Đồ ER (Entity Relationship)

```
┌─────────────┐
│ Categories  │
└─────────────┘
      ▲
      │ 1:N
      │
┌─────────────────┐
│    Products     │
└─────────────────┘
      ▲
      │ N:N
      │
┌─────────────────┐      ┌──────────┐
│  Order Items    │◄─────│  Orders  │
└─────────────────┘      └──────────┘
      ▲                        ▲
      │ N:1                    │ 1:N
      │                        │
      │                   ┌─────────┐
      │                   │  Users   │
      │                   └─────────┘
      │                        ▲
      └────────────────────────┤ 1:N
                               │
                          ┌────────────┐
                          │  Reviews   │
                          └────────────┘
                          
     ┌──────────────┐
     │ Cart Items   │
     └──────────────┘
            ▲
            │ N:1
            │
        ┌───────┐
        │ Users │
        └───────┘
```

---

## 🗂️ Chi Tiết Các Bảng

### 1️⃣ Categories (Danh Mục)

```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| name | TEXT | NOT NULL, UNIQUE | Tên danh mục |
| description | TEXT | NULL | Mô tả |
| image | TEXT | NULL | URL ảnh |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |
| updated_at | DATETIME | DEFAULT NOW | Ngày cập nhật |

**Ví dụ Dữ Liệu:**
```
1, Gaming Laptops, Laptop chuyên dụng cho chơi game
2, Business Laptops, Laptop cho công việc văn phòng
3, Ultrabooks, Laptop siêu mỏng nhẹ
```

---

### 2️⃣ Users (Người Dùng)

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    province TEXT,
    zip_code TEXT,
    role TEXT DEFAULT 'customer' CHECK(role IN ('customer', 'admin')),
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| username | TEXT | NOT NULL, UNIQUE | Tên đăng nhập |
| email | TEXT | NOT NULL, UNIQUE | Email duy nhất |
| password | TEXT | NOT NULL | Mật khẩu (hashed) |
| full_name | TEXT | NULL | Họ tên |
| phone | TEXT | NULL | Số điện thoại |
| address | TEXT | NULL | Địa chỉ |
| city | TEXT | NULL | Thành phố |
| province | TEXT | NULL | Tỉnh |
| zip_code | TEXT | NULL | Mã bưu điện |
| role | TEXT | DEFAULT 'customer' | Vai trò: customer, admin |
| is_active | BOOLEAN | DEFAULT 1 | Trạng thái tài khoản |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |
| updated_at | DATETIME | DEFAULT NOW | Ngày cập nhật |

**Ví dụ Dữ Liệu:**
```
1, admin, admin@laptopstore.com, $2b$10$..., Admin Store, admin
2, customer1, customer1@gmail.com, $2b$10$..., Nguyen Van A, customer
```

---

### 3️⃣ Products (Sản Phẩm)

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    brand TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    specifications TEXT,
    image TEXT,
    stock INTEGER DEFAULT 0,
    cpu TEXT,
    ram TEXT,
    storage TEXT,
    graphics TEXT,
    display TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| name | TEXT | NOT NULL | Tên sản phẩm |
| category_id | INTEGER | NOT NULL, FK | ID danh mục |
| brand | TEXT | NOT NULL | Hãng sản xuất |
| price | DECIMAL | NOT NULL | Giá (VND) |
| description | TEXT | NULL | Mô tả chi tiết |
| cpu | TEXT | NULL | Bộ xử lý |
| ram | TEXT | NULL | Bộ nhớ RAM |
| storage | TEXT | NULL | Ổ cứng |
| graphics | TEXT | NULL | Card đồ họa |
| display | TEXT | NULL | Màn hình |
| image | TEXT | NULL | URL ảnh |
| stock | INTEGER | DEFAULT 0 | Số lượng tồn kho |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |
| updated_at | DATETIME | DEFAULT NOW | Ngày cập nhật |

**Index:**
```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
```

**Ví dụ Dữ Liệu:**
```
1, Dell XPS 15, 1, Dell, 42990000, ..., Intel Core i7-13700H, 16GB DDR5, ...
2, MacBook Air M3, 3, Apple, 35990000, ..., Apple M3, 8GB, ...
```

---

### 4️⃣ Orders (Đơn Hàng)

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_number TEXT NOT NULL UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    payment_method TEXT,
    shipping_address TEXT,
    shipping_phone TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| user_id | INTEGER | NOT NULL, FK | ID người dùng |
| order_number | TEXT | NOT NULL, UNIQUE | Mã đơn hàng |
| total_amount | DECIMAL | NOT NULL | Tổng tiền |
| status | TEXT | DEFAULT 'pending' | Trạng thái đơn |
| payment_method | TEXT | NULL | Phương thức thanh toán |
| shipping_address | TEXT | NULL | Địa chỉ giao hàng |
| shipping_phone | TEXT | NULL | Số điện thoại giao hàng |
| notes | TEXT | NULL | Ghi chú |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |
| updated_at | DATETIME | DEFAULT NOW | Ngày cập nhật |

**Trạng Thái Hợp Lệ:**
- `pending` - Chờ xác nhận
- `confirmed` - Đã xác nhận
- `shipped` - Đang giao
- `delivered` - Đã giao
- `cancelled` - Đã hủy

**Index:**
```sql
CREATE INDEX idx_orders_user ON orders(user_id);
```

---

### 5️⃣ Order Items (Chi Tiết Đơn Hàng)

```sql
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| order_id | INTEGER | NOT NULL, FK | ID đơn hàng |
| product_id | INTEGER | NOT NULL, FK | ID sản phẩm |
| quantity | INTEGER | NOT NULL | Số lượng |
| price | DECIMAL | NOT NULL | Giá lúc mua |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |

**Index:**
```sql
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

---

### 6️⃣ Reviews (Đánh Giá)

```sql
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| product_id | INTEGER | NOT NULL, FK | ID sản phẩm |
| user_id | INTEGER | NOT NULL, FK | ID người dùng |
| rating | INTEGER | 1-5 | Điểm đánh giá (1-5) |
| title | TEXT | NULL | Tiêu đề |
| comment | TEXT | NULL | Bình luận |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |
| updated_at | DATETIME | DEFAULT NOW | Ngày cập nhật |

**Index:**
```sql
CREATE INDEX idx_reviews_product ON reviews(product_id);
```

---

### 7️⃣ Cart Items (Giỏ Hàng)

```sql
CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE(user_id, product_id)
);
```

**Cột:**
| Cột | Type | Ràng buộc | Mô tả |
|-----|------|----------|-------|
| id | INTEGER | PRIMARY KEY | ID duy nhất |
| user_id | INTEGER | NOT NULL, FK | ID người dùng |
| product_id | INTEGER | NOT NULL, FK | ID sản phẩm |
| quantity | INTEGER | DEFAULT 1 | Số lượng |
| created_at | DATETIME | DEFAULT NOW | Ngày tạo |
| updated_at | DATETIME | DEFAULT NOW | Ngày cập nhật |

**Ràng Buộc:**
- Mỗi sản phẩm chỉ xuất hiện 1 lần trong giỏ của mỗi user

**Index:**
```sql
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
```

---

## 🔑 Constraints & Rules

### Foreign Keys
```sql
PRAGMA foreign_keys = ON;
```

### Triggers (Optional)
```sql
-- Tự động cập nhật updated_at
CREATE TRIGGER update_products_timestamp 
AFTER UPDATE ON products
BEGIN
  UPDATE products SET updated_at = CURRENT_TIMESTAMP 
  WHERE id = NEW.id;
END;
```

---

## 📈 Truy Vấn Phổ Biến

### Lấy sản phẩm với danh mục
```sql
SELECT p.*, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC;
```

### Lấy đơn hàng với chi tiết
```sql
SELECT o.*, 
       SUM(oi.quantity * oi.price) as total
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = ?
GROUP BY o.id
ORDER BY o.created_at DESC;
```

### Top products bán chạy
```sql
SELECT p.name, SUM(oi.quantity) as total_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY oi.product_id
ORDER BY total_sold DESC
LIMIT 10;
```

### Tính tổng doanh thu
```sql
SELECT SUM(total_amount) as total_revenue
FROM orders
WHERE status IN ('confirmed', 'shipped', 'delivered');
```

---

## 💾 Backup & Recovery

### Export Database
```bash
sqlite3 database/laptop-store.db .dump > backup.sql
```

### Import Database
```bash
sqlite3 database/laptop-store.db < backup.sql
```

### Reset Database
```bash
rm database/laptop-store.db
npm run init-db
```

---

## 🔐 Bảo Mật

### Password Storage
- Mật khẩu được hash bằng bcrypt (10 rounds)
- Không bao giờ lưu mật khẩu plain text

### Sensitive Data
- JWT tokens được lưu ở client (localStorage)
- Tokens có TTL (time-to-live)
- CORS được cấu hình chặt chẽ

---

## 📊 Dữ Liệu Mẫu

Database đi kèm với ~25 sản phẩm mẫu:
- **Dell**: 3 products
- **HP**: 3 products
- **Lenovo**: 3 products
- **ASUS**: 3 products
- **Acer**: 3 products
- **Apple**: 3 products
- **MSI**: 2 products

Và 3 tài khoản mẫu:
- Admin: admin@laptopstore.com
- Customer 1: customer1@gmail.com
- Customer 2: customer2@gmail.com

---

## 🚀 Tối Ưu Hóa

### Indices đã tạo:
```
- idx_products_category
- idx_products_brand
- idx_orders_user
- idx_order_items_order
- idx_reviews_product
- idx_cart_items_user
```

### Recommendations:
1. Thêm full-text search cho sản phẩm (nếu dùng MySQL)
2. Caching database queries
3. Pagination cho danh sách sản phẩm
4. Soft delete cho sản phẩm (thêm deleted_at)

---

## 📝 Versioning

**Database Version: 1.0**
- Created: 2024-01-15
- Last Updated: 2024-01-15

---

## 🔗 Tài Liệu Liên Quan

- [INSTALLATION.md](INSTALLATION.md) - Cài đặt
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints
- [schema.sql](../database/schema.sql) - SQL schema
- [sample-data.sql](../database/sample-data.sql) - Sample data
