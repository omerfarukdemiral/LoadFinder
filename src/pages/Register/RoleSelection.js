import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTruck, FaBox } from 'react-icons/fa';
import { Logo } from '../../components/common/Logo';

export const RoleSelection = () => {
  const [activeTab, setActiveTab] = useState('driver');
  const [formData, setFormData] = useState({
    // Şoför bilgileri
    driverLicenseNo: '34ABC123456',
    vehicleType: 'tir',
    vehiclePlate: '34 TIR 123',
    experience: '8',
    
    // Yük veren bilgileri
    companyName: 'Anadolu Lojistik A.Ş.',
    taxNumber: '1234567890',
    companyAddress: 'Atatürk Mah. İstanbul Cad. No:123\nKağıthane / İstanbul',
    sector: 'Uluslararası Taşımacılık'
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API'ye rol ve detay bilgilerini gönder
    console.log('Rol ve detay bilgileri:', { role: activeTab, ...formData });
    navigate('/dashboard');
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

        <div className="w-full max-w-2xl">
          <div className="bg-[#242424] p-8 rounded-lg shadow-xl border border-[#333333]">
            <h2 className="text-xl font-bold mb-6 text-center text-white font-blinker">
              Hesabınızı Tamamlayın
            </h2>

            {/* Tab Başlıkları */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab('driver')}
                className={`flex-1 py-3 text-center ${
                  activeTab === 'driver'
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 border-b border-border'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FaTruck />
                  <span>Şoför Olarak Devam Et</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('shipper')}
                className={`flex-1 py-3 text-center ${
                  activeTab === 'shipper'
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 border-b border-border'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FaBox />
                  <span>Yük Veren Olarak Devam Et</span>
                </div>
              </button>
            </div>

            {/* Form Alanları */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'driver' ? (
                // Şoför Form Alanları
                <>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Ehliyet Numarası</label>
                    <input
                      type="text"
                      value={formData.driverLicenseNo}
                      onChange={(e) => setFormData({...formData, driverLicenseNo: e.target.value})}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Araç Tipi</label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                      className={inputClasses}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="tir">TIR</option>
                      <option value="kamyon">Kamyon</option>
                      <option value="kamyonet">Kamyonet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Plaka</label>
                    <input
                      type="text"
                      value={formData.vehiclePlate}
                      onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value})}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Deneyim (Yıl)</label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className={inputClasses}
                      required
                    />
                  </div>
                </>
              ) : (
                // Yük Veren Form Alanları
                <>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Firma Adı</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Vergi Numarası</label>
                    <input
                      type="text"
                      value={formData.taxNumber}
                      onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Firma Adresi</label>
                    <textarea
                      value={formData.companyAddress}
                      onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                      className={inputClasses}
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Sektör</label>
                    <input
                      type="text"
                      value={formData.sector}
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                      className={inputClasses}
                      required
                    />
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-primary-dark transition duration-300 text-sm font-medium"
              >
                Kaydı Tamamla
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