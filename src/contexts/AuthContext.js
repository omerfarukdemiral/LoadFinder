import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Token kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Giriş
  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız');
      throw err;
    }
  };

  // Profil güncelleme
  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      setUser(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profil güncelleme başarısız');
      throw err;
    }
  };

  // Çıkış
  const logout = async () => {
    try {
      // Backend'e çıkış isteği gönder
      await api.post('/auth/logout');
      
      // Local storage'dan token'ı temizle
      localStorage.removeItem('token');
      
      // User state'ini temizle
      setUser(null);
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Hata olsa bile local cleanup'ı yap
      localStorage.removeItem('token');
      setUser(null);
      return false;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    updateProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};