import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaSnowflake, FaExclamationTriangle, FaChevronDown, FaChevronUp, FaTimes, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { MOCK_LOAD_LISTINGS_DETAILED } from '../../constants/mockData';

const getIcon = (loadType) => {
  switch (loadType) {
    case 'Konteyner':
      return <FaBox className="text-2xl text-blue-500" />;
    case 'Kuru Yük':
      return <FaTruck className="text-2xl text-green-500" />;
    case 'Soğuk Yük':
      return <FaSnowflake className="text-2xl text-cyan-500" />;
    case 'Tehlikeli Madde':
      return <FaExclamationTriangle className="text-2xl text-red-500" />;
    default:
      return <FaBox className="text-2xl text-gray-500" />;
  }
};

export const LoadListings = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    loadType: '',
    weight: { min: 0, max: 5000 },
    distance: { min: 0, max: 1500 },
    budget: { min: 0, max: 5000 }
  });

  const [expandedCard, setExpandedCard] = useState(null);
  const [filteredData, setFilteredData] = useState(MOCK_LOAD_LISTINGS_DETAILED);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerNote, setOfferNote] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    // Filtreleme işlemi
    const filtered = MOCK_LOAD_LISTINGS_DETAILED.filter(load => {
      const typeMatch = !newFilters.loadType || load.loadType === newFilters.loadType;
      const weightMatch = load.weight >= newFilters.weight.min && load.weight <= newFilters.weight.max;
      const distanceMatch = load.distance >= newFilters.distance.min && load.distance <= newFilters.distance.max;
      const budgetMatch = load.budget >= newFilters.budget.min && load.budget <= newFilters.budget.max;

      return typeMatch && weightMatch && distanceMatch && budgetMatch;
    });

    setFilteredData(filtered);
  };

  const handleOpenOfferModal = (load) => {
    setSelectedLoad(load);
    setOfferAmount(load.budget.toString());
    setShowOfferModal(true);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    
    // Yeni teklif objesi oluştur
    const newOffer = {
      id: Date.now(), // Unique ID
      loadType: selectedLoad.loadType,
      from: selectedLoad.from,
      to: selectedLoad.to,
      price: parseFloat(offerAmount),
      status: 'pending',
      deadline: selectedLoad.deadline,
      distance: selectedLoad.distance,
      note: offerNote
    };

    // Mock data'ya teklifi ekle
    if (typeof window !== 'undefined') {
      const currentOffers = JSON.parse(localStorage.getItem('driverOffers') || '[]');
      localStorage.setItem('driverOffers', JSON.stringify([...currentOffers, newOffer]));
    }

    // Modalı kapat ve başarı mesajını göster
    setShowOfferModal(false);
    setShowSuccessMessage(true);

    // 1 saniye sonra tekliflerim sayfasına yönlendir
    setTimeout(() => {
      navigate('/dashboard/driver/offers');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Yük İlanları</h1>

      {/* Filtreler */}
      <div className="bg-[#242424] p-4 rounded-lg border border-[#333333]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Yük Tipi Filtresi */}
          <div>
            <label className="block text-gray-400 mb-2">Yük Tipi</label>
            <select
              value={filters.loadType}
              onChange={(e) => handleFilterChange('loadType', e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
            >
              <option value="">Tümü</option>
              <option value="Konteyner">Konteyner</option>
              <option value="Kuru Yük">Kuru Yük</option>
              <option value="Soğuk Yük">Soğuk Yük</option>
              <option value="Tehlikeli Madde">Tehlikeli Madde</option>
            </select>
          </div>

          {/* Ağırlık Filtresi */}
          <div>
            <label className="block text-gray-400 mb-2">Ağırlık (kg)</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.weight.max}
                onChange={(e) => handleFilterChange('weight', { min: filters.weight.min, max: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-gray-400 min-w-[60px]">{filters.weight.max}kg</span>
            </div>
          </div>

          {/* Mesafe Filtresi */}
          <div>
            <label className="block text-gray-400 mb-2">Mesafe (km)</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={filters.distance.max}
                onChange={(e) => handleFilterChange('distance', { min: filters.distance.min, max: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-gray-400 min-w-[60px]">{filters.distance.max}km</span>
            </div>
          </div>

          {/* Bütçe Filtresi */}
          <div>
            <label className="block text-gray-400 mb-2">Bütçe (₺)</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.budget.max}
                onChange={(e) => handleFilterChange('budget', { min: filters.budget.min, max: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-gray-400 min-w-[60px]">₺{filters.budget.max}</span>
            </div>
          </div>
        </div>
      </div>

      {/* İlan Listesi */}
      <div className="grid grid-cols-1 gap-4 mx-auto w-1/2">
        {filteredData.map((load) => (
          <div key={load.id} className="bg-[#242424] rounded-lg border border-[#333333] overflow-hidden">
            {/* Kart Başlığı */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getIcon(load.loadType)}
                  <div>
                    <h2 className="text-lg font-semibold text-white">{load.loadType}</h2>
                    <p className="text-gray-400">{load.from} → {load.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">₺{load.budget}</p>
                  <p className="text-gray-400">{load.distance} km</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-400">
                  <p>Ağırlık: {load.weight} kg</p>
                  <p>Boyut: {load.size}</p>
                </div>
                <button
                  onClick={() => setExpandedCard(expandedCard === load.id ? null : load.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
                >
                  {expandedCard === load.id ? (
                    <>
                      Gizle <FaChevronUp className="ml-2" />
                    </>
                  ) : (
                    <>
                      Detaylı İncele <FaChevronDown className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Genişletilmiş Detaylar */}
            {expandedCard === load.id && (
              <div className="p-4 border-t border-[#333333] bg-[#2a2a2a]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">İlan Detayları</h3>
                    <p className="text-gray-400">{load.description}</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Gereksinimler</h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {load.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-gray-400">Son Teslim: {load.deadline}</p>
                  <button 
                    onClick={() => handleOpenOfferModal(load)}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Teklif Ver
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Teklif Verme Modalı */}
      {showOfferModal && selectedLoad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#242424] rounded-lg w-full max-w-md border border-[#333333] overflow-hidden">
            {/* Modal Başlık */}
            <div className="flex justify-between items-center p-4 border-b border-[#333333]">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {getIcon(selectedLoad.loadType)}
                Teklif Ver
              </h3>
              <button 
                onClick={() => setShowOfferModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal İçerik */}
            <form onSubmit={handleSubmitOffer} className="p-4 space-y-4">
              {/* Yük Bilgileri */}
              <div className="bg-[#2a2a2a] p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Güzergah:</span>
                  <span className="text-white">{selectedLoad.from} → {selectedLoad.to}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Mesafe:</span>
                  <span className="text-white">{selectedLoad.distance} km</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Yük Tipi:</span>
                  <span className="text-white">{selectedLoad.loadType}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>İlan Bütçesi:</span>
                  <span className="text-green-500">₺{selectedLoad.budget}</span>
                </div>
              </div>

              {/* Teklif Tutarı */}
              <div className="space-y-2">
                <label className="block text-gray-400">Teklif Tutarı (₺)</label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md py-2 pl-10 pr-3"
                    placeholder="Teklifiniz..."
                    required
                  />
                </div>
              </div>

              {/* Not Alanı */}
              <div className="space-y-2">
                <label className="block text-gray-400">Not (Opsiyonel)</label>
                <textarea
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-3 h-24 resize-none"
                  placeholder="Teklifiniz hakkında ek bilgi ekleyin..."
                />
              </div>

              {/* Butonlar */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-[#2a2a2a] text-white px-4 py-2 rounded-md hover:bg-[#333333] transition duration-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Teklif Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Başarı Mesajı */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <FaCheckCircle />
          Teklifiniz başarıyla gönderildi!
        </div>
      )}
    </div>
  );
}; 