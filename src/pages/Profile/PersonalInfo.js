import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaCamera, FaUserCog } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_PERSONAL_INFO } from '../../constants/mockData';

export const PersonalInfo = () => {
  const { user, updateUserRole } = useAuth();
  const [profileData, setProfileData] = useState(MOCK_PERSONAL_INFO);

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Profil bilgileriniz başarıyla güncellendi!');
    setTimeout(() => setSuccessMessage(''), 3000);
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

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    updateUserRole(newRole);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Kişisel Bilgiler</h1>

      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
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
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" /> Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>

      {/* Geliştirici Modu - Rol Değiştirme */}
      <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
        <div className="flex items-center gap-2 mb-4">
          <FaUserCog className="text-yellow-500" />
          <h3 className="text-yellow-500 font-semibold">Geliştirici Modu</h3>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-gray-400">Kullanıcı Rolü:</label>
          <select
            value={user?.role}
            onChange={handleRoleChange}
            className="bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
          >
            <option value="driver">Şoför</option>
            <option value="shipper">Yük Veren</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
}; 