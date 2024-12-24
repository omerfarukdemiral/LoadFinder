import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OfferStatusTitle = {
  'Pending': 'İşlem Bekliyor',
  'Accepted': 'Kabul Edildi',
  'Rejected': 'Reddedildi',
};

export const LoadOffers = () => {
  const mockOffers = [
    {
      offerId: '#O12345',
      loadId: '#12345',
      offerer: 'Ahmet Yılmaz',
      price: 5000,
      status: 'Pending',
    },
    {
      offerId: '#O12346',
      loadId: '#12346',
      offerer: 'Mehmet Demir',
      price: 4500,
      status: 'Accepted',
    },
    {
      offerId: '#O12347',
      loadId: '#12347',
      offerer: 'Ayşe Kaya',
      price: 6000,
      status: 'Rejected',
    },
    {
      offerId: '#O12348',
      loadId: '#12348',
      offerer: 'Fatma Çelik',
      price: 5500,
      status: 'Pending',
    },
  ];

  const groupedOffers = {
    'Pending': mockOffers.filter(offer => offer.status === 'Pending'),
    'Accepted': mockOffers.filter(offer => offer.status === 'Accepted'),
    'Rejected': mockOffers.filter(offer => offer.status === 'Rejected'),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Gelen Teklifler</h1>

      {Object.keys(groupedOffers).map(status => (
        <div key={status}>
          <h2 className="text-xl font-bold text-white">{OfferStatusTitle[status]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupedOffers[status].map(offer => (
              <div key={offer.offerId} className="bg-[#242424] rounded-lg p-4 border border-[#333333] shadow-md">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{offer.offerer}</h3>
                  <span className={`bg-${offer.status === 'Pending' ? 'yellow' : offer.status === 'Accepted' ? 'green' : 'red'}-600 text-white px-2 py-1 rounded-full text-xs`}>
                    {OfferStatusTitle[offer.status]}
                  </span>
                </div>
                <hr className="my-2 border-gray-600" />
                <div className="text-center text-gray-400">
                  <p>Teklif No: {offer.offerId}</p>
                  <p>İlan No: {offer.loadId}</p>
                  <p className="text-xl font-bold text-white">₺{offer.price.toLocaleString()}</p>
                </div>
                <hr className="my-2 border-gray-600" />
                {offer.status === 'Pending' && (
                  <div className="flex justify-between mt-4 w-11/12 mx-auto">
                    <button className="bg-green-600 text-white rounded-l-full p-2 hover:bg-green-400 transition duration-200 flex items-center justify-center w-full">
                      <FaCheckCircle className="text-white" />
                    </button>
                    <div className="border-l border-gray-600 h-8 mx-2" />
                    <button className="bg-red-600 text-white rounded-r-full p-2 hover:bg-red-400 transition duration-200 flex items-center justify-center w-full">
                      <FaTimesCircle className="text-white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 