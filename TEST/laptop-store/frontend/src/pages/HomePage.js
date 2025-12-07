import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productService.getAll({});
      setFeaturedProducts(response.data.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4 leading-tight">Laptop Store Premium</h1>
          <p className="text-xl mb-8 text-blue-100 font-light">Công nghệ tiên tiến, giá tốt nhất, chất lượng đảm bảo</p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🛍️ Khám phá ngay
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 text-gray-800">⭐ Sản phẩm nổi bật</h2>
          <p className="text-gray-600 text-lg">Những laptop được yêu thích nhất từ các thương hiệu hàng đầu</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">⏳</div> Đang tải...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Xem toàn bộ sản phẩm →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2 text-gray-800">📁 Danh mục sản phẩm</h2>
            <p className="text-gray-600 text-lg">Chọn danh mục phù hợp với nhu cầu của bạn</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: 'Gaming Laptops', icon: '🎮', color: 'from-red-400 to-red-600' },
              { name: 'Business Laptops', icon: '💼', color: 'from-blue-400 to-blue-600' },
              { name: 'Ultrabooks', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
              { name: 'Workstations', icon: '🖥️', color: 'from-purple-400 to-purple-600' },
              { name: 'Budget Laptops', icon: '💰', color: 'from-green-400 to-green-600' }
            ].map(cat => (
              <div 
                key={cat.name} 
                className={`bg-gradient-to-br ${cat.color} p-8 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-white text-center cursor-pointer group`}
              >
                <p className="text-4xl mb-3 group-hover:scale-125 transition-transform">{cat.icon}</p>
                <p className="font-bold text-lg">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Không tìm được sản phẩm ưng ý?</h3>
          <p className="text-lg mb-6 text-indigo-100">Liên hệ với đội hỗ trợ của chúng tôi để nhận tư vấn</p>
          <button className="bg-white text-indigo-600 px-10 py-3 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all">
            📞 Liên hệ ngay
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
