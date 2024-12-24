import React from 'react';
import { 
  FaTimes, FaBox, FaMapMarkerAlt, FaMoneyBillWave, 
  FaTruck, FaWeight, FaCube, FaRoute, FaClock,
  FaCheckCircle, FaTimesCircle, FaUser, FaFileAlt
} from 'react-icons/fa';
import { withClickOutside } from './withClickOutside';

const OfferDetailModal = ({ offer, onClose, onAccept, onReject }) => {
  const handleAccept = () => {
    // mockData'daki status'u güncelle
    const updatedOffer = { ...offer, status: 'Accepted' };
    onAccept(updatedOffer);
  };

  const handleReject = () => {
    // mockData'daki status'u güncelle
    const updatedOffer = { ...offer, status: 'Rejected' };
    onReject(updatedOffer);
  };

  return (
    <div className="bg-[#242424] rounded-lg w-full max-w-2xl border border-[#333333] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#333333] bg-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <FaFileAlt className="text-2xl text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold text-white">Teklif Detayları</h3>
            <p className="text-sm text-gray-400">Teklif No: {offer.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Teklif Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <FaUser className="text-blue-500" />
              <span className="font-medium">Teklif Veren:</span>
              <span className="text-white">{offer.offerer}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <FaMoneyBillWave className="text-green-500" />
              <span className="font-medium">Teklif Tutarı:</span>
              <span className="text-white">₺{offer.price}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <FaBox className="text-orange-500" />
              <span className="font-medium">Yük Tipi:</span>
              <span className="text-white">{offer.loadType}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="font-medium">Güzergah:</span>
              <span className="text-white">{offer.from} → {offer.to}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <FaRoute className="text-purple-500" />
              <span className="font-medium">Mesafe:</span>
              <span className="text-white">{offer.distance} km</span>
            </div>
            {offer.loadDetails && (
              <>
                <div className="flex items-center gap-3 text-gray-400">
                  <FaWeight className="text-yellow-500" />
                  <span className="font-medium">Ağırlık:</span>
                  <span className="text-white">{offer.loadDetails.weight} kg</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FaCube className="text-indigo-500" />
                  <span className="font-medium">Hacim:</span>
                  <span className="text-white">{offer.loadDetails.volume} m³</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FaTruck className="text-blue-500" />
                  <span className="font-medium">Araç Tipi:</span>
                  <span className="text-white">{offer.loadDetails.vehicleType}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Teklif Notu */}
        {offer.note && (
          <div className="border-t border-[#333333] pt-4">
            <p className="text-gray-400">
              <strong>Not:</strong> {offer.note}
            </p>
          </div>
        )}
      </div>

      {/* Footer - Sadece bekleyen teklifler için */}
      {offer.status === 'Pending' && (
        <div className="border-t border-[#333333] p-4 bg-[#2a2a2a] flex justify-end gap-4">
          <button
            onClick={handleReject}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <FaTimesCircle />
            Reddet
          </button>
          <button
            onClick={handleAccept}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FaCheckCircle />
            Kabul Et
          </button>
        </div>
      )}
    </div>
  );
};

export default withClickOutside(OfferDetailModal); 