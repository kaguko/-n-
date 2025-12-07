import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    min_price: '',
    max_price: '',
    search: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll(filters);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await productService.getBrands();
      setBrands(response.data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🛍️ Cửa hàng sản phẩm</h1>
          <p className="text-blue-100 mt-2">Tìm kiếm laptop hoàn hảo cho bạn</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-800">🔍 Bộ lọc</h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Tìm kiếm</label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Nhập tên sản phẩm..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Hãng sản xuất</label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả hãng</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Giá từ (triệu)</label>
                <input
                  type="number"
                  name="min_price"
                  value={filters.min_price}
                  onChange={handleFilterChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Giá đến (triệu)</label>
                <input
                  type="number"
                  name="max_price"
                  value={filters.max_price}
                  onChange={handleFilterChange}
                  placeholder="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button 
                onClick={() => setFilters({ brand: '', min_price: '', max_price: '', search: '' })}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block text-4xl mb-4">⏳</div>
                <p className="text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center border border-gray-200">
                <p className="text-2xl mb-2">❌</p>
                <p className="text-gray-600 text-lg">Không tìm thấy sản phẩm phù hợp</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6 font-semibold">Tìm thấy <span className="text-blue-600">{products.length}</span> sản phẩm</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
