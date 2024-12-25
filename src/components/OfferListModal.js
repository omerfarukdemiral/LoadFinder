import React from 'react';
import { 
  FaTimes, FaUser, FaMoneyBillWave, FaClock,
  FaCheckCircle, FaTimesCircle, FaComments
} from 'react-icons/fa';

export const OfferListModal = ({ offers, onClose, onAcceptOffer, onRejectOffer }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#242424] rounded-lg w-full max-w-3xl border border-[#333333] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#333333] bg-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <FaComments className="text-2xl text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold text-white">Gelen Teklifler</h3>
              <p className="text-sm text-gray-400">{offers.length} teklif bulundu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2a2a2a] text-gray-400 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Teklif Veren</th>
                  <th className="px-4 py-3 text-left">Teklif Tutarı</th>
                  <th className="px-4 py-3 text-left">Tarih</th>
                  <th className="px-4 py-3 text-left">Durum</th>
                  <th className="px-4 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {offers.map((offer) => (
                  <tr key={offer.id} className="text-sm">
                    {/* Teklif Veren */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FaUser className="text-blue-500" />
                        <span className="text-white">{offer.offerer}</span>
                      </div>
                    </td>

                    {/* Teklif Tutarı */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-500" />
                        <span className="text-white font-medium">₺{offer.amount}</span>
                      </div>
                    </td>

                    {/* Tarih */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-500" />
                        <span className="text-gray-400">
                          {new Date(offer.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </td>

                    {/* Durum */}
                    <td className="px-4 py-3">
                      <span className={`
                        inline-flex px-2 py-1 rounded-full text-xs
                        ${offer.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                          offer.status === 'Accepted' ? 'bg-green-500/20 text-green-500' : 
                          'bg-red-500/20 text-red-500'}
                      `}>
                        {offer.status === 'Pending' ? 'Beklemede' :
                         offer.status === 'Accepted' ? 'Kabul Edildi' : 
                         'Reddedildi'}
                      </span>
                    </td>

                    {/* İşlemler */}
                    <td className="px-4 py-3">
                      {offer.status === 'Pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onRejectOffer(offer)}
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                            title="Teklifi Reddet"
                          >
                            <FaTimesCircle />
                          </button>
                          <button
                            onClick={() => onAcceptOffer(offer)}
                            className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-md transition-colors"
                            title="Teklifi Kabul Et"
                          >
                            <FaCheckCircle />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 