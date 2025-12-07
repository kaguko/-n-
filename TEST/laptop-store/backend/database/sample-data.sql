-- Thêm dữ liệu danh mục
INSERT INTO categories (name, description) VALUES
('Gaming Laptops', 'Laptop chuyên dụng cho chơi game'),
('Business Laptops', 'Laptop cho công việc văn phòng'),
('Ultrabooks', 'Laptop siêu mỏng nhẹ'),
('Workstations', 'Laptop cho đồ họa và thiết kế'),
('Budget Laptops', 'Laptop giá rẻ cho học sinh sinh viên');

-- Thêm dữ liệu người dùng (mật khẩu được hash: admin123 = $2a$10$XjltcJkDGXnQ7wmc/y6xKeCW.cgvVx4iuM/Lp8XwYfUQS8JWC/.ta)
INSERT INTO users (username, email, password, full_name, phone, address, city, province, zip_code, role) VALUES
('admin', 'admin@example.com', '$2a$10$XjltcJkDGXnQ7wmc/y6xKeCW.cgvVx4iuM/Lp8XwYfUQS8JWC/.ta', 'Admin Store', '0912345678', '123 Admin Street', 'Hanoi', 'Hanoi', '100000', 'admin'),
('customer1', 'customer1@gmail.com', '$2a$10$XjltcJkDGXnQ7wmc/y6xKeCW.cgvVx4iuM/Lp8XwYfUQS8JWC/.ta', 'Nguyen Van A', '0987654321', '456 Customer Street', 'HCM', 'HCM', '700000', 'customer'),
('customer2', 'customer2@gmail.com', '$2a$10$XjltcJkDGXnQ7wmc/y6xKeCW.cgvVx4iuM/Lp8XwYfUQS8JWC/.ta', 'Tran Thi B', '0988888888', '789 Customer Lane', 'Hanoi', 'Hanoi', '100001', 'customer');

-- Thêm dữ liệu sản phẩm (Dell)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('Dell XPS 15', 1, 'Dell', 42990000, 'Laptop gaming cao cấp với card đồ họa RTX 4070', 'Intel Core i7-13700H', '16GB DDR5', '1TB NVMe SSD', 'NVIDIA RTX 4070', '15.6 inch 4K OLED', '/images/dell-xps-15.jpg', 15),
('Dell Inspiron 15', 2, 'Dell', 15990000, 'Laptop văn phòng đa năng', 'Intel Core i5-1235U', '8GB DDR5', '512GB SSD', 'Intel Iris Xe', '15.6 inch FHD', '/images/dell-inspiron-15.jpg', 20),
('Dell G15', 1, 'Dell', 24990000, 'Laptop gaming tầm trung', 'Intel Core i7-12700H', '16GB DDR4', '512GB SSD', 'NVIDIA RTX 3060', '15.6 inch 165Hz', '/images/dell-g15.jpg', 12);

-- Thêm dữ liệu sản phẩm (HP)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('HP Pavilion 15', 2, 'HP', 14990000, 'Laptop đa năng cho gia đình', 'Intel Core i5-1235U', '8GB DDR4', '512GB SSD', 'Intel UHD Graphics', '15.6 inch FHD', '/images/hp-pavilion-15.jpg', 18),
('HP Envy x360', 3, 'HP', 28990000, 'Laptop 2-in-1 cao cấp', 'AMD Ryzen 7 5700U', '16GB DDR4', '512GB SSD', 'AMD Radeon Graphics', '13.3 inch FHD Touch', '/images/hp-envy-x360.jpg', 10),
('HP Omen 15', 1, 'HP', 32990000, 'Laptop gaming hiệu suất cao', 'Intel Core i7-13700H', '16GB DDR5', '1TB SSD', 'NVIDIA RTX 4080', '16 inch 240Hz', '/images/hp-omen-15.jpg', 8);

