import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll({});
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    'pending': 'Chờ xác nhận',
    'confirmed': 'Đã xác nhận',
    'shipped': 'Đang giao',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Đơn hàng của tôi</h1>

      {loading ? (
        <div className="text-center py-12">Đang tải...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">Bạn chưa có đơn hàng nào</div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-6 hover:shadow-lg">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Mã đơn</p>
                  <p className="font-bold">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày đặt</p>
                  <p className="font-bold">{new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng tiền</p>
                  <p className="font-bold text-blue-600">{(order.total_amount / 1000000).toFixed(1)}M ₫</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <p className="font-bold text-green-600">{statusMap[order.status]}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/orders/${order.id}`)}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                Xem chi tiết →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
