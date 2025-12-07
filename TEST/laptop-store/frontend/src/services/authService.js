import apiClient from './api';

const authService = {
  register: (data) => apiClient.post('/auth/register', data),

  login: (data) => apiClient.post('/auth/login', data),

  getProfile: () => apiClient.get('/auth/profile'),

  updateProfile: (data) => apiClient.put('/auth/profile', data),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