-- Thêm dữ liệu sản phẩm (Lenovo)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('Lenovo ThinkPad X1', 2, 'Lenovo', 25990000, 'Laptop doanh nhân cổ điển', 'Intel Core i7-1365U', '16GB LPDDR5', '512GB SSD', 'Intel Iris Xe', '14 inch FHD', '/images/lenovo-thinkpad-x1.jpg', 14),
('Lenovo Legion 5', 1, 'Lenovo', 26990000, 'Laptop gaming phổ thông', 'AMD Ryzen 7 6800H', '16GB DDR5', '512GB SSD', 'NVIDIA RTX 4060', '16 inch 165Hz', '/images/lenovo-legion-5.jpg', 11),
('Lenovo IdeaPad 3', 5, 'Lenovo', 9990000, 'Laptop giá rẻ cho học tập', 'Intel Celeron N5100', '4GB DDR4', '256GB SSD', 'Intel UHD Graphics', '15.6 inch HD', '/images/lenovo-ideapad-3.jpg', 25);

-- Thêm dữ liệu sản phẩm (Asus)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('ASUS ROG Zephyrus G14', 1, 'ASUS', 44990000, 'Laptop gaming siêu mỏng', 'Intel Core i9-13900H', '16GB DDR5', '1TB SSD', 'NVIDIA RTX 4090', '14 inch QHD+ 240Hz', '/images/asus-rog-zephyrus-g14.jpg', 6),
('ASUS VivoBook 15', 2, 'ASUS', 13990000, 'Laptop sinh viên bền bỉ', 'AMD Ryzen 5 5500U', '8GB DDR4', '512GB SSD', 'AMD Radeon Graphics', '15.6 inch FHD', '/images/asus-vivobook-15.jpg', 22),
('ASUS ProArt Studiobook', 4, 'ASUS', 54990000, 'Laptop thiết kế chuyên dụng', 'Intel Xeon W9-3595X', '32GB ECC DDR5', '2TB SSD', 'NVIDIA RTX 6000 Ada', '16 inch 4K OLED', '/images/asus-proart.jpg', 4);

-- Thêm dữ liệu sản phẩm (Acer)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('Acer Aspire 5', 2, 'Acer', 16990000, 'Laptop cân bằng cho tất cả', 'Intel Core i5-1235U', '8GB DDR4', '512GB SSD', 'Intel Iris Xe', '15.6 inch FHD', '/images/acer-aspire-5.jpg', 19),
('Acer Nitro 5', 1, 'Acer', 22990000, 'Laptop gaming giá tốt', 'Intel Core i7-12700H', '16GB DDR4', '512GB SSD', 'NVIDIA RTX 3070 Ti', '15.6 inch 165Hz', '/images/acer-nitro-5.jpg', 13),
('Acer Swift 5', 3, 'Acer', 20990000, 'Laptop siêu nhẹ cao cấp', 'AMD Ryzen 7 6800U', '16GB LPDDR5', '512GB SSD', 'AMD Radeon Graphics', '14 inch FHD', '/images/acer-swift-5.jpg', 9);

-- Thêm dữ liệu sản phẩm (Apple)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('MacBook Pro 16', 4, 'Apple', 72990000, 'Laptop chuyên nghiệp tối cao', 'Apple M2 Max', '32GB unified memory', '1TB SSD', 'Apple M2 Max GPU', '16 inch Liquid Retina XDR', '/images/macbook-pro-16.jpg', 7),
('MacBook Air M3', 3, 'Apple', 35990000, 'MacBook siêu mỏnh nhẹ', 'Apple M3', '8GB unified memory', '512GB SSD', 'Apple M3 GPU', '13.6 inch Liquid Retina', '/images/macbook-air-m3.jpg', 11),
('MacBook Pro 14', 4, 'Apple', 54990000, 'Laptop sáng tạo mạnh mẽ', 'Apple M3 Pro', '18GB unified memory', '512GB SSD', 'Apple M3 Pro GPU', '14 inch Liquid Retina Pro', '/images/macbook-pro-14.jpg', 8);

-- Thêm dữ liệu sản phẩm (MSI)
INSERT INTO products (name, category_id, brand, price, description, cpu, ram, storage, graphics, display, image, stock) VALUES
('MSI Raider GE78', 1, 'MSI', 46990000, 'Laptop gaming màn hình khủng', 'Intel Core i9-13980HX', '32GB DDR5', '2TB SSD', 'NVIDIA RTX 4090', '17.3 inch 4K 120Hz', '/images/msi-raider-ge78.jpg', 5),
('MSI Modern 15', 2, 'MSI', 17990000, 'Laptop văn phòng hiện đại', 'Intel Core i5-1235U', '8GB DDR4', '512GB SSD', 'Intel Iris Xe', '15.6 inch FHD', '/images/msi-modern-15.jpg', 21);
