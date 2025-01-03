import { useState, useEffect } from 'react';
import { FaUser, FaSave, FaCamera } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AlertModal from '../../components/AlertModal';

export const PersonalInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState(user || {});
  const [initialData, setInitialData] = useState(user || {});
  const [isDirty, setIsDirty] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nextPath, setNextPath] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setInitialData(user);
    }
  }, [user]);

  // Form değişikliklerini kontrol et
  useEffect(() => {
    const hasChanges = JSON.stringify(profileData) !== JSON.stringify(initialData);
    setIsDirty(hasChanges);
  }, [profileData, initialData]);

  // Sayfa değişikliği kontrolü
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Navigasyon kontrolü
  const handleNavigation = (path) => {
    if (isDirty) {
      setNextPath(path);
      setShowAlert(true);
      return;
    }
    navigate(path);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(profileData);
      setSuccessMessage('Profil bilgileriniz başarıyla güncellendi!');
      setInitialData(profileData);
      setIsDirty(false);
      
      if (nextPath) {
        navigate(nextPath);
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
      setShowAlert(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">
        Kişisel Bilgiler
      </h1>

      {/* Başarı mesajı */}
      {successMessage && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Alert Modal */}
      {showAlert && (
        <AlertModal
          title="Değişiklikleri Kaydet"
          message="Kaydedilmemiş değişiklikleriniz var. Kaydetmek istiyor musunuz?"
          onConfirm={handleSubmit}
          onCancel={() => {
            setShowAlert(false);
            if (nextPath) {
              setIsDirty(false);
              navigate(nextPath);
            }
          }}
        />
      )}

      <div className="bg-surface rounded-lg p-6 border border-[#333333]">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profil Fotoğrafı Bölümü */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-[#e0e0e0]">Profil Fotoğrafı</h2>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#333333] bg-[#2a2a2a]">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="Profil" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaUser className="text-4xl text-[#666666]" />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute bottom-0 right-0 bg-[#333333] p-2 rounded-full cursor-pointer hover:bg-[#404040] transition-colors"
                >
                  <FaCamera className="text-[#e0e0e0]" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Profil fotoğrafınızı değiştirmek için tıklayın
            </p>
          </div>

          {/* Kişisel Bilgiler */}
          <div>
            <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">Kişisel Bilgiler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Ad</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Soyad</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Adres</label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isDirty || isLoading}
              className={`
                flex items-center px-6 py-2 rounded-md
                ${isDirty 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
                transition-colors
              `}
            >
              <FaSave className="mr-2" />
              {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 