import { useState, useEffect } from 'react';
import { FaUser, FaSave, FaCamera, FaClock, FaUserTag } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AlertModal from '../../components/AlertModal';
import { storage } from '../../utils/supabase';

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  // Dosya seçim işlemi
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      }

      // Dosya tipi kontrolü
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Sadece JPEG, PNG ve WEBP formatları desteklenmektedir');
      }

      // Dosyayı state'e kaydet
      setSelectedFile(file);
      
      // Base64 önizleme oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result // Base64 formatında
        }));
      };
      reader.readAsDataURL(file);
      setIsDirty(true);

    } catch (error) {
      console.error('Dosya seçim hatası:', error);
      setUploadError(error.message);
      setSelectedFile(null);
    }
  };

  // Form gönderimi sırasında fotoğraf yükleme
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    
    try {
      // Eğer yeni bir fotoğraf seçildiyse önce onu yükle
      let avatarUrl = profileData.avatar;
      
      if (selectedFile) {
        console.log('Fotoğraf yükleme başlıyor...', {
          fileSize: selectedFile.size,
          fileType: selectedFile.type,
          userId: profileData._id
        });

        avatarUrl = await storage.uploadProfilePhoto(
          selectedFile,
          profileData._id,
          {
            onProgress: (progress) => {
              console.log('Upload progress:', progress);
              setUploadProgress(progress);
            }
          }
        );

        console.log('Fotoğraf yükleme başarılı:', avatarUrl);
      }

      // Profil bilgilerini güncelle
      const updatedProfile = {
        ...profileData,
        avatar: avatarUrl
      };

      await updateProfile(updatedProfile);
      
      setSuccessMessage('Profil bilgileriniz başarıyla güncellendi!');
      setInitialData(updatedProfile);
      setIsDirty(false);
      setSelectedFile(null);
      
      if (nextPath) {
        navigate(nextPath);
      }
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      setUploadError(error.message || 'Profil güncellenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
      setShowAlert(false);
      setUploadProgress(0);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Rol adını Türkçe'ye çeviren fonksiyon
  const getRoleName = (role) => {
    const roles = {
      'driver': 'Sürücü',
      'shipper': 'Nakliyeci',
      'admin': 'Yönetici'
    };
    return roles[role] || role;
  };

  useEffect(() => {
    if (uploadError) {
      setTimeout(() => {
        setUploadError(null);
      }, 5000);
    }
  }, [uploadError]);

  return (
    <div className="space-y-6">


      {/* Başlık ve Badge'ler */}
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">
          Kişisel Bilgiler
        </h1>
        
        <div className="flex gap-3">
          {/* Kayıt Tarihi Badge */}
          <div className="flex items-center bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
            <FaClock className="text-gray-400 mr-2" />
            <div>
              <div className="text-xs text-gray-400">Kayıt Tarihi</div>
              <div className="text-sm text-gray-200">
                {formatDate(profileData.registrationDate)}
              </div>
            </div>
          </div>

          {/* Rol Badge */}
          <div className="flex items-center bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-800/30">
            <FaUserTag className="text-blue-400 mr-2" />
            <div>
              <div className="text-xs text-blue-300">Rol</div>
              <div className="text-sm text-blue-200">
                {getRoleName(profileData.role)}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
                      <div className="text-blue-400 text-sm">
                        {uploadProgress}%
                      </div>
                    </div>
                  ) : (
                    profileData.avatar ? (
                      <img 
                        src={profileData.avatar} 
                        alt="Profil" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser className="text-4xl text-[#666666]" />
                      </div>
                    )
                  )}
                </div>

                {/* Progress Bar */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                <label 
                  htmlFor="avatar-upload" 
                  className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer transition-colors
                    ${isLoading 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-[#333333] hover:bg-[#404040]'}`}
                >
                  <FaCamera className="text-[#e0e0e0]" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  disabled={isLoading}
                  className="hidden"
                />
              </div>
            </div>

            {/* Hata Mesajı */}
            {uploadError && (
              <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded-md">
                {uploadError}
              </div>
            )}

            {/* Bilgi Metni */}
            <p className="text-gray-400 text-sm">
              {isLoading 
                ? 'Fotoğraf yükleniyor...' 
                : 'Profil fotoğrafınızı değiştirmek için tıklayın'}
            </p>
            <p className="text-gray-500 text-xs">
              Maksimum dosya boyutu: 5MB (JPEG, PNG, WEBP)
            </p>
          </div>

          {/* Kişisel Bilgiler */}
          <div>
            <h2 className="text-xl font-semibold text-[#e0e0e0] mb-4">Kişisel Bilgiler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kullanıcı Adı (readonly) ve Ad Soyad (birleşik) */}
              <div>
                <label className="block text-gray-400 mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username || ''}
                  readOnly
                  className="w-full bg-[#242424] border border-[#333333] text-gray-500 rounded-md p-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  name="fullName"
                  value={`${profileData.name || ''}`}
                  onChange={(e) => {
                    setProfileData(prev => ({
                      ...prev,
                      name: e.target.value
                    }));
                  }}
                  placeholder="Ad Soyad"
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>

              {/* E-posta ve Telefon */}
              <div>
                <label className="block text-gray-400 mb-2">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email || ''}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone || ''}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
                />
              </div>

              {/* Adres */}
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2">Adres</label>
                <textarea
                  name="address"
                  value={profileData.address || ''}
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
            {/* Debug JSON görüntüleme */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
        <h2 className="text-sm font-mono text-gray-400 mb-2">Debug: Profile Data</h2>
        <pre className="text-xs font-mono text-gray-300 overflow-auto max-h-40">
          {JSON.stringify(profileData, null, 2)}
        </pre>
      </div>
    </div>
  );
}; 