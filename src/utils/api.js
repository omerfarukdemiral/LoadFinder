import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// İstek interceptor'ı
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Kullanıcı işlemleri
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    resetPassword: (email) => api.post('/auth/reset-password', { email })
  },
  
  // Yük işlemleri
  loads: {
    getAll: (filters) => api.get('/loads', { params: filters }),
    getById: (id) => api.get(`/loads/${id}`),
    create: (loadData) => api.post('/loads', loadData),
    update: (id, loadData) => api.put(`/loads/${id}`, loadData),
    delete: (id) => api.delete(`/loads/${id}`)
  },

  // Teklif işlemleri
  offers: {
    create: (offerId, offerData) => api.post(`/offers/${offerId}`, offerData),
    accept: (offerId) => api.put(`/offers/${offerId}/accept`),
    reject: (offerId) => api.put(`/offers/${offerId}/reject`)
  },

  // Geri bildirim işlemleri
  feedback: {
    create: (feedbackData) => api.post('/feedback', feedbackData),
    getByUserId: (userId) => api.get(`/feedback/user/${userId}`)
  }
}; 