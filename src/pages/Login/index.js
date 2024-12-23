import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { FcGoogle } from 'react-icons/fc';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = () => {
    console.log('Google ile giriş yapılıyor...');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo showText={true} />
      </div>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-[#242424] rounded-lg p-8 border border-[#333333] space-y-6">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Giriş Yap</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-gray-400 mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-[#242424] text-white py-2 px-4 rounded-md hover:bg-[#2a2a2a] flex items-center justify-center space-x-2 transition-colors border border-[#333333]"
          >
            <FcGoogle className="text-xl" />
            <span>Google ile Giriş Yap</span>
          </button>

          <div className="text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-400">
              Hesabınız yok mu? Kayıt olun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 