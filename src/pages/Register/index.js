import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { Logo } from '../../components/common/Logo';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: 'ahmetyilmaz34',
    email: 'ahmet.yilmaz@gmail.com',
    password: 'Test123!',
    confirmPassword: 'Test123!',
    phone: '0532 123 4567'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form verilerini sessionStorage'a kaydet
    sessionStorage.setItem('registrationData', JSON.stringify(formData));
    navigate('/register/role-selection');
  };

  const handleGoogleRegister = () => {
    console.log('Google ile kayıt yapılıyor...');
  };

  const inputClasses = `
    bg-surface-light 
    border border-border 
    text-white 
    py-2 px-3 
    w-full 
    rounded-md 
    text-sm
    focus:outline-none 
    focus:ring-1
    focus:ring-primary-light
    transition-all
  `;

  return (
    <div className="min-h-screen relative">
      {/* Arka plan görseli */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Koyu overlay */}
      <div 
        className="absolute inset-0 z-10 bg-[#1a1a1a]"
        style={{ opacity: '0.95' }}
      />

      {/* İçerik */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="mb-8">
          <Logo showText={true} />
        </div>

        <div className="w-full max-w-md">
          <div className="bg-[#242424] p-8 rounded-lg shadow-xl border border-[#333333]">
            <h2 className="text-xl font-bold mb-6 text-center text-white font-blinker">Hesap Oluştur</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Kullanıcı Adı</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">E-posta</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Şifre</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Şifre Tekrar</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className={inputClasses}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-primary-dark transition duration-300 text-sm font-medium"
              >
                Devam Et
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#242424] text-gray-400">veya</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center space-x-2 bg-[#2a2a2a] text-white py-2.5 rounded-md hover:bg-[#333333] transition duration-300 border border-[#333333] text-sm"
              >
                <FaGoogle className="text-lg" />
                <span>Google ile Kayıt Ol</span>
              </button>
            </form>
          </div>
          
          <div className="text-center text-sm mt-4">
            <p className="text-gray-400">Zaten hesabınız var mı?</p>
            <Link 
              to="/login" 
              className="text-blue-500 hover:text-blue-400"
            >
              Giriş Yapın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};