import { useState, useEffect } from 'react';
import { 
  FaEye, FaMapMarkerAlt, FaMoneyBillWave, FaSearch, FaTimes 
} from 'react-icons/fa';
import { MOCK_DRIVER_OFFERS } from '../../../constants/mockData';
import OfferDetailModal from '../../../components/OfferDetailModal';
import LoadDetailModal from '../../../components/LoadDetailModal';
import AlertModal from '../../../components/AlertModal';

export const DriverOffers = () => {
  const [offers, setOffers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' veya 'desc'
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [offerToReject, setOfferToReject] = useState(null);

  useEffect(() => {
    const storedOffers = JSON.parse(localStorage.getItem('driverOffers') || '[]');
    const allOffers = [...MOCK_DRIVER_OFFERS, ...storedOffers];
    
    // Tarihe göre sırala
    const sortedOffers = allOffers.sort((a, b) => {
      const dateA = new Date(a.createdAt || Date.now());
      const dateB = new Date(b.createdAt || Date.now());
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    setOffers(sortedOffers);
  }, [sortOrder]);

  const filterButtons = [
    { id: 'all', label: 'Tümü', count: offers.length },
    { 
      id: 'pending', 
      label: 'Beklemede', 
      count: offers.filter(o => o.status === 'pending').length,
      color: 'bg-yellow-600' 
    },
    { 
      id: 'accepted', 
      label: 'Kabul Edildi', 
      count: offers.filter(o => o.status === 'accepted').length,
      color: 'bg-green-600' 
    },
    { 
      id: 'rejected', 
      label: 'Reddedildi', 
      count: offers.filter(o => o.status === 'rejected').length,
      color: 'bg-red-600' 
    }
  ];

  const filteredOffers = offers.filter(offer => {
    if (selectedFilter === 'all') return true;
    return offer.status === selectedFilter;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-600',
      accepted: 'bg-green-600',
      rejected: 'bg-red-600'
    };

    const labels = {
      pending: 'Beklemede',
      accepted: 'Kabul Edildi',
      rejected: 'Reddedildi'
    };

    return (
      <span className={`${badges[status]} text-white text-xs px-2 py-1 rounded-full inline-flex items-center justify-center min-w-[90px]`}>
        {labels[status]}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const handleRejectClick = (offer) => {
    setOfferToReject(offer);
    setShowAlertModal(true);
  };

  const handleRejectConfirm = () => {
    if (offerToReject) {
      const updatedOffers = offers.map(offer => 
        offer.id === offerToReject.id 
          ? { ...offer, status: 'rejected' } 
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
          Tekliflerim
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
                <th className="px-3 py-2 text-left text-gray-400">ID</th>
                <th className="px-3 py-2 text-left text-gray-400">İlan ID</th>
                <th className="px-3 py-2 text-left text-gray-400">Yük Tipi</th>
                <th className="px-3 py-2 text-left text-gray-400">Güzergah</th>
                <th className="px-3 py-2 text-left text-gray-400">Mesafe</th>
                <th className="px-3 py-2 text-left text-gray-400">Teklif</th>
                <th className="px-3 py-2 text-left text-gray-400">Durum</th>
                <th className="px-3 py-2 text-left text-gray-400">Tarih</th>
                <th className="px-3 py-2 text-left text-gray-400">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333] text-sm">
              {filteredOffers.map(offer => (
                <tr key={offer.id} className="hover:bg-[#2a2a2a]">
                  <td className="px-3 py-2 text-gray-300">#{offer.id}</td>
                  <td className="px-3 py-2">
                    <button 
                      onClick={() => {
                        setSelectedLoad(offer);
                        setShowLoadModal(true);
                      }}
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-400"
                    >
                      #{offer.loadId}
                      <FaEye className="text-sm" />
                    </button>
                  </td>
                  <td className="px-3 py-2 text-gray-300">{offer.loadType}</td>
                  <td className="px-3 py-2 text-gray-300">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                      <span className="truncate max-w-[150px]">
                        {offer.from} → {offer.to}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-300">{offer.distance} km</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 text-green-500">
                      <FaMoneyBillWave className="text-sm" />
                      {offer.price} ₺
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`
                      ${offer.status === 'pending' ? 'bg-yellow-600' : 
                        offer.status === 'accepted' ? 'bg-green-600' : 'bg-red-600'} 
                      text-white text-xs px-2 py-0.5 rounded-full`}>
                      {getStatusBadge(offer.status)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-300 text-sm">{formatDate(offer.createdAt)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOffer(offer);
                          setShowOfferModal(true);
                        }}
                        className="text-white hover:text-blue-400 transition-colors p-1.5 bg-[#3a3a3a] rounded-md"
                        title="Detayları Görüntüle"
                      >
                        <FaSearch className="text-sm" />
                      </button>
                      {offer.status === 'pending' && (
                        <button
                          onClick={() => handleRejectClick(offer)}
                          className="text-white hover:text-red-400 transition-colors p-1.5 bg-[#3a3a3a] rounded-md"
                          title="Teklifi Reddet"
                        >
                          <FaTimes className="text-sm" />
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

      {showOfferModal && selectedOffer && (
        <OfferDetailModal 
          offer={selectedOffer} 
          onClose={() => {
            setShowOfferModal(false);
            setSelectedOffer(null);
          }}
        />
      )}

      {showLoadModal && selectedLoad && (
        <LoadDetailModal 
          load={selectedLoad} 
          onClose={() => {
            setShowLoadModal(false);
            setSelectedLoad(null);
          }}
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