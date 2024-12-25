import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/images/ofd.jpeg';
import { MOCK_USERS_DETAILED } from '../constants/mockData';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USERS_DETAILED[0]);
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setUser({ username, role: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const updateUser = (selectedUser) => {
    setUser(selectedUser);
  };

  const updateUserRole = (newRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole
    }));
    // Rol değişikliğinde kullanıcıyı ana sayfaya yönlendir
    navigate('/dashboard');
  };

  // Rol kontrolü için yeni fonksiyon
  const checkAccess = (allowedRoles) => {
    if (!user) return false;
    if (!allowedRoles) return true;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      updateUser,
      updateUserRole,
      checkAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);