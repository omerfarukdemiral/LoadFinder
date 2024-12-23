import { Logo } from '../common/Logo';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Giriş Yap
            </Link>
            <Link 
              to="/register" 
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}; 