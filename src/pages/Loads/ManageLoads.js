import React from 'react';

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

export const ManageLoads = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">İlanlarım</h1>
      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <div className="overflow-x-auto">
          <table className="w-full text-[#e0e0e0]">
            <thead>
              <tr className="text-left border-b border-[#333333]">
                <th className="pb-3">İlan No</th>
                <th className="pb-3">Yük Türü</th>
                <th className="pb-3">Boyut</th>
                <th className="pb-3">Ağırlık (kg)</th>
                <th className="pb-3">Taşıma Mesafesi (km)</th>
                <th className="pb-3">Bütçe (₺)</th>
                <th className="pb-3">Durum</th>
                <th className="pb-3">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((load) => (
                <tr key={load.id} className="border-b border-[#333333]">
                  <td className="py-3">{load.id}</td>
                  <td>{load.loadType}</td>
                  <td>{load.size}</td>
                  <td>{load.weight}</td>
                  <td>{load.distance}</td>
                  <td>{load.budget}</td>
                  <td>
                    <span className={`bg-${load.status === 'Aktif' ? 'green' : 'yellow'}-600 text-white px-2 py-1 rounded-full text-xs`}>
                      {load.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-blue-400 hover:text-blue-300 mr-2">Düzenle</button>
                    <button className="text-red-400 hover:text-red-300">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 