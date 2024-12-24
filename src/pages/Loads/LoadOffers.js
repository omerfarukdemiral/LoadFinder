import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaSearch, FaTimesCircle, FaMapMarkerAlt, 
  FaMoneyBillWave 
} from 'react-icons/fa';
import { MOCK_INCOMING_OFFERS } from '../../constants/mockData';
import OfferDetailModal from '../../components/OfferDetailModal';
import AlertModal from '../../components/AlertModal';

export const LoadOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [offerToReject, setOfferToReject] = useState(null);

  // Filtreleme butonları için data
  const filterButtons = [
    { id: 'all', label: 'Tümü', count: offers.length },
    { 
      id: 'Pending', 
      label: 'Beklemede', 
      count: offers.filter(o => o.status === 'Pending').length,
      color: 'bg-yellow-600' 
    },
    { 
      id: 'Accepted', 
      label: 'Kabul Edildi', 
      count: offers.filter(o => o.status === 'Accepted').length,
      color: 'bg-green-600' 
    },
    { 
      id: 'Rejected', 
      label: 'Reddedildi', 
      count: offers.filter(o => o.status === 'Rejected').length,
      color: 'bg-red-600' 
    }
  ];

  // Filtrelenmiş teklifler
  const filteredOffers = offers.filter(offer => {
    if (selectedFilter === 'all') return true;
    return offer.status === selectedFilter;
  });

  useEffect(() => {
    const storedLoads = JSON.parse(localStorage.getItem('loads') || '[]');
    const allOffers = [...MOCK_INCOMING_OFFERS, ...storedLoads]
      .filter(offer => offer?.createdBy === user?.id)
      .map(offer => ({
        ...offer,
        loadDetails: {
          loadType: offer.loadType || 'Belirtilmemiş',
          from: offer.from || 'Belirtilmemiş',
          to: offer.to || 'Belirtilmemiş'
        }
      }));
    
    setOffers(allOffers);
  }, [user]);

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  const handleRejectClick = (offer) => {
    setOfferToReject(offer);
    setShowAlertModal(true);
  };

  const handleRejectConfirm = () => {
    if (offerToReject) {
      const updatedOffers = offers.map(offer => 
        offer.offerId === offerToReject.offerId 
          ? { ...offer, status: 'Rejected' } 
          : offer
      );
      setOffers(updatedOffers);
      setShowAlertModal(false);
      setOfferToReject(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold text-[#e0e0e0] font-blinker">
          Gelen Teklifler
        </h1>

        <div className="flex flex-wrap gap-2">
          {filterButtons.map(button => (
            <button
              key={button.id}
              onClick={() => setSelectedFilter(button.id)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium 
                transition-colors border border-[#333333]
                ${selectedFilter === button.id 
                  ? button.id === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : `${button.color} text-white border-transparent`
                  : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'}
              `}
            >
              {button.label}
              <span className={`
                inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs
                ${selectedFilter === button.id
                  ? 'bg-black bg-opacity-20 text-white'
                  : 'bg-[#333333] text-gray-400'}
              `}>
                {button.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#242424] rounded-lg border border-[#333333]">
        <div className="overflow-x-auto">
          <table className="min-w-full whitespace-nowrap">
            <thead className="bg-[#2a2a2a] text-sm">
              <tr>
                <th className="px-3 py-2 text-left text-gray-400">Teklif No</th>
                <th className="px-3 py-2 text-left text-gray-400">İlan ID</th>
                <th className="px-3 py-2 text-left text-gray-400">Teklif Veren</th>
                <th className="px-3 py-2 text-left text-gray-400">Yük Tipi</th>
                <th className="px-3 py-2 text-left text-gray-400">Güzergah</th>
                <th className="px-3 py-2 text-left text-gray-400">Teklif</th>
                <th className="px-3 py-2 text-left text-gray-400">Durum</th>
                <th className="px-3 py-2 text-center text-gray-400">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333] text-sm">
              {filteredOffers.map((offer) => (
                <tr key={offer.offerId} className="hover:bg-[#2a2a2a]">
                  <td className="px-3 py-2 text-gray-300">{offer.offerId}</td>
                  <td className="px-3 py-2 text-gray-300">{offer.loadId}</td>
                  <td className="px-3 py-2 text-gray-300">{offer.offerer}</td>
                  <td className="px-3 py-2 text-gray-300">
                    {offer.loadDetails?.loadType || 'Belirtilmemiş'}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 text-gray-300">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                      <span>
                        {offer.loadDetails?.from || 'Belirtilmemiş'} → {offer.loadDetails?.to || 'Belirtilmemiş'}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 text-green-500">
                      <FaMoneyBillWave className="text-sm" />
                      <span>{offer.price} ₺</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`
                      inline-flex px-2 py-1 rounded-full text-xs
                      ${offer.status === 'Pending' ? 'bg-yellow-600' : 
                        offer.status === 'Accepted' ? 'bg-green-600' : 'bg-red-600'} 
                      text-white`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOfferClick(offer)}
                        className="text-white hover:text-blue-400 transition-colors p-1.5 bg-[#3a3a3a] rounded-md"
                        title="Detayları Görüntüle"
                      >
                        <FaSearch className="text-sm" />
                      </button>
                      {offer.status === 'Pending' && (
                        <button
                          onClick={() => handleRejectClick(offer)}
                          className="text-white hover:text-red-400 transition-colors p-1.5 bg-[#3a3a3a] rounded-md"
                          title="Teklifi Reddet"
                        >
                          <FaTimesCircle className="text-sm" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedOffer && (
        <OfferDetailModal 
          offer={selectedOffer}
          onClose={handleCloseModal}
        />
      )}

      {showAlertModal && (
        <AlertModal
          title="Teklifi Reddet"
          message="Bu teklifi reddetmek istediğinize emin misiniz? Bu işlem geri alınamaz."
          onConfirm={handleRejectConfirm}
          onCancel={() => {
            setShowAlertModal(false);
            setOfferToReject(null);
          }}
        />
      )}
    </div>
  );
}; 