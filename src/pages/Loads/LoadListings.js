import { useState } from 'react';
import { FaBox, FaTruck, FaSnowflake, FaExclamationTriangle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mock data
const mockData = Array(25).fill(null).map((_, index) => {
  const loadTypes = ['Konteyner', 'Kuru Yük', 'Soğuk Yük', 'Tehlikeli Madde'];
  const sizes = ['2m x 2m x 2m', '3m x 2m x 2m', '4m x 2m x 2m', '5m x 2m x 2m'];
  const weights = [800, 1000, 1500, 2000, 2500, 3000];
  const distances = [300, 500, 700, 1000, 1200, 1500];
  const budgets = [2000, 2500, 3000, 3500, 4000, 4500, 5000];
  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana'];

  return {
    id: index + 1,
    loadType: loadTypes[Math.floor(Math.random() * loadTypes.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    weight: weights[Math.floor(Math.random() * weights.length)],
    distance: distances[Math.floor(Math.random() * distances.length)],
    budget: budgets[Math.floor(Math.random() * budgets.length)],
    from: cities[Math.floor(Math.random() * cities.length)],
    to: cities[Math.floor(Math.random() * cities.length)],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    requirements: ['Sigorta zorunlu', 'Deneyimli şoför', 'GPS takip sistemi'],
    deadline: '2024-03-20',
    status: 'Aktif'
  };
});

const getIcon = (loadType) => {
  switch (loadType) {
    case 'Konteyner':
      return <FaBox className="text-3xl text-blue-500" />;
    case 'Kuru Yük':
      return <FaTruck className="text-3xl text-green-500" />;
    case 'Soğuk Yük':
      return <FaSnowflake className="text-3xl text-cyan-500" />;
    case 'Tehlikeli Madde':
      return <FaExclamationTriangle className="text-3xl text-red-500" />;
    default:
      return null;
  }
};

export const LoadListings = () => {
  const [filters, setFilters] = useState({
    loadType: '',
    weight: { min: 0, max: 3000 },
    distance: { min: 0, max: 1500 },
    budget: { min: 0, max: 5000 }
  });

  const [expandedCard, setExpandedCard] = useState(null);
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    // Filtreleme işlemi
    const filtered = mockData.filter(load => {
      const typeMatch = !newFilters.loadType || load.loadType === newFilters.loadType;
      const weightMatch = load.weight >= newFilters.weight.min && load.weight <= newFilters.weight.max;
      const distanceMatch = load.distance >= newFilters.distance.min && load.distance <= newFilters.distance.max;
      const budgetMatch = load.budget >= newFilters.budget.min && load.budget <= newFilters.budget.max;

      return typeMatch && weightMatch && distanceMatch && budgetMatch;
    });

    setFilteredData(filtered);
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
                max="3000"
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
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200">
                    Teklif Ver
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 