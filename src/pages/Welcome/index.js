import { Link } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';

export const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo showText={true} />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white font-blinker">Hoş Geldiniz</h1>
        <p className="text-gray-400 max-w-md">
          Lojistik süreçlerinizi kolaylaştıran dijital platform
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Giriş Yap
          </Link>
          <Link
            to="/register"
            className="inline-block bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}; 