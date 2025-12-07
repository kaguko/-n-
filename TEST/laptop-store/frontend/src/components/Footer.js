import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Dịch vụ</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Giao hàng</a></li>
              <li><a href="#" className="hover:text-white">Bảo hành</a></li>
              <li><a href="#" className="hover:text-white">Hỗ trợ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white">Chính sách</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@laptopstore.com</li>
              <li>Phone: 1900-xxxx</li>
              <li>Address: 123 Main St</li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 mb-8" />
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Laptop Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
