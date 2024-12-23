import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/images/ofd.jpeg';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Ömer Faruk DEMİRAL',
    email: 'omerfarukdemiral@gmail.com',
    avatar: defaultAvatar // Varsayılan avatar
  });
  const navigate = useNavigate();

  const login = (username, password) => {
    // Default kullanıcı bilgileri
    if (username === "admin" && password === "admin123") {
      setUser({ username, role: 'user' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/login'); // Kullanıcıyı login sayfasına yönlendir
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 