import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaSnowflake, FaExclamationTriangle, FaWeight, FaMapMarkerAlt, FaArrowRight, FaHandshake, FaRoad, FaUser } from 'react-icons/fa';
import { MOCK_LOAD_LISTINGS_DETAILED, MOCK_USERS_DETAILED } from '../../constants/mockData';
import { useAuth } from '../../contexts/AuthContext';

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

const LoadCard = ({ load, onOfferClick }) => {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const loadOwner = MOCK_USERS_DETAILED.find(user => user.id === load.createdBy);
    setOwner(loadOwner);
  }, [load.createdBy]);

  return (
    <div className="bg-[#242424] rounded-lg border border-[#333333] overflow-hidden">
      {/* Üst Kısım - İlan Sahibi, Tarih, Fiyat ve Teklif Butonu */}
      <div className="p-4 border-b border-[#333333] bg-[#2a2a2a] flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* İlan Sahibi */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#333333]">
              <img 
                src={owner?.avatar} 
                alt={owner?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white text-sm font-medium">{owner?.name}</h3>
              <p className="text-xs text-gray-400">{owner?.shipperInfo?.companyName}</p>
            </div>
          </div>

          {/* İlan Tarihi */}
          <div className="text-sm">
            <span className="text-gray-400">İlan Tarihi: </span>
            <span className="text-white">{new Date(load.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>

          {/* Fiyat Badge */}
          <div className="bg-green-900/50 px-3 py-1 rounded-full border border-green-700/50">
            <span className="text-green-400 font-medium">{load.budget} ₺</span>
          </div>

          {/* Teklif Sayısı */}
          {load.offerCount > 0 && (
            <div className="flex items-center space-x-2 text-sm">
              <FaHandshake className="text-blue-400" />
              <span className="text-gray-400">{load.offerCount} Teklif</span>
            </div>
          )}
        </div>

        {/* Teklif Ver Butonu */}
        <button
          onClick={() => onOfferClick(load)}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
        >
          Teklif Ver
        </button>
      </div>

      {/* Alt Kısım - Yük Detayları */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Yük Tipi, Boyut ve Ağırlık */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <FaBox className="text-blue-400 text-lg" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Yük Tipi</p>
            <p className="text-white text-sm font-medium">{load.loadType}</p>
            <p className="text-gray-400 text-xs mt-1">Boyut: {load.size}</p>
            <p className="text-gray-400 text-xs mt-1">Ağırlık: {load.weight} kg</p>
          </div>
        </div>

        {/* Mesafe ve Rota Bilgileri */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <FaRoad className="text-blue-400 text-lg" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">Mesafe</p>
                <p className="text-white text-sm font-medium">{load.distance} km</p>
                <p className="text-gray-400 text-xs mt-1">~{Math.round(load.budget / load.distance)} ₺/km</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Nereden</p>
                  <p className="text-white text-sm">{load.from}</p>
                </div>
                <FaArrowRight className="text-gray-500 mx-2" />
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Nereye</p>
                  <p className="text-white text-sm">{load.to}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadListings = () => {
  const { user } = useAuth();
  
  const [filters, setFilters] = useState({
    loadType: '',
    weight: { min: 0, max: 5000 },
    distance: { min: 0, max: 1500 },
    budget: { min: 0, max: 5000 }
  });

  const [filteredData, setFilteredData] = useState([]);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerNote, setOfferNote] = useState('');

  // Verileri yükle
  const loadData = () => {
    try {
      const storedLoads = JSON.parse(localStorage.getItem('loads') || '[]');
      const allLoads = [...MOCK_LOAD_LISTINGS_DETAILED, ...storedLoads];
      
      // Filtreleme işlemi
      const filtered = allLoads.filter(load => {
        const typeMatch = !filters.loadType || load.loadType === filters.loadType;
        const weightMatch = load.weight >= filters.weight.min && load.weight <= filters.weight.max;
        const distanceMatch = load.distance >= filters.distance.min && load.distance <= filters.distance.max;
        const budgetMatch = load.budget >= filters.budget.min && load.budget <= filters.budget.max;

        return typeMatch && weightMatch && distanceMatch && budgetMatch;
      });

      setFilteredData(filtered);
    } catch (error) {
      console.error('Error loading data:', error);
      setFilteredData([]);
    }
  };

  // useEffect içinde loadData'yı çağır
  useEffect(() => {
    loadData();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
  };

  const handleOpenOfferModal = (load) => {
    setSelectedLoad(load);
    setShowOfferModal(true);
    // Modal açıldığında form alanlarını sıfırla
    setOfferAmount('');
    setOfferNote('');
  };

  const handleSubmitOffer = () => {
    if (!offerAmount) {
      alert('Lütfen teklif tutarı giriniz');
      return;
    }

    try {
      // Yeni teklif oluştur
      const newOffer = {
        id: Date.now(),
        loadId: selectedLoad.id,
        amount: parseFloat(offerAmount),
        note: offerNote,
        createdAt: new Date().toISOString(),
        status: 'Pending',
        offerer: user?.name || 'Anonim',
        offererId: user?.id,
        loadDetails: {
          loadType: selectedLoad.loadType,
          from: selectedLoad.from,
          to: selectedLoad.to,
          weight: selectedLoad.weight,
          size: selectedLoad.size,
          distance: selectedLoad.distance,
          budget: selectedLoad.budget
        }
      };

      // Mevcut teklifleri güncelle
      const storedOffers = JSON.parse(localStorage.getItem('offers') || '[]');
      localStorage.setItem('offers', JSON.stringify([...storedOffers, newOffer]));

      // Yük ilanının teklif sayısını güncelle
      const storedLoads = JSON.parse(localStorage.getItem('loads') || '[]');
      const updatedLoads = storedLoads.map(load => {
        if (load.id === selectedLoad.id) {
          return {
            ...load,
            offerCount: (load.offerCount || 0) + 1
          };
        }
        return load;
      });
      localStorage.setItem('loads', JSON.stringify(updatedLoads));

      // Modalı kapat ve state'i temizle
      setShowOfferModal(false);
      setSelectedLoad(null);
      setOfferAmount('');
      setOfferNote('');

      // Listeyi yenile
      loadData();
    } catch (error) {
      console.error('Teklif gönderilirken hata oluştu:', error);
      alert('Teklif gönderilirken bir hata oluştu');
    }
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
      {filteredData.length > 0 ? (
        <div className="bg-[#242424] rounded-lg border border-[#333333] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#2a2a2a] border-b border-[#333333]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-blue-400" />
                    <span className="text-gray-400 font-medium text-sm">İlan Sahibi</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <FaBox className="text-blue-400" />
                    <span className="text-gray-400 font-medium text-sm">Yük Tipi</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <FaWeight className="text-blue-400" />
                    <span className="text-gray-400 font-medium text-sm">Boyut/Ağırlık</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <span className="text-gray-400 font-medium text-sm">Rota</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <FaRoad className="text-blue-400" />
                    <span className="text-gray-400 font-medium text-sm">Mesafe</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-center">
                  <div className="flex items-center space-x-2">
                    <FaHandshake className="text-blue-400" />
                    <span className="text-gray-400 font-medium text-sm">Teklifler</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-gray-400 font-medium text-sm">İşlemler</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {filteredData.map((load) => {
                const owner = MOCK_USERS_DETAILED.find(user => user.id === load.createdBy);
                
                return (
                  <tr key={load.id} className="hover:bg-[#2a2a2a] transition-colors">
                    {/* İlan Sahibi */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#333333]">
                          <img 
                            src={owner?.avatar} 
                            alt={owner?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{owner?.name}</p>
                          <p className="text-xs text-gray-400">{owner?.shipperInfo?.companyName}</p>
                        </div>
                      </div>
                    </td>

                    {/* Yük Tipi */}
                    <td className="px-4 py-3">
                      <p className="text-white text-sm">{load.loadType}</p>
                    </td>

                    {/* Boyut/Ağırlık */}
                    <td className="px-4 py-3">
                      <p className="text-white text-sm">{load.size}</p>
                      <p className="text-xs text-gray-400">{load.weight} kg</p>
                    </td>

                    {/* Rota */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div>
                          <p className="text-white text-sm">{load.from}</p>
                          <p className="text-xs text-gray-400">{load.to}</p>
                        </div>
                      </div>
                    </td>

                    {/* Mesafe */}
                    <td className="px-4 py-3">
                      <p className="text-white text-sm">{load.distance} km</p>
                      <p className="text-xs text-gray-400">~{Math.round(load.budget / load.distance)} ₺/km</p>
                    </td>

                    {/* Teklif Sayısı */}
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center space-x-1 bg-blue-900/30 px-2 py-1 rounded">
                        <span className="text-white text-sm">{load.offerCount || 0}</span>
                        <span className="text-xs text-gray-400">teklif</span>
                      </div>
                    </td>

                    {/* İşlemler */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end space-x-3">
                        {/* Fiyat Badge */}
                        <div className="bg-green-900/50 px-3 py-1 rounded-full border border-green-700/50">
                          <span className="text-green-400 text-sm font-medium">{load.budget} ₺</span>
                        </div>

                        {/* Teklif Ver Butonu */}
                        <button
                          onClick={() => handleOpenOfferModal(load)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Teklif Ver
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-[#242424] rounded-lg border border-[#333333]">
          <p className="text-gray-400">Henüz ilan bulunmuyor veya filtrelere uygun ilan yok.</p>
        </div>
      )}

      {/* Teklif Modalı */}
      {showOfferModal && selectedLoad && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#242424] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl text-white mb-4">Teklif Ver</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Teklif Tutarı (₺)</label>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
                  placeholder="Örn: 1500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Not (Opsiyonel)</label>
                <textarea
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
                  placeholder="Teklifiniz hakkında not ekleyin..."
                  rows="3"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  İptal
                </button>
                <button
                  onClick={handleSubmitOffer}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Teklif Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 