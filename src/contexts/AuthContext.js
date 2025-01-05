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
  };

  const login = async (credentials) => {
    setError(null);
    
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success && response.data.data) {
        const { token, user } = response.data.data;
        
        if (!token || !user) {
          throw new Error('Geçersiz sunucu yanıtı');
        }

        // Token'ı kaydet ve header'a ekle
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Kullanıcı bilgilerini güncelle
        setUser(user);
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || 'Giriş başarısız');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Giriş başarısız';
      setError(errorMsg);
      return { success: false, error: errorMsg };
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
      console.error('Profile update error:', err);
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Profil güncelleme başarısız');
      }
      throw err;
    }
  };

  const updateUser = (userData) => {
    try {
      if (!userData) {
        console.error('updateUser: userData boş');
        return;
      }

      if (userData.token) {
        localStorage.setItem('token', userData.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }

      if (userData.user) {
        setUser(userData.user);
        console.log('Kullanıcı bilgileri güncellendi:', userData.user.name);
      } else {
        console.warn('updateUser: user verisi eksik');
      }
    } catch (error) {
      console.error('updateUser hatası:', error);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    updateUser
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