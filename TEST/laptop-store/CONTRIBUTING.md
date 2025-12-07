# Hướng Dẫn Phát Triển (Contributing)

## 🎯 Quy Trình Phát Triển

### 1. Chuẩn Bị Trước Khi Phát Triển

```bash
# Clone repository
git clone <repository-url>
cd laptop-store

# Cài đặt dependencies
cd backend && npm install
cd ../frontend && npm install
```

### 2. Tạo Branch Cho Tính Năng

```bash
# Tạo branch mới từ main
git checkout -b feature/tên-tính-năng

# Ví dụ:
git checkout -b feature/add-product-reviews
git checkout -b fix/cart-calculation-bug
git checkout -b docs/update-api-documentation
```

### 3. Naming Convention Cho Branch

```
feature/tên-tính-năng      # Tính năng mới
fix/tên-bug                # Fix bug
refactor/tên-refactor      # Refactor code
docs/tên-tài-liệu          # Cập nhật tài liệu
test/tên-test              # Thêm test
```

### 4. Commit Message Format

```bash
git commit -m "type: subject"

# Types:
feat:     - Thêm tính năng mới
fix:      - Fix bug
docs:     - Cập nhật tài liệu
style:    - Format code, không thay đổi logic
refactor: - Refactor code
test:     - Thêm hoặc cập nhật test
chore:    - Cập nhật dependencies, build scripts

# Examples:
git commit -m "feat: add product filtering by price"
git commit -m "fix: resolve cart total calculation"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
git commit -m "refactor: improve product service"
git commit -m "test: add product controller tests"
```

### 5. Push và Pull Request

```bash
# Push branch lên remote
git push origin feature/tên-tính-năng

# Tạo Pull Request trên GitHub
# - Mô tả chi tiết thay đổi
# - Link issues liên quan
# - Screenshot (nếu UI changes)
```

---

## 📝 Code Style Guide

### JavaScript/React

#### Indentation & Formatting
```javascript
// ✓ Good
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✗ Bad
function calculateTotal(items){
return items.reduce((sum,item)=>sum+item.price,0);
}
```

#### Naming Convention
```javascript
// ✓ Good - camelCase cho variables/functions
const userData = {};
const getUserById = (id) => {};
const MAX_RETRIES = 3;

// ✗ Bad
const user_data = {};
const get_user_by_id = (id) => {};
const max_retries = 3;
```

#### Comments
```javascript
// ✓ Good - Clear và concise
// Calculate total price including tax
const totalWithTax = price * (1 + TAX_RATE);

// ✗ Bad - Không cần thiết
// Set x to 5
const x = 5;
```

#### ES6+ Features
```javascript
// ✓ Good - Use arrow functions, destructuring
const handleClick = () => {
  const { id, name } = product;
  return doSomething(id, name);
};

// ✓ Good - Use template literals
const message = `Hello ${user.name}!`;

// ✓ Good - Use async/await
async function fetchData() {
  const data = await api.get('/products');
  return data;
}
```

### React Components

```javascript
// ✓ Good - Functional component with hooks
function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAdd(product.id, quantity);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

// ✗ Avoid - Class components khi không cần thiết
class ProductCard extends React.Component {
  // ...
}
```

### CSS/Tailwind

```html
<!-- ✓ Good - Organize classes logically -->
<div className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900">Product Name</h3>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Add
  </button>
</div>

<!-- ✗ Avoid - Unorganized or conflicting classes -->
<div className="p-4 flex items-center shadow-md shadow-lg rounded-lg p-5">
  ...
</div>
```

---

## 🧪 Testing

### Unit Tests (Backend)

```javascript
// models/Product.test.js
const Product = require('../models/Product');

describe('Product Model', () => {
  describe('findAll', () => {
    test('should return all products', async () => {
      const products = await Product.findAll();
      expect(Array.isArray(products)).toBe(true);
    });

    test('should filter by brand', async () => {
      const products = await Product.findAll({ brand: 'Dell' });
      expect(products.every(p => p.brand === 'Dell')).toBe(true);
    });
  });
});
```

### React Tests

```javascript
// ProductCard.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  test('renders product name', () => {
    const product = { id: 1, name: 'Test Laptop', price: 1000 };
    render(<ProductCard product={product} onAdd={() => {}} />);
    expect(screen.getByText('Test Laptop')).toBeInTheDocument();
  });

  test('calls onAdd when button clicked', () => {
    const onAdd = jest.fn();
    const product = { id: 1, name: 'Test', price: 1000 };
    render(<ProductCard product={product} onAdd={onAdd} />);
    
    fireEvent.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalled();
  });
});
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 🔍 Code Review Checklist

Trước khi submit PR, hãy kiểm tra:

- [ ] Code tuân theo style guide
- [ ] Không có `console.log` hoặc debug code
- [ ] Không có conflicting code
- [ ] Tests pass (nếu có)
- [ ] Tài liệu được cập nhật
- [ ] Commit messages rõ ràng
- [ ] Không có duplicated code
- [ ] Performance được xem xét
- [ ] Security được xem xét
- [ ] Error handling được implement

---

## 📚 File Structure

### Backend
```
backend/
├── controllers/     # Route handlers
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── tests/           # Unit tests
├── server.js        # Main entry
├── package.json
└── .env.example
```

### Frontend
```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── styles/      # Global styles
│   ├── utils/       # Utility functions
│   ├── App.js       # Main component
│   └── index.js     # Entry point
└── package.json
```

---

## 🐛 Bug Report Template

```markdown
## Description
[Mô tả bug rõ ràng]

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
[Hành động mong đợi]

## Actual Behavior
[Hành động thực tế]

## Screenshots
[Nếu liên quan đến UI]

## Environment
- Browser: [Chrome, Firefox, ...]
- OS: [Windows, macOS, ...]
- Node version: [14.x, 16.x, ...]
```

---

## ✨ Feature Request Template

```markdown
## Feature Description
[Mô tả tính năng muốn thêm]

## Use Case
[Trường hợp sử dụng]

## Proposed Solution
[Giải pháp đề xuất]

## Additional Context
[Thêm thông tin nếu cần]
```

---

## 🚀 Deployment

### Staging
```bash
# Build frontend
cd frontend
npm run build

# Test backend
cd ../backend
npm test

# Deploy to staging environment
```

### Production
```bash
# Ensure all tests pass
npm test

# Build production
npm run build

# Deploy with proper environment variables
# Use CI/CD pipeline (GitHub Actions, Jenkins, etc.)
```

---

## 📞 Hỗ Trợ

Nếu cần hỗ trợ:
1. Kiểm tra [Issues](../../issues) hiện tại
2. Tạo issue mới nếu cần
3. Liên hệ team lead

---

## 📋 Development Checklist

Để chuẩn bị cho PR:

- [ ] Tất cả tests pass
- [ ] Code được format với Prettier
- [ ] Tài liệu được cập nhật
- [ ] Không có breaking changes (hoặc đã thảo luận)
- [ ] Performance được test
- [ ] Security issues được review
- [ ] Commit history sạch sẽ

---

**Cảm ơn đã contribute vào dự án! 🙏**
