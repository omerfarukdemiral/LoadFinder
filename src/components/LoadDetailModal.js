import React, { useState } from 'react';
import { 
  FaTimes, FaBox, FaMapMarkerAlt, FaRoute, 
  FaWeight, FaCube, FaTruck, FaMoneyBillWave, 
  FaClock, FaClipboardList, FaInfoCircle, 
  FaBuilding, FaPhone, FaEnvelope, FaGlobe, 
  FaStar, FaExclamationTriangle 
} from 'react-icons/fa';
import { withClickOutside } from './withClickOutside';

const LoadDetailModal = ({ load, onClose }) => {
  const [activeTab, setActiveTab] = useState('load');
  
  if (!load) return null;

  // Yük detaylarını ve firma bilgilerini al
  const loadDetails = load.loadDetails || load;  // Eğer loadDetails varsa onu, yoksa direkt load'u kullan
  const shipperInfo = load.shipper || loadDetails.shipper;  // Firma bilgilerini al

  const TabButton = ({ id, icon: Icon, label, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 flex-1 justify-center
        ${active 
          ? 'text-blue-500 border-blue-500' 
          : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-gray-600'
        }`}
    >
      <Icon className={active ? 'text-blue-500' : 'text-gray-500'} />
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-[#242424] rounded-lg w-full max-w-2xl border border-[#333333] overflow-hidden min-h-[400px] max-h-[80vh] flex flex-col">
        {/* Header - Sabit Yükseklik */}
        <div className="flex justify-between items-center p-4 border-b border-[#333333] bg-[#2a2a2a] shrink-0">
          <div className="flex items-center gap-3">
            <FaBox className="text-2xl text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold text-white">Yük Detayları</h3>
              <p className="text-sm text-gray-400">İlan No: {load.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Tabs - Sabit Yükseklik */}
        <div className="flex border-b border-[#333333] shrink-0">
          <TabButton
            id="load"
            icon={FaBox}
            label="Yük Bilgileri"
            active={activeTab === 'load'}
          />
          <TabButton
            id="company"
            icon={FaBuilding}
            label="Firma Bilgileri"
            active={activeTab === 'company'}
          />
        </div>

        {/* Content - Kaydırılabilir Alan */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'load' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaBox className="text-blue-500" />
                      <span className="font-medium">Yük Tipi:</span>
                      <span className="text-white">{loadDetails.loadType}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaMapMarkerAlt className="text-green-500" />
                      <span className="font-medium">Güzergah:</span>
                      <span className="text-white">{loadDetails.from} → {loadDetails.to}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaRoute className="text-purple-500" />
                      <span className="font-medium">Mesafe:</span>
                      <span className="text-white">{loadDetails.distance} km</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaWeight className="text-yellow-500" />
                      <span className="font-medium">Ağırlık:</span>
                      <span className="text-white">{loadDetails.weight} ton</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaCube className="text-orange-500" />
                      <span className="font-medium">Hacim:</span>
                      <span className="text-white">{loadDetails.volume} m³</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaTruck className="text-indigo-500" />
                      <span className="font-medium">Araç Tipi:</span>
                      <span className="text-white">{loadDetails.vehicleType}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaMoneyBillWave className="text-green-500" />
                      <span className="font-medium">Fiyat:</span>
                      <span className="text-white">₺{loadDetails.price}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaClock className="text-red-500" />
                      <span className="font-medium">Son Tarih:</span>
                      <span className="text-white">{loadDetails.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {shipperInfo ? (
                  <>
                    {/* Firma Bilgileri */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#2a2a2a] p-4 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-400">
                          <FaBuilding className="text-blue-500" />
                          <span className="font-medium">Firma:</span>
                          <span className="text-white">{shipperInfo.companyName}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-400">
                          <FaStar className="text-yellow-500" />
                          <span className="font-medium">Değerlendirme:</span>
                          <div className="flex items-center">
                            <span className="text-white">{shipperInfo.rating}</span>
                            <span className="text-yellow-500 ml-1">/5.0</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-400">
                          <FaBox className="text-green-500" />
                          <span className="font-medium">Toplam İlan:</span>
                          <span className="text-white">{shipperInfo.totalLoads}</span>
                        </div>
                      </div>

                      {shipperInfo.contact && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-gray-400">
                            <FaPhone className="text-green-500" />
                            <span className="font-medium">Telefon:</span>
                            <span className="text-white">{shipperInfo.contact.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-gray-400">
                            <FaEnvelope className="text-orange-500" />
                            <span className="font-medium">E-posta:</span>
                            <span className="text-white">{shipperInfo.contact.email}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-gray-400">
                            <FaGlobe className="text-blue-500" />
                            <span className="font-medium">Website:</span>
                            <a 
                              href={`https://${shipperInfo.contact.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {shipperInfo.contact.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Adres Bilgileri */}
                    {shipperInfo.address && (
                      <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-red-500 mt-1" />
                          <div>
                            <span className="font-medium text-gray-400">Firma Adresi:</span>
                            <p className="text-white mt-1">
                              {shipperInfo.address.fullAddress}, 
                              <br className="md:hidden" />
                              {shipperInfo.address.district}/{shipperInfo.address.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4 p-4 bg-[#2a2a2a] rounded-lg">
                    <div className="flex items-center gap-3 text-yellow-500">
                      <FaExclamationTriangle className="text-2xl" />
                      <div>
                        <h4 className="font-semibold">Firma Bilgisi Bulunamadı</h4>
                        <p className="text-gray-400 mt-1">
                          Bu ilan için firma bilgileri henüz sisteme eklenmemiş olabilir veya firma bilgilerini paylaşmak istememiş olabilir.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-[#333333] rounded text-sm text-gray-400">
                      <p>
                        <strong>Not:</strong> Firma bilgilerine erişmek için:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Sisteme giriş yapmanız gerekebilir</li>
                        <li>İlan sahibi ile iletişime geçebilirsiniz</li>
                        <li>Firma bilgileri onay sürecinde olabilir</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withClickOutside(LoadDetailModal);