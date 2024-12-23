import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaArrowLeft, FaTruck, FaBox } from 'react-icons/fa';
import { Logo } from '../../components/common/Logo';

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    // Ortak alanlar
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Şoför için ek alanlar
    driverLicenseNo: '',
    vehicleType: '',
    vehiclePlate: '',
    experience: '',
    
    // Yük veren için ek alanlar
    companyName: '',
    taxNumber: '',
    companyAddress: '',
    sector: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Kayıt bilgileri:', { ...formData, role: selectedRole });
    navigate('/login');
  };

  const handleGoogleRegister = () => {
    console.log('Google ile kayıt yapılıyor...');
  };

  // Rol seçim kartları
  const RoleSelection = () => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <button
        onClick={() => setSelectedRole('driver')}
        className={`p-6 rounded-lg border ${
          selectedRole === 'driver'
            ? 'border-blue-500 bg-surface-light'
            : 'border-gray-600 hover:bg-surface-light'
        } transition-all flex flex-col items-center space-y-3`}
      >
        <FaTruck className="text-3xl text-gray-300" />
        <span className="text-white font-medium">Şoför</span>
      </button>
      
      <button
        onClick={() => setSelectedRole('shipper')}
        className={`p-6 rounded-lg border ${
          selectedRole === 'shipper'
            ? 'border-blue-500 bg-surface-light'
            : 'border-gray-600 hover:bg-surface-light'
        } transition-all flex flex-col items-center space-y-3`}
      >
        <FaBox className="text-3xl text-gray-300" />
        <span className="text-white font-medium">Yük Veren</span>
      </button>
    </div>
  );

  // Ortak form alanları
  const CommonFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-gray-400 text-sm mb-1">Kullanıcı Adı</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">E-posta</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Telefon</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Şifre</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Şifre Tekrar</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          className={inputClasses}
        />
      </div>
    </div>
  );

  // Şoför için ek alanlar
  const DriverFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-gray-400 text-sm mb-1">Ehliyet Numarası</label>
        <input
          type="text"
          value={formData.driverLicenseNo}
          onChange={(e) => setFormData({...formData, driverLicenseNo: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Araç Tipi</label>
        <select
          value={formData.vehicleType}
          onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
          className={inputClasses}
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
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Deneyim (Yıl)</label>
        <input
          type="number"
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className={inputClasses}
        />
      </div>
    </div>
  );

  // Yük veren için ek alanlar
  const ShipperFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-gray-400 text-sm mb-1">Firma Adı</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Vergi Numarası</label>
        <input
          type="text"
          value={formData.taxNumber}
          onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Firma Adresi</label>
        <textarea
          value={formData.companyAddress}
          onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
          className={inputClasses}
          rows="3"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-1">Sektör</label>
        <input
          type="text"
          value={formData.sector}
          onChange={(e) => setFormData({...formData, sector: e.target.value})}
          className={inputClasses}
        />
      </div>
    </div>
  );

  // Input stilleri güncellendi
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
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo showText={true} />
      </div>

      <div className="w-full max-w-[60%]">
        <div className="bg-[#242424] p-8 rounded-lg shadow-xl border border-[#333333]">
          <h2 className="text-xl font-bold mb-4 text-center text-white font-blinker">Kayıt Ol</h2>
          
          <div className="mb-4 max-w-4xl mx-auto">
            <RoleSelection />
          </div>

          {selectedRole && (
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Sol Sütun - Ortak Bilgiler */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-300 pb-1 border-b border-border">
                    Kişisel Bilgiler
                  </h3>
                  <CommonFields />
                </div>

                {/* Sağ Sütun - Role Özel Bilgiler */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-300 pb-1 border-b border-border">
                    {selectedRole === 'driver' ? 'Şoför Bilgileri' : 'Firma Bilgileri'}
                  </h3>
                  {selectedRole === 'driver' ? <DriverFields /> : <ShipperFields />}
                </div>
              </div>

              {/* Form Alt Kısmı - Butonlar */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="max-w-md mx-auto space-y-4">
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-primary-dark transition duration-300 text-sm font-medium"
                  >
                    Kayıt Ol
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


                </div>
              </div>
            </form>
          )}
        </div>
        
      </div>
      <div className="text-center text-sm pt-5">
                    <p className="text-gray-400">Zaten hesabınız var mı?</p>
                    <Link 
                      to="/login" 
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Giriş Yapın
                    </Link>
                  </div>
    </div>
  );
};