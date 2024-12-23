export const LoadOffers = () => {
  const mockOffers = [
    {
      offerId: '#O12345',
      loadId: '#12345',
      offerer: 'Ahmet Yılmaz',
      price: 5000,
      status: 'Beklemede',
    },
    {
      offerId: '#O12346',
      loadId: '#12346',
      offerer: 'Mehmet Demir',
      price: 4500,
      status: 'Kabul Edildi',
    },
    {
      offerId: '#O12347',
      loadId: '#12347',
      offerer: 'Ayşe Kaya',
      price: 6000,
      status: 'Reddedildi',
    },
    {
      offerId: '#O12348',
      loadId: '#12348',
      offerer: 'Fatma Çelik',
      price: 5500,
      status: 'Beklemede',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Gelen Teklifler</h1>
      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <div className="overflow-x-auto">
          <table className="w-full text-[#e0e0e0]">
            <thead>
              <tr className="text-left border-b border-[#333333]">
                <th className="pb-3">Teklif No</th>
                <th className="pb-3">İlan No</th>
                <th className="pb-3">Teklif Veren</th>
                <th className="pb-3">Fiyat</th>
                <th className="pb-3">Durum</th>
                <th className="pb-3">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {mockOffers.map((offer) => (
                <tr key={offer.offerId} className="border-b border-[#333333]">
                  <td className="py-3">{offer.offerId}</td>
                  <td>{offer.loadId}</td>
                  <td>{offer.offerer}</td>
                  <td>₺{offer.price.toLocaleString()}</td>
                  <td>
                    <span className={`bg-${offer.status === 'Beklemede' ? 'yellow' : offer.status === 'Kabul Edildi' ? 'green' : 'red'}-600 text-white px-2 py-1 rounded-full text-xs`}>
                      {offer.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-green-400 hover:text-green-300 mr-2">Kabul Et</button>
                    <button className="text-red-400 hover:text-red-300">Reddet</button>
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