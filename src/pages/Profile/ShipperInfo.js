import { useState } from 'react';
import { FaSave, FaBuilding } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export const ShipperInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    companyName: 'Anadolu Lojistik A.Ş.',
    taxNumber: '1234567890',
    companyAddress: 'Atatürk Mah. İstanbul Cad. No:123\nKağıthane / İstanbul',
    sector: 'Uluslararası Taşımacılık'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Yük veren bilgileri güncellendi:', formData);
  };

  const inputClasses = `w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`;

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
        {user?.role === 'admin' && (
          <div className="flex items-center bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
            <FaBuilding className="mr-1" />
            Admin
          </div>
        )}
      </div>

      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div>
            <label className="block text-gray-400 mb-2">Firma Adresi</label>
            <textarea
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className={inputClasses}
              rows="3"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Sektör</label>
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className={inputClasses}
            />
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