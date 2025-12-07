import apiClient from './api';

const productService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    return apiClient.get(`/products?${params}`);
  },

  getById: (id) => apiClient.get(`/products/${id}`),

  getBrands: () => apiClient.get('/products/brands'),

  create: (data) => apiClient.post('/products', data),

  update: (id, data) => apiClient.put(`/products/${id}`, data),

  delete: (id) => apiClient.delete(`/products/${id}`)
};

export default productService;
