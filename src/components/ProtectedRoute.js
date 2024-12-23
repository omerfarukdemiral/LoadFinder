import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı giriş yapmışsa içeriği göster
  return children;
}; 