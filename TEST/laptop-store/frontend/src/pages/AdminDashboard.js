import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUsers, FiShoppingCart, FiBox, FiBarChart2, FiEdit, FiTrash2 } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    fetchStats();
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'users') fetchUsers();
  }, [navigate, activeTab]);

  const fetchStats = async () => {
    // Tính toán stats từ API
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      // Fetch products
      const productsRes = await fetch('http://localhost:5000/api/products', { headers });
      const productsData = await productsRes.json();
      
      // Fetch orders
      const ordersRes = await fetch('http://localhost:5000/api/orders', { headers });
      const ordersData = await ordersRes.json();

      const orders = ordersData.data || [];
      const revenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

      setStats({
        totalProducts: productsData.data?.length || 0,
        totalOrders: orders.length,
        totalUsers: 3, // Từ sample data
        totalRevenue: revenue
      });
    } catch (error) {
      // Error fetching stats
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Xóa sản phẩm thành công!');
        fetchProducts();
      } else {
        alert('Có lỗi khi xóa sản phẩm');
      }
    } catch (error) {
      alert('Có lỗi khi xóa sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Xóa đơn hàng thành công!');
        fetchOrders();
      } else {
        alert('Có lỗi khi xóa đơn hàng');
      }
    } catch (error) {
      alert('Có lỗi khi xóa đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Tổng sản phẩm</p>
            <p className="text-4xl font-bold">{stats.totalProducts}</p>
          </div>
          <FiBox className="text-5xl opacity-20" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Đơn hàng</p>
            <p className="text-4xl font-bold">{stats.totalOrders}</p>
          </div>
          <FiShoppingCart className="text-5xl opacity-20" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">Người dùng</p>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </div>
          <FiUsers className="text-5xl opacity-20" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100">Doanh thu</p>
            <p className="text-3xl font-bold">${typeof stats.totalRevenue === 'number' ? stats.totalRevenue.toFixed(2) : (0).toFixed(2)}</p>
          </div>
          <FiBarChart2 className="text-5xl opacity-20" />
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Quản lý sản phẩm</h3>
      <div className="space-y-4">
        <button 
          onClick={() => navigate('/admin/products/new')} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Thêm sản phẩm mới
        </button>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-b">ID</th>
                <th className="p-3 text-left border-b">Tên</th>
                <th className="p-3 text-left border-b">Nhãn hiệu</th>
                <th className="p-3 text-left border-b">Giá</th>
                <th className="p-3 text-left border-b">Kho</th>
                <th className="p-3 text-left border-b">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">Không có sản phẩm nào</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.brand}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3 space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1"
                        title="Sửa"
                      >
                        <FiEdit size={16} /> Sửa
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 disabled:opacity-50"
                        title="Xóa"
                      >
                        <FiTrash2 size={16} /> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Quản lý đơn hàng</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Người mua</th>
              <th className="p-3 text-left border-b">Tổng tiền</th>
              <th className="p-3 text-left border-b">Trạng thái</th>
              <th className="p-3 text-left border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">Không có đơn hàng nào</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">Khách #{order.user_id}</td>
                  <td className="p-3">${order.total_amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 disabled:opacity-50"
                    >
                      <FiTrash2 size={16} /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Quản lý người dùng</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">ID</th>
              <th className="p-3 text-left border-b">Tên</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Vai trò</th>
              <th className="p-3 text-left border-b">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">Không có người dùng nào</td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.full_name || u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      u.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.is_active ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!user) return <div className="flex justify-center items-center h-screen">Đang tải...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Laptop Store Admin</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Bảng điều khiển
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left p-3 rounded ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Sản phẩm
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-3 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Đơn hàng
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left p-3 rounded ${activeTab === 'users' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            Người dùng
          </button>
        </nav>
        
        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-600 p-3 rounded flex items-center justify-center gap-2 hover:bg-red-700"
        >
          <FiLogOut /> Đăng xuất
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Bảng điều khiển'}
              {activeTab === 'products' && 'Quản lý sản phẩm'}
              {activeTab === 'orders' && 'Quản lý đơn hàng'}
              {activeTab === 'users' && 'Quản lý người dùng'}
            </h1>
            <p className="text-gray-600">Xin chào, {user.name}!</p>
          </div>

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'users' && renderUsers()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
