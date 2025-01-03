import { createContext, useContext, useState, useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Token ve kullanıcı durumu kontrolü
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Token'ı header'a ekle
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Kullanıcı bilgilerini al
        const response = await api.get('/auth/me');
        
        if (response.data.success && response.data.data) {
          setUser(response.data.data);
          setError(null);
        } else {
          // Token geçersizse sessiz bir şekilde temizle
          handleLogout(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Sadece 401 hatası durumunda sessiz logout
        if (error.response?.status === 401) {
          handleLogout(true);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Merkezi logout işlemi
  const handleLogout = (silent = false) => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
    
    // Eğer sessiz logout değilse ve bir sonraki sayfa belirtilmemişse
    if (!silent) {
      window.location.href = '/login';
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        setError(null);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout();
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      if (response.data.success) {
        setUser(response.data.data);
        setError(null);
      }
      return response.data;
    } catch (err) {
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Profil güncelleme başarısız');
      }
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-primary-dark flex items-center justify-center">
        <BiLoaderAlt className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;