import { useState, useEffect } from 'react';
import { 
  FaBox, FaTruck, FaSnowflake, FaWarehouse, FaIndustry, 
  FaCarSide, FaShip, FaTrash, FaEdit, FaMapMarkerAlt,
  FaWeight, FaCube, FaMoneyBillWave, FaClock, FaChevronDown,
  FaChevronUp, FaComments, FaEye, FaBoxOpen, FaQuestionCircle
} from 'react-icons/fa';
import OfferDetailModal from '../../components/OfferDetailModal';

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

export const ManageLoads = () => {
  const [loads, setLoads] = useState([]);
  const [expandedLoad, setExpandedLoad] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    const storedLoads = JSON.parse(localStorage.getItem('loads') || '[]');
    const storedOffers = JSON.parse(localStorage.getItem('offers') || '[]');
    
    // Her yük için teklif sayısını hesapla
    const loadsWithOffers = storedLoads.map(load => ({
      ...load,
      offers: storedOffers.filter(offer => offer.loadId === load.id),
      offerCount: storedOffers.filter(offer => offer.loadId === load.id).length
    }));
    
    setLoads(loadsWithOffers);
  }, []);

  const handleExpandLoad = (loadId) => {
    setExpandedLoad(expandedLoad === loadId ? null : loadId);
  };

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
  };

  const getIcon = (loadType) => {
    const Icon = LOAD_TYPE_ICONS[loadType] || FaBox;
    return <Icon className="text-2xl" />;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">İlanlarım</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loads.map((load) => (
          <div 
            key={load.id} 
            className="bg-[#242424] rounded-lg overflow-hidden border border-[#333333] hover:border-blue-500 transition-colors duration-200"
          >
            {/* Header */}
            <div className="bg-[#2a2a2a] p-4 border-b border-[#333333]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-lg
                    ${load.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                      load.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                      'bg-red-500/10 text-red-500'}
                  `}>
                    {getIcon(load.loadType)}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{load.loadType}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${load.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                          load.status === 'Active' ? 'bg-green-500/20 text-green-500' : 
                          'bg-red-500/20 text-red-500'}
                      `}>
                        {load.status}
                      </span>
                      {load.offerCount > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500">
                          {load.offerCount} Teklif
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">₺{load.budget}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaWeight className="text-white" />
                  <span>{load.weight} kg</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCube className="text-white" />
                  <span>{load.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <FaMapMarkerAlt className="text-white" />
                <span className="truncate">
                  {load.from} → {load.to}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-2">
                  <FaClock className="text-white" />
                  <span>{new Date(load.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-white" />
                  <span>{load.distance} km</span>
                </div>
              </div>

              {/* Teklifler Bölümü */}
              {load.offerCount > 0 && (
                <button
                  onClick={() => handleExpandLoad(load.id)}
                  className="w-full mt-2 flex items-center justify-center gap-2 text-blue-500 hover:text-blue-400 transition-colors py-2 border-t border-[#333333]"
                >
                  <FaComments />
                  <span>Teklifleri Görüntüle</span>
                  {expandedLoad === load.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              )}

              {/* Genişletilmiş Teklif Listesi */}
              {expandedLoad === load.id && (
                <div className="border-t border-[#333333] pt-4 space-y-3">
                  {load.offers.map((offer) => (
                    <div key={offer.id} className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{offer.offerer}</div>
                        <div className="text-green-500">₺{offer.price}</div>
                      </div>
                      <button
                        onClick={() => handleViewOffer(offer)}
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <FaEye />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#2a2a2a] p-4 border-t border-[#333333] flex justify-between items-center">
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors">
                <FaEdit />
                <span>Düzenle</span>
              </button>
              <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
                <FaTrash />
                <span>Sil</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Teklif Detay Modalı */}
      {showOfferModal && selectedOffer && (
        <OfferDetailModal
          offer={selectedOffer}
          onClose={() => {
            setShowOfferModal(false);
            setSelectedOffer(null);
          }}
        />
      )}
    </div>
  );
}; 