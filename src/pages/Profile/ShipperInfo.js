import { useState } from 'react';
import { 
  FaSave, FaBuilding, FaStar, FaBox, FaCheck, 
  FaTimes, FaCalendar, FaUsers, FaClock, FaPhone, 
  FaEnvelope, FaGlobe, FaMapMarkerAlt 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_SHIPPER_INFO } from '../../constants/mockData';

export const ShipperInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(MOCK_SHIPPER_INFO);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      ...(name.includes('.') 
        ? { 
            [name.split('.')[0]]: {
              ...prev[name.split('.')[0]],
              [name.split('.')[1]]: value
            }
          }
        : { [name]: value })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Yük veren bilgileri güncellendi:', formData);
  };

  const inputClasses = `w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`;
  const readOnlyClasses = `w-full bg-[#1a1a1a] border border-[#333333] text-gray-400 rounded-md p-2 cursor-not-allowed`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Firma Bilgileri</h1>
        {user?.role === 'shipper' && (
          <div className="flex items-center bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            <FaBuilding className="mr-1" />
            Yük Veren
          </div>
        )}
      </div>

      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#2a2a2a] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <FaStar className="text-yellow-500" />
              <span>Değerlendirme</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formData.rating}
              <span className="text-sm text-gray-400">/5.0</span>
            </div>
          </div>

          <div className="bg-[#2a2a2a] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <FaBox className="text-blue-500" />
              <span>Toplam İlan</span>
            </div>
            <div className="text-2xl font-bold text-white">{formData.totalLoads}</div>
          </div>

          <div className="bg-[#2a2a2a] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <FaCalendar className="text-green-500" />
              <span>Üyelik Tarihi</span>
            </div>
            <div className="text-lg font-bold text-white">
              {new Date(formData.memberSince).toLocaleDateString('tr-TR')}
            </div>
          </div>

          <div className="bg-[#2a2a2a] p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <FaUsers className="text-purple-500" />
              <span>Şirket Büyüklüğü</span>
            </div>
            <div className="text-lg font-bold text-white">{formData.companySize}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Firma Adı</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Vergi Numarası</label>
              <input
                type="text"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Telefon</label>
              <input
                type="text"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">E-posta</label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Website</label>
              <input
                type="text"
                name="contact.website"
                value={formData.contact.website}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Adres Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Şehir</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">İlçe</label>
              <input
                type="text"
                name="address.district"
                value={formData.address.district}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Açık Adres</label>
              <input
                type="text"
                name="address.fullAddress"
                value={formData.address.fullAddress}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Salt Okunur İstatistikler */}
          <div className="bg-[#2a2a2a] p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-medium text-gray-300 mb-4">İstatistikler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-500" />
                <span className="text-gray-400">Tamamlanan İlanlar:</span>
                <span className="text-white">{formData.completedLoads}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaTimes className="text-red-500" />
                <span className="text-gray-400">İptal Edilen İlanlar:</span>
                <span className="text-white">{formData.cancelledLoads}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-blue-500" />
                <span className="text-gray-400">Son Aktivite:</span>
                <span className="text-white">
                  {new Date(formData.lastActivityDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>

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
    </div>
  );
}; 