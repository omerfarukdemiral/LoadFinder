import { Link } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';

export const Welcome = () => {
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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white font-blinker">Hoş Geldiniz</h1>
          <p className="text-gray-400 max-w-md">
            Lojistik süreçlerinizi kolaylaştıran dijital platform
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
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
        <AboutSection />
        <ServicesSection />
      </div>
    </div>
  );
}; 