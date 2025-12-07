import apiClient from './api';

const orderService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    return apiClient.get(`/orders?${params}`);
  },

  getById: (id) => apiClient.get(`/orders/${id}`),

  create: (data) => apiClient.post('/orders', data),

  updateStatus: (id, status) => apiClient.put(`/orders/${id}/status`, { status }),

  getStatistics: () => apiClient.get('/orders/admin/statistics')
};

export default orderService;
