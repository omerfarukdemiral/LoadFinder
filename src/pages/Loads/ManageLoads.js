import React from 'react';
import { FaBox, FaTruck, FaSnowflake, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

const mockData = [
  {
    id: 1,
    loadType: 'Konteyner',
    size: '2m x 2m x 2m',
    weight: 1000,
    distance: 500,
    budget: 2000,
    status: 'Aktif',
  },
  {
    id: 2,
    loadType: 'Kuru Yük',
    size: '3m x 2m x 2m',
    weight: 1500,
    distance: 700,
    budget: 2500,
    status: 'Aktif',
  },
  {
    id: 3,
    loadType: 'Soğuk Yük',
    size: '4m x 2m x 2m',
    weight: 2000,
    distance: 300,
    budget: 3000,
    status: 'Tamamlandı',
  },
  {
    id: 4,
    loadType: 'Tehlikeli Madde',
    size: '2m x 2m x 2m',
    weight: 800,
    distance: 1000,
    budget: 4000,
    status: 'Aktif',
  },
];

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

export const ManageLoads = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">İlanlarım</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.map((load) => (
          <div key={load.id} className="bg-[#242424] rounded-lg p-4 border border-[#333333] shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{load.loadType}</h2>
              {getIcon(load.loadType)}
            </div>
            <div className="text-gray-400 text-center">
              <p>Boyut: {load.size}</p>
              <p>Ağırlık: {load.weight} kg</p>
              <p>Mesafe: {load.distance} km</p>
              <p>Bütçe: ₺{load.budget}</p>
              <span className={`mt-2 inline-block bg-${load.status === 'Aktif' ? 'green' : 'yellow'}-600 text-white px-2 py-1 rounded-full text-xs`}>
                {load.status}
              </span>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Düzenle
              </button>
              <button className="text-red-400 flex items-center">
                <FaTrash className="mr-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 