import { useState } from 'react';
import { FaSave, FaTruck } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_DRIVER_INFO } from '../../constants/mockData';

export const DriverInfo = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(MOCK_DRIVER_INFO);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Şoför bilgileri güncellendi:', formData);
  };

  const inputClasses = `w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Şoför Bilgileri</h1>
        {user?.role === 'driver' && (
          <div className="flex items-center bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            <FaTruck className="mr-1" />
            Şoför
          </div>
        )}
        {user?.role === 'admin' && (
          <div className="flex items-center bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
            <FaTruck className="mr-1" />
            Admin
          </div>
        )}
      </div>

      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Ehliyet Numarası</label>
            <input
              type="text"
              name="driverLicenseNo"
              value={formData.driverLicenseNo}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Araç Tipi</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="tir">TIR</option>
              <option value="kamyon">Kamyon</option>
              <option value="kamyonet">Kamyonet</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Plaka</label>
            <input
              type="text"
              name="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Deneyim (Yıl)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
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