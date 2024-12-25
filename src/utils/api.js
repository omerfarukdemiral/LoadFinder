import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5500/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Token ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 