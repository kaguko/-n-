import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải ít nhất 3 ký tự';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.full_name || formData.full_name.length < 2) {
      newErrors.full_name = 'Họ tên phải ít nhất 2 ký tự';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải ít nhất 6 ký tự';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      console.log('📤 Sending register request:', {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name
      });

      const response = await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone
      });

      console.log('✅ Register response:', response.data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        setSuccess('✅ Đăng ký thành công! Chuyển hướng...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrors({
          submit: response.data.message || 'Đăng ký thất bại'
        });
      }
    } catch (err) {
      console.error('❌ Register error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });

      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg ||
                          'Đăng ký thất bại. Vui lòng thử lại.';

      setErrors({
        submit: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h1>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 border border-green-300">
            {success}
          </div>
        )}

        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-300">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Nhập tên đăng nhập (tối thiểu 3 ký tự)"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Nhập email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Họ tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.full_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Nhập họ tên"
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.full_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Số điện thoại <span className="text-gray-400">(tùy chọn)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Xác nhận mật khẩu"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <p className="text-center mt-4">
          Đã có tài khoản?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            Đăng nhập
          </button>
        </p>

        <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-gray-700 border border-blue-200">
          <p className="font-semibold mb-2">💡 Lưu ý:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Tên đăng nhập: tối thiểu 3 ký tự</li>
            <li>Email: phải hợp lệ (ví dụ: user@example.com)</li>
            <li>Mật khẩu: tối thiểu 6 ký tự</li>
            <li>Xác nhận mật khẩu phải giống mật khẩu</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
