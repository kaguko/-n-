import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    shipping_address: '',
    shipping_phone: '',
    payment_method: 'cash',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Vui lòng đăng nhập trước khi đặt hàng');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }

    try {
      setSubmitting(true);
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        ...shippingInfo
      };

      const response = await orderService.create(orderData);

      if (response.data.success) {
        alert('Đặt hàng thành công!');
        localStorage.removeItem('cart');
        setCartItems([]);
        navigate(`/orders/${response.data.data.id}`);
      }
    } catch (error) {
      alert('Lỗi khi đặt hàng: ' + error.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-6xl mb-4">🛒</p>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all font-bold"
          >
            🛍️ Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🛒 Giỏ hàng ({cartItems.length} sản phẩm)</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                      <th className="p-4 text-left font-bold text-gray-800">Sản phẩm</th>
                      <th className="p-4 text-right font-bold text-gray-800">Giá</th>
                      <th className="p-4 text-center font-bold text-gray-800">Số lượng</th>
                      <th className="p-4 text-right font-bold text-gray-800">Tổng</th>
                      <th className="p-4 text-center font-bold text-gray-800">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}>
                        <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                        <td className="p-4 text-right text-gray-600 font-semibold">{(item.price / 1000000).toFixed(1)}M</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-red-50 font-bold"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded hover:bg-green-50 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right font-bold text-blue-600">
                          {((item.price * item.quantity) / 1000000).toFixed(1)}M
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 font-bold hover:bg-red-50 w-10 h-10 rounded-lg transition"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Thông tin đơn hàng</h2>

              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Tổng tiền:</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {(total / 1000000).toFixed(1)}M
                </p>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">📍 Địa chỉ giao hàng</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.shipping_address}
                    onChange={(e) => setShippingInfo({...shippingInfo, shipping_address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Đường Abc, Phường Xyz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">☎️ Số điện thoại</label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.shipping_phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, shipping_phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0981234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">💳 Phương thức thanh toán</label>
                  <select
                    value={shippingInfo.payment_method}
                    onChange={(e) => setShippingInfo({...shippingInfo, payment_method: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cash">💵 Tiền mặt</option>
                    <option value="bank">🏦 Chuyển khoản</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">📝 Ghi chú (tuỳ chọn)</label>
                  <textarea
                    value={shippingInfo.notes}
                    onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Ghi chú thêm..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed"
                >
                  {submitting ? '⏳ Đang xử lý...' : '✅ Đặt hàng'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
