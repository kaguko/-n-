import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category_id: '',
    cpu: '',
    ram: '',
    storage: '',
    screen_size: '',
    battery_life: '',
    stock: '',
    image: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
    fetchCategories();
    fetchProduct();
  }, [navigate, id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      setError('Lỗi khi tải danh mục');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      if (data.data) {
        setFormData(data.data);
      } else {
        setError('Không tìm thấy sản phẩm');
      }
    } catch (error) {
      setError('Lỗi khi tải sản phẩm');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Cập nhật sản phẩm thành công!');
        navigate('/admin');
      } else {
        setError('Có lỗi khi cập nhật sản phẩm');
      }
    } catch (error) {
      setError('Có lỗi khi cập nhật sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Sửa sản phẩm</h1>
        
        {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Giá</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Danh mục</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Chọn danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL Hình ảnh</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="https://example.com/image.jpg hoặc /images/laptop.jpg"
            />
            {formData.image && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Xem trước:</p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="max-w-xs h-auto rounded border border-gray-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <p 
                  style={{display: 'none'}} 
                  className="text-red-600 text-xs"
                >
                  Không thể tải hình ảnh
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nhãn hiệu</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nhập nhãn hiệu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CPU</label>
              <input
                type="text"
                name="cpu"
                value={formData.cpu}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="VD: Intel i7-13700K"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">RAM (GB)</label>
              <input
                type="text"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="VD: 16GB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lưu trữ</label>
              <input
                type="text"
                name="storage"
                value={formData.storage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="VD: 512GB SSD"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kích thước màn hình</label>
              <input
                type="text"
                name="screen_size"
                value={formData.screen_size}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="VD: 13.3 inch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Thời lượng pin</label>
              <input
                type="text"
                name="battery_life"
                value={formData.battery_life}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="VD: 10 giờ"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Số lượng trong kho</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="0"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex-1 bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProductForm;
