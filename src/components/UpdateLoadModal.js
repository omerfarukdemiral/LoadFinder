import React, { useState, useEffect } from 'react';
import { 
  FaTimes, FaBox, FaWeight, FaMapMarkerAlt, 
  FaMoneyBillWave, FaSave, FaBoxOpen, FaSnowflake, 
  FaTruck, FaWarehouse, FaIndustry, FaCarSide, 
  FaShip, FaQuestionCircle
} from 'react-icons/fa';
import { LOAD_TYPES } from '../constants/mockData';
import AutocompleteInput from './AutocompleteInput';

const LOAD_TYPE_ICONS = {
    'Konteyner': FaBoxOpen,
    'Soğuk Yük': FaSnowflake,
    'Kuru Yük': FaBox,
    'Ağır Yük': FaTruck,
    'Depo Yükü': FaWarehouse,
    'Endüstriyel': FaIndustry,
    'Araç': FaCarSide,
    'Deniz Yükü': FaShip,
    'Diğer': FaQuestionCircle
  };
const UpdateLoadModal = ({ load, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    loadType: load.loadType,
    size: load.size,
    weight: load.weight,
    distance: load.distance,
    budget: load.budget,
    from: load.from || '',
    to: load.to || ''
  });

  const [fromLocation, setFromLocation] = useState(load.from || '');
  const [toLocation, setToLocation] = useState(load.to || '');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (selectedFrom && selectedTo) {
      calculateDistance();
    }
  }, [selectedFrom, selectedTo]);

  const calculateDistance = async () => {
    if (!selectedFrom || !selectedTo) return;

    const service = new window.google.maps.DistanceMatrixService();
    
    try {
      const response = await new Promise((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [selectedFrom.description],
          destinations: [selectedTo.description],
          travelMode: 'DRIVING',
        }, (response, status) => {
          if (status === 'OK') resolve(response);
          else reject(status);
        });
      });

      const distance = response.rows[0].elements[0].distance.value / 1000;
      
      // Sadece şehir ve ülke bilgisini al
      const fromParts = selectedFrom.description.split(',');
      const toParts = selectedTo.description.split(',');
      const fromLocation = `${fromParts[0]}, ${fromParts[fromParts.length - 1].trim()}`;
      const toLocation = `${toParts[0]}, ${toParts[toParts.length - 1].trim()}`;

      setFormData(prev => ({
        ...prev,
        from: fromLocation,
        to: toLocation,
        distance: Math.round(distance)
      }));

    } catch (error) {
      console.error('Mesafe hesaplanırken hata oluştu:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...load, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#242424] rounded-lg w-full max-w-2xl border border-[#333333] overflow-hidden">
        {/* Header */}
        <div className="bg-[#2a2a2a] p-4 border-b border-[#333333] flex justify-between items-center">
          <div className="flex items-center gap-3">
            {React.createElement(LOAD_TYPE_ICONS[load.loadType] || FaBox, {
              className: "text-2xl text-blue-500"
            })}
            <h2 className="text-xl font-semibold text-white">İlan Düzenle</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yük Tipi */}
            <div>
              <label className="block text-gray-400 mb-2">Yük Tipi</label>
              <select
                name="loadType"
                value={formData.loadType}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
              >
                {LOAD_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Boyut */}
            <div>
              <label className="block text-gray-400 mb-2">Boyut</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
              />
            </div>

            {/* Ağırlık */}
            <div>
              <label className="block text-gray-400 mb-2">Ağırlık (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
              />
            </div>

            {/* Nereden */}
            <div>
              <label className="block text-gray-400 mb-2">Nereden</label>
              <AutocompleteInput
                value={fromLocation}
                onChange={setFromLocation}
                onSelect={setSelectedFrom}
                placeholder="Şehir ara..."
              />
            </div>

            {/* Nereye */}
            <div>
              <label className="block text-gray-400 mb-2">Nereye</label>
              <AutocompleteInput
                value={toLocation}
                onChange={setToLocation}
                onSelect={setSelectedTo}
                placeholder="Şehir ara..."
              />
            </div>

            {/* Mesafe */}
            <div>
              <label className="block text-gray-400 mb-2">Mesafe (km)</label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                readOnly
                className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
              />
            </div>

            {/* Bütçe */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 mb-2">Bütçe (₺)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4 border-t border-[#333333]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaSave />
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLoadModal; 