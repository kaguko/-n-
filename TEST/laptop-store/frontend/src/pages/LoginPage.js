import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const response = await authService.login(formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        alert('Đăng nhập thành công!');
        
        // Redirect to admin if user is admin
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center mt-4">
          Chưa có tài khoản?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            Đăng ký
          </button>
        </p>

        {/* Test credentials */}
        <div className="mt-6 p-4 bg-yellow-50 rounded text-sm text-gray-700">
          <p className="font-semibold mb-2">Demo Account:</p>
          <p>Email: admin@example.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
