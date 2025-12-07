import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
    navigate('/cart');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-2xl">⏳ Đang tải...</div></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center"><div className="text-2xl">❌ Sản phẩm không tìm thấy</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/products')}
          className="mb-8 text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition"
        >
          ← Quay lại cửa hàng
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-96 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-gray-500 text-lg">📷 Ảnh sản phẩm</span>
          </div>

          {/* Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-4 inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
              {product.brand}
            </div>

            <h1 className="text-4xl font-bold mb-6 text-gray-800">{product.name}</h1>

            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {(product.price / 1000000).toFixed(1)}M ₫
              </div>
              <p className="text-gray-500 mt-2">Giá bán trên toàn quốc</p>
            </div>

            {/* Specs Table */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📋 Thông số kỹ thuật</h3>
              <div className="space-y-3">
                <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="font-semibold text-gray-700">CPU:</span>
                  <span className="text-gray-800">{product.cpu}</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="font-semibold text-gray-700">RAM:</span>
                  <span className="text-gray-800">{product.ram}</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="font-semibold text-gray-700">Storage:</span>
                  <span className="text-gray-800">{product.storage}</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="font-semibold text-gray-700">Graphics:</span>
                  <span className="text-gray-800">{product.graphics}</span>
                </div>
                <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
                  <span className="font-semibold text-gray-700">Display:</span>
                  <span className="text-gray-800">{product.display}</span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8 p-4 rounded-lg" style={{backgroundColor: product.stock > 0 ? '#dcfce7' : '#fee2e2'}}>
              <p className="font-bold" style={{color: product.stock > 0 ? '#166534' : '#991b1b'}}>
                {product.stock > 0 ? `✅ Còn ${product.stock} sản phẩm` : '❌ Hết hàng'}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Số lượng:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 font-bold transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center font-bold py-2 border-0 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed text-lg"
              >
                {product.stock === 0 ? '❌ Hết hàng' : '🛒 Thêm vào giỏ'}
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">📝 Mô tả</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
