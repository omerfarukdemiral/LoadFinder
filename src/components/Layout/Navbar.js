import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Yük Yönetim Sistemi
            </Link>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2">
                  Profil
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2">
                  Giriş Yap
                </Link>
                <Link to="/register" className="text-gray-300 hover:text-white px-3 py-2">
                  Kayıt Ol
                </Link>
                <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2">
                  İletişim
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 