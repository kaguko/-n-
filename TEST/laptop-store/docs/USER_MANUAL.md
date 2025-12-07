# Hướng Dẫn Sử Dụng Laptop Store

## 👋 Giới Thiệu

Laptop Store là một trang web bán laptop trực tuyến đầy đủ chức năng. Hướng dẫn này sẽ giúp bạn hiểu cách sử dụng tất cả các tính năng của ứng dụng.

---

## 🏠 Trang Chủ

### 1. Banner
- Hiển thị thông tin chào mừng
- Nút "Mua sắm ngay" để truy cập danh sách sản phẩm

### 2. Sản Phẩm Nổi Bật
- Hiển thị 6 sản phẩm mới nhất
- Click "Chi tiết" để xem thông tin chi tiết
- Click "Thêm giỏ" để thêm vào giỏ hàng

### 3. Danh Mục
- Xem các danh mục sản phẩm chính
- 5 danh mục: Gaming, Business, Ultrabooks, Workstations, Budget

---

## 🛒 Danh Sách Sản Phẩm

### Tìm Kiếm & Lọc

**Bộ lọc bên trái:**

1. **Tìm kiếm**: Nhập tên sản phẩm
   ```
   Ví dụ: "Dell", "XPS", "15"
   ```

2. **Hãng**: Chọn từ danh sách
   ```
   - Dell
   - HP
   - Lenovo
   - ASUS
   - Acer
   - Apple
   - MSI
   ```

3. **Giá từ**: Nhập giá tối thiểu
   ```
   Ví dụ: 15000000 (15 triệu)
   ```

4. **Giá đến**: Nhập giá tối đa
   ```
   Ví dụ: 50000000 (50 triệu)
   ```

### Xem Sản Phẩm

**Mỗi sản phẩm hiển thị:**
- Ảnh sản phẩm
- Tên sản phẩm
- CPU, RAM, Storage (thông số chính)
- Giá (triệu VND)
- Tồn kho
- Nút "Chi tiết" và "Thêm giỏ"

---

## 📱 Chi Tiết Sản Phẩm

### Thông Tin Hiển Thị

1. **Tên & Hãng**
   - Tiêu đề lớn
   - Hãng sản xuất

2. **Giá**
   - Hiển thị lớn màu xanh
   - Đơn vị: Triệu VND

3. **Thông Số Kỹ Thuật** (Bảng chi tiết)
   - CPU (Bộ xử lý)
   - RAM (Bộ nhớ)
   - Storage (Ổ cứng)
   - Graphics (Card đồ họa)
   - Display (Màn hình)

4. **Kho Hàng**
   - Hiển thị số lượng tồn
   - Nếu = 0, nút "Thêm giỏ" bị disable

### Thêm Vào Giỏ

1. Chọn **số lượng** (1 đến số tồn kho)
2. Click **"Thêm vào giỏ hàng"**
3. Nhận thông báo xác nhận
4. Số lượng trong giỏ tăng lên ở header

---

## 🛍️ Giỏ Hàng

### Xem Giỏ Hàng

Click vào icon giỏ hàng ở header → Xem danh sách các sản phẩm đã thêm

### Quản Lý Giỏ Hàng

**Bảng Chi Tiết:**
| Cột | Chức Năng |
|-----|----------|
| Sản phẩm | Tên sản phẩm |
| Giá | Giá/chiếc |
| Số lượng | Input để thay đổi |
| Tổng | Tính tự động (giá × số lượng) |
| ✕ | Nút xóa |

### Thay Đổi Số Lượng

1. Nhấp vào ô số lượng
2. Thay đổi con số
3. Tổng tiền cập nhật tự động

### Xóa Sản Phẩm

Click vào nút **✕** ở cuối hàng để xóa khỏi giỏ

---

## 💳 Thanh Toán

### Bước 1: Điền Thông Tin

**Bên phải giỏ hàng - Form "Thông tin đơn hàng":**

1. **Địa chỉ giao hàng** (bắt buộc)
   ```
   Ví dụ: 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
   ```

2. **Số điện thoại** (bắt buộc)
   ```
   Ví dụ: 0912345678
   ```

3. **Phương thức thanh toán**
   - Tiền mặt
   - Chuyển khoản

4. **Ghi chú** (tùy chọn)
   ```
   Ví dụ: Giao hàng buổi sáng, tránh gọi chuông
   ```

### Bước 2: Đặt Hàng

1. Kiểm tra lại thông tin
2. Click **"Đặt hàng"**
3. Hệ thống xử lý (nút bị disable trong lúc xử lý)
4. Nhận thông báo thành công

### Bước 3: Xác Nhận

- Trang tự động chuyển đến chi tiết đơn hàng
- Hiển thị mã đơn hàng
- Giỏ hàng được làm sạch

**Lưu ý:** Bạn phải **đăng nhập** trước khi đặt hàng

---

## 👤 Tài Khoản

### 1. Đăng Ký

**URL:** `/register`

**Thông tin cần nhập:**
- Tên đăng nhập (tối thiểu 3 ký tự)
- Email (định dạng hợp lệ)
- Họ tên
- Số điện thoại (tùy chọn)
- Mật khẩu (tối thiểu 6 ký tự)
- Xác nhận mật khẩu

**Quá trình:**
1. Nhập đầy đủ thông tin
2. Click "Đăng ký"
3. Tài khoản được tạo
4. Tự động đăng nhập
5. Chuyển về trang chủ

### 2. Đăng Nhập

**URL:** `/login`

