# Advanced Features & Next Steps

Hướng dẫn phát triển các tính năng nâng cao cho Laptop Store.

## Phase 2: Tính năng mở rộng

### 1. Product Reviews & Ratings ⭐

#### Backend Changes

**Model: `models/Review.js`**
```javascript
class Review {
  static async create(data) {
    return db.run(
      `INSERT INTO reviews (product_id, user_id, rating, comment) 
       VALUES (?, ?, ?, ?)`,
      [data.product_id, data.user_id, data.rating, data.comment]
    );
  }

  static async getByProduct(productId) {
    return db.all(
      `SELECT r.*, u.name FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = ? 
       ORDER BY r.created_at DESC`,
      [productId]
    );
  }

  static async getAverageRating(productId) {
    const result = await db.get(
      `SELECT AVG(rating) as avg FROM reviews WHERE product_id = ?`,
      [productId]
    );
    return result.avg || 0;
  }
}
```

**Routes: `routes/reviews.js`**
```javascript
router.get('/products/:id/reviews', ReviewController.getReviews);
router.post('/', authMiddleware, ReviewController.createReview);
router.delete('/:id', authMiddleware, ReviewController.deleteReview);
```

#### Frontend Changes

**Component: `components/ReviewList.js`**
```javascript
// Hiển thị danh sách review
// Form để thêm review mới
```

---

### 2. Advanced Search & Filters 🔍

#### Backend

**Route Filter:**
```javascript
GET /api/products?
  category=gaming&
  brand=Dell,HP&
  min_price=500&
  max_price=2000&
  cpu=Intel&
  ram_min=16&
  sort=price&
  order=asc
```

**SQL Query Optimization:**
```sql
-- Index cho nhanh hơn
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_category_brand ON products(category_id, brand);
CREATE INDEX idx_products_specs ON products(cpu, ram, storage);
```

#### Frontend Filter UI

**Page: `pages/ProductsPage.js` enhancement**
```javascript
// Advanced filter sidebar
// Price range slider
// Multi-select brands
// Specification filters
// Real-time preview
```

---

### 3. Shopping Cart Enhancements 🛒

#### Features

1. **Persistent Cart**
   - Lưu vào localStorage (✅ đã có)
   - Lưu vào database (Backend)
   - Sync khi user login

2. **Cart Management**
   - Hàng đợi chờ (Wishlist)
   - Giá so sánh
   - Gợi ý sản phẩm tương tự

#### Backend Route
```javascript
router.get('/:userId/cart', getCart);
router.post('/:userId/cart', addToCart);
router.put('/:userId/cart/:productId', updateCartItem);
router.delete('/:userId/cart/:productId', removeFromCart);
router.post('/:userId/cart/clear', clearCart);
```

---

### 4. Payment Integration 💳

#### Supported Gateways

**Option 1: VNPay (Việt Nam)**
```javascript
// src/services/paymentService.js
class VNPayService {
  createPaymentUrl(order) {
    // VNPay API integration
  }
  
  verifyCallback(data) {
    // Verify payment response
  }
}
```

**Option 2: Stripe**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const intent = await stripe.paymentIntents.create({ amount });
  res.json({ clientSecret: intent.client_secret });
});
```

**Option 3: MoMo (Mobile Money)**
```javascript
class MomoService {
  async createPayment(orderId, amount) {
    // MoMo API integration
  }
}
```

#### Payment Flow

```
Order Created
    ↓
User selects payment method
    ↓
Redirect to payment gateway
    ↓
User completes payment
    ↓
Webhook receives confirmation
    ↓
Order status updated to "paid"
    ↓
Send confirmation email
    ↓
Order shipped
```

---

### 5. Email Notifications 📧

#### Setup

```bash
npm install nodemailer
```

#### Service: `services/emailService.js`

```javascript
class EmailService {
  async sendOrderConfirmation(order) {
    // Send to customer
  }
  
  async sendShippingNotification(order) {
    // Send tracking info
  }
  
  async sendReviewReminder(order) {
    // Send after delivery
  }
}
```

#### Email Templates

- Order Confirmation
- Payment Received
- Shipping Update
- Delivery Notification
- Review Request
- Password Reset

---

### 6. Admin Dashboard Enhancements 👨‍💼

#### New Pages

**`pages/AdminAnalytics.js`**
- Sales trends
- Popular products
- Customer demographics
- Revenue charts
- Conversion rates

**`pages/AdminInventory.js`**
- Stock management
- Low stock alerts
- Re-order notifications
- Product status

**`pages/AdminCustomers.js`**
- Customer list
- Purchase history
- Communication
- Retention metrics

#### Real-time Dashboard

```javascript
// WebSocket connection
const ws = new WebSocket('ws://localhost:5000');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update dashboard in real-time
};
```

---

### 7. Inventory Management 📦

#### Database Schema Addition

```sql
ALTER TABLE products ADD COLUMN stock_quantity INT DEFAULT 0;
ALTER TABLE products ADD COLUMN reserved_quantity INT DEFAULT 0;
ALTER TABLE products ADD COLUMN reorder_point INT DEFAULT 10;

CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  transaction_type ENUM('add', 'remove', 'sold'),
  quantity INT,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### Stock Management

```javascript
class InventoryController {
  async updateStock(productId, quantity) {
    // Deduct from stock when order placed
  }
  
  async restoreStock(orderId) {
    // Restore if order cancelled
  }
  
  async checkAvailability(productId, quantity) {
    // Check if can fulfill
  }
}
```

---

### 8. Product Comparison 🔄

#### Feature

```javascript
// src/pages/ComparisonPage.js
// Side-by-side product comparison
// Highlight differences
// Add to cart from comparison
```

#### Route

```javascript
GET /api/products/compare?ids=1,2,3,4
```

---

### 9. Wishlist / Favorites ❤️

#### Database

```sql
CREATE TABLE wishlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### API

```javascript
router.get('/:userId/wishlist', getWishlist);
router.post('/:userId/wishlist/:productId', addToWishlist);
router.delete('/:userId/wishlist/:productId', removeFromWishlist);
```

---

### 10. Promotions & Coupons 🎉

#### Database Schema

```sql
CREATE TABLE promotions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE,
  discount_type ENUM('percentage', 'fixed'),
  discount_value DECIMAL(10,2),
  min_purchase DECIMAL(10,2),
  expiry_date DATE,
  usage_limit INT,
  usage_count INT DEFAULT 0
);
```

#### Coupon Validation

```javascript
class CouponService {
  async validateCoupon(code, totalAmount) {
    const coupon = await getCoupon(code);
    
    if (!coupon) throw new Error('Invalid coupon');
    if (new Date(coupon.expiry_date) < new Date()) throw new Error('Expired');
    if (coupon.usage_count >= coupon.usage_limit) throw new Error('Limit reached');
    if (totalAmount < coupon.min_purchase) throw new Error('Min purchase not met');
    
    return coupon;
  }
  
  calculateDiscount(coupon, amount) {
    if (coupon.discount_type === 'percentage') {
      return (amount * coupon.discount_value) / 100;
    }
    return coupon.discount_value;
  }
}
```

---

## Phase 3: Performance & Security

### Performance Optimization

1. **Database Optimization**
   - Add missing indexes
   - Query optimization
   - Caching with Redis

2. **Frontend Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Service Worker (PWA)

3. **Backend Optimization**
   - API response caching
   - Pagination
   - Compression (gzip)
   - CDN for static files

### Security Enhancements

1. **Authentication**
   - 2-Factor Authentication
   - OAuth (Google, Facebook)
   - Social login

2. **Data Protection**
   - HTTPS only
   - CORS hardening
   - Rate limiting
   - Input validation

3. **Payment Security**
   - PCI DSS compliance
   - Encrypted payment data
   - 3D Secure

---

## Phase 4: Deployment

### Docker Containerization

**Dockerfile (Backend)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**docker-compose.yml**
```yaml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=sqlite:/app/database.db
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

### Cloud Deployment

1. **Heroku**
   ```bash
   git push heroku main
   ```

2. **AWS**
   - EC2 for backend
   - S3 for static files
   - RDS for database

3. **DigitalOcean**
   - App Platform
   - Managed Database
   - App Spec

---

## Implementation Priority

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 1 | Reviews & Ratings | Medium | High |
| 2 | Payment Integration | High | Critical |
| 3 | Email Notifications | Low | Medium |
| 4 | Wishlist | Low | Medium |
| 5 | Search Filters | Medium | High |
| 6 | Admin Analytics | High | Medium |
| 7 | Inventory Management | Medium | High |
| 8 | Coupons & Promotions | Medium | High |
| 9 | Product Comparison | Low | Low |
| 10 | Deployment | High | Critical |

---

## Development Roadmap

**Week 1-2**: Payment Integration + Email
**Week 3**: Reviews & Ratings + Wishlist
**Week 4**: Search Filters + Inventory
**Week 5**: Admin Analytics + Coupons
**Week 6**: Security & Performance
**Week 7-8**: Deployment & Testing

---

## Resources

- [Node.js Best Practices](https://nodejs.org/en/)
- [React Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Database Design](https://www.postgresql.org/docs/)
- [Security Checklist](https://owasp.org/www-project-top-ten/)

## Next Step

Bắt đầu từ việc thêm Reviews & Ratings, sau đó là Payment Integration.
