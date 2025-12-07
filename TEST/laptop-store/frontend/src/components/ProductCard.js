import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200 hover:scale-105 transform flex flex-col h-full">
      {/* Image Container */}
      <div className="relative mb-0 bg-gradient-to-br from-gray-50 to-gray-100 h-56 rounded-t-xl flex items-center justify-center overflow-hidden flex-shrink-0">
        <span className="text-gray-400 group-hover:text-gray-500 transition-colors">Ảnh sản phẩm</span>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Hết hàng</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.brand}
        </div>
      </div>

      {/* Content Container - scrollable if needed */}
      <div className="p-4 flex flex-col flex-1 overflow-y-auto">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors flex-shrink-0">
          {product.name}
        </h3>

        {/* Specs */}
        <div className="text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg space-y-1 flex-shrink-0">
          <p className="mb-1"><span className="font-semibold">CPU:</span> {product.cpu}</p>
          <p className="mb-1"><span className="font-semibold">RAM:</span> {product.ram}</p>
          <p><span className="font-semibold">Storage:</span> {product.storage}</p>
        </div>

        {/* Price & Stock */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 flex-shrink-0">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            {(product.price / 1000000).toFixed(1)}M
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.stock > 0 ? `${product.stock} sp` : 'Hết'}
          </span>
        </div>

        {/* Spacer to push buttons down */}
        <div className="flex-grow"></div>

        {/* Buttons - always at bottom */}
        <div className="flex gap-2 flex-shrink-0">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-gray-100 text-center py-2.5 rounded-lg hover:bg-gray-200 font-semibold text-gray-700 transition-colors"
          >
            Chi tiết
          </Link>
          <button
            onClick={addToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 font-semibold disabled:from-gray-400 disabled:to-gray-400 transition-all duration-300 group-hover:shadow-lg disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Hết hàng' : '🛒 Thêm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
