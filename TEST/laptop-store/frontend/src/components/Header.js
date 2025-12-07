import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          💻 Laptop Store
        </Link>

        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
          <Link to="/products" className="hover:text-blue-600">Sản phẩm</Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-600">{user.full_name}</Link>
              <Link to="/orders" className="hover:text-blue-600">Đơn hàng</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-blue-600">Admin</Link>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
                className="text-red-600 hover:text-red-800"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Đăng nhập</Link>
              <Link to="/register" className="hover:text-blue-600">Đăng ký</Link>
            </>
          )}

          <Link to="/cart" className="relative">
            🛒 ({cartCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