**Thông tin cần nhập:**
- Email
- Mật khẩu

**Quá trình:**
1. Nhập email và mật khẩu
2. Click "Đăng nhập"
3. Token được lưu
4. Chuyển về trang được yêu cầu hoặc trang chủ

**Demo Account:**
```
Email: admin@laptopstore.com
Password: (Cần setup trong database)
```

### 3. Hồ Sơ Cá Nhân

**URL:** `/profile` (sau khi đăng nhập)

**Thông tin có thể cập nhật:**
- Họ tên
- Số điện thoại
- Địa chỉ
- Thành phố
- Tỉnh/Thành phố
- Mã bưu điện

### 4. Đăng Xuất

Click **"Đăng xuất"** ở header

---

## 📦 Đơn Hàng

### Xem Danh Sách Đơn

**URL:** `/orders` (sau khi đăng nhập)

**Hiển thị:**
- Mã đơn hàng
- Ngày đặt
- Tổng tiền
- Trạng thái đơn

**Trạng thái:**
| Trạng thái | Ý Nghĩa |
|-----------|--------|
| Chờ xác nhận | Đơn vừa được tạo, chưa xác nhận |
| Đã xác nhận | Chủ shop đã xác nhận |
| Đang giao | Shipper đang vận chuyển |
| Đã giao | Nhận hàng thành công |
| Đã hủy | Đơn hàng bị hủy |

### Xem Chi Tiết Đơn

Click **"Xem chi tiết"** để xem:
- Mã đơn chi tiết
- Danh sách sản phẩm trong đơn
- Số lượng mỗi sản phẩm
- Giá mỗi sản phẩm
- Tổng tiền

---

## 👨‍💼 Quản Trị (Admin)

### Truy Cập Admin

**Điều kiện:**
- Phải đăng nhập bằng tài khoản admin
- URL: `/admin`

### 1. Quản Lý Sản Phẩm

**Tính năng:**
- Xem danh sách sản phẩm
- Thêm sản phẩm mới
- Cập nhật thông tin sản phẩm
- Xóa sản phẩm

**Thông tin cần điền:**
- Tên sản phẩm
- Danh mục
- Hãng
- Giá
- CPU, RAM, Storage, Graphics, Display
- Số lượng tồn kho

### 2. Quản Lý Đơn Hàng

**Tính năng:**
- Xem tất cả đơn hàng
- Cập nhật trạng thái đơn
- Xem chi tiết đơn hàng

**Trạng thái có thể cập nhật:**
- pending → confirmed
- confirmed → shipped
- shipped → delivered
- bất kỳ → cancelled

### 3. Quản Lý Người Dùng

**Tính năng:**
- Xem danh sách khách hàng
- Xem thông tin chi tiết
- Vô hiệu hóa tài khoản

### 4. Thống Kê

**Hiển thị:**
- Tổng số đơn hàng
- Tổng doanh thu
- Top 5 sản phẩm bán chạy nhất

---

## ⌨️ Phím Tắt & Mẹo

### Navigation
- **Header**: Click logo để về trang chủ
- **Back Button**: Nút "Quay lại" trên các trang

### Search
- Tìm kiếm thực hiện **real-time**
- Hỗ trợ tìm kiếm từng phần tên sản phẩm

### Giỏ Hàng
- Giỏ được lưu ở **localStorage** (lưu trên máy)
- Giỏ không bị xóa khi tắt trình duyệt
- Xóa cache để xóa giỏ

---

## 🆘 Khắc Phục Sự Cố

### Không thể đăng nhập
- Kiểm tra email có chính xác không
- Kiểm tra mật khẩu (phân biệt hoa/thường)
- Kiểm tra account có bị vô hiệu hóa không
- Thử đăng ký tài khoản mới

### Không thể thêm sản phẩm vào giỏ
- Kiểm tra sản phẩm còn hàng không
- Làm mới trang (F5)
- Xóa cache trình duyệt

### Không thể đặt hàng
- **Bắt buộc** phải đăng nhập
- Giỏ hàng không được rỗng
- Phải điền đủ địa chỉ và số điện thoại
- Kiểm tra kết nối internet

### Sản phẩm không hiển thị
- Kiểm tra kết nối internet
- Thử lọc khác hoặc tìm kiếm lại
- Làm mới trang

---

## 📞 Liên Hệ Hỗ Trợ

**Email:** support@laptopstore.com  
**Phone:** 1900-XXXX  
**Giờ làm việc:** 8:00 - 18:00 (T2 - T7)

---

## 📝 Ghi Chú

- Giá hiển thị là giá bán lẻ
- Không có giảm giá hoặc mã khuyến mãi hiện tại
- Giao hàng toàn quốc (sắp có chi phí giao)
- Hàng bán không hoàn lại

---

## ❓ FAQ

**Q: Làm sao để theo dõi đơn hàng?**
A: Vào menu "Đơn hàng" để xem trạng thái đơn

**Q: Có thể thay đổi địa chỉ giao sau khi đặt hàng?**
A: Liên hệ support để thay đổi (nếu chưa giao)

**Q: Mất mật khẩu thì sao?**
A: Hiện chưa có tính năng quên mật khẩu, liên hệ support

**Q: Hàng bảo hành bao lâu?**
A: Theo bảo hành của nhà sản xuất (thông thường 12 tháng)

**Q: Vì sao sản phẩm này không hiển thị?**
A: Có thể sản phẩm đã hết hàng hoặc bị xóa

---

**Cảm ơn bạn đã sử dụng Laptop Store! 🙏**
