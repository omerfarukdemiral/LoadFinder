import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBox, FaWeight, FaRoad, FaMoneyBillWave, FaClipboardList, FaArrowLeft, FaArrowRight, FaCheckCircle, FaEye, FaBoxOpen, FaSnowflake, FaTruck, FaWarehouse, FaIndustry, FaCarSide, FaShip, FaQuestionCircle, FaCalculator, FaCube, FaMapMarkerAlt } from 'react-icons/fa';
import { LOAD_TYPES } from '../../constants/mockData';
import AutocompleteInput from '../../components/AutocompleteInput';

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

export const CreateLoad = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    loadType: '',
    otherLoadType: '',
    size: '2m x 2m x 2m',
    weight: 1000,
    distance: 500,
    budget: 2000,
    from: '',
    to: '',
    createdBy: user?.id || '',
    createdAt: new Date(),
    status: 'Pending'
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  // Form hataları için state
  const [errors, setErrors] = useState({});

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  useEffect(() => {
    // Google Maps API'sini yükle
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDotmN9h8wYbJp7eWkXda6yZkRyuV9t_nM&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // selectedFrom veya selectedTo değiştiğinde mesafeyi otomatik hesapla
  useEffect(() => {
    if (selectedFrom && selectedTo) {
      calculateDistance();
    }
  }, [selectedFrom, selectedTo]);

  const calculateDistance = async () => {
    if (!selectedFrom || !selectedTo) return;

    const service = new window.google.maps.DistanceMatrixService();
    
    try {
      const response = await new Promise((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [selectedFrom.description],
          destinations: [selectedTo.description],
          travelMode: 'DRIVING',
        }, (response, status) => {
          if (status === 'OK') resolve(response);
          else reject(status);
        });
      });

      const distance = response.rows[0].elements[0].distance.value / 1000;
      
      // Sadece şehir ve ülke bilgisini al
      const fromParts = selectedFrom.description.split(',');
      const toParts = selectedTo.description.split(',');
      const fromLocation = `${fromParts[0]}, ${fromParts[fromParts.length - 1].trim()}`;
      const toLocation = `${toParts[0]}, ${toParts[toParts.length - 1].trim()}`;
      
      setFormData(prev => ({
        ...prev,
        from: fromLocation,
        to: toLocation,
        distance: Math.round(distance)
      }));

    } catch (error) {
      console.error('Mesafe hesaplanırken hata oluştu:', error);
    }
  };

  // Form adımları
  const steps = [
    { id: 'type', label: 'Yük Türü', icon: <FaBox /> },
    { id: 'size', label: 'Boyut', icon: <FaWeight /> },
    { id: 'weight', label: 'Ağırlık', icon: <FaWeight /> },
    { id: 'distance', label: 'Mesafe', icon: <FaRoad /> },
    { id: 'budget', label: 'Bütçe', icon: <FaMoneyBillWave /> },
    { id: 'summary', label: 'Özet', icon: <FaClipboardList /> }
  ];

  // Form değişikliklerini handle et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hata varsa temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Sonraki adıma geç
  const handleNext = () => {
    // Form validasyonu
    const currentField = steps[currentStep].id;
    if (!validateField(currentField)) return;

    setCurrentStep(prev => prev + 1);
  };

  // Önceki adıma dön
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Alan validasyonu
  const validateField = (fieldName) => {
    const newErrors = {};

    switch (fieldName) {
      case 'type':
        if (!formData.loadType) {
          newErrors.loadType = 'Yük türü seçiniz';
        }
        break;
      case 'size':
        if (!formData.size) {
          newErrors.size = 'Boyut giriniz';
        }
        break;
      case 'weight':
        if (!formData.weight || formData.weight <= 0) {
          newErrors.weight = 'Geçerli bir ağırlık giriniz';
        }
        break;
      case 'distance':
        if (!formData.distance || formData.distance <= 0) {
          newErrors.distance = 'Geçerli bir mesafe giriniz';
        }
        break;
      case 'budget':
        if (!formData.budget || formData.budget <= 0) {
          newErrors.budget = 'Geçerli bir bütçe giriniz';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Yük türü seçimi için render fonksiyonu
  const renderLoadTypeSelection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {LOAD_TYPES.map((type) => {
        const Icon = LOAD_TYPE_ICONS[type] || FaBox;
        return (
          <div 
            key={type} 
            className={`
              flex items-center p-3 space-x-3 rounded-lg border cursor-pointer
              transition-colors duration-200
              ${formData?.loadType === type 
                ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                : 'border-[#333333] hover:border-blue-500 hover:bg-[#2a2a2a]'}
            `}
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                loadType: type,
                otherLoadType: ''
              }));
            }}
          >
            <input
              type="radio"
              id={type}
              name="loadType"
              value={type}
              checked={formData?.loadType === type}
              onChange={() => {}} 
              className="form-radio text-blue-600"
            />
            <Icon className={`text-xl ${formData?.loadType === type ? 'text-blue-500' : 'text-gray-400'}`} />
            <label 
              htmlFor={type} 
              className={`flex-1 cursor-pointer ${formData?.loadType === type ? 'text-blue-500' : 'text-gray-300'}`}
            >
              {type}
            </label>
          </div>
        );
      })}
      
      {formData?.loadType === 'Diğer' && (
        <div className="col-span-full mt-2">
          <input
            type="text"
            value={formData.otherLoadType || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, otherLoadType: e.target.value }))}
            className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
            placeholder="Yük türünü belirtiniz"
          />
        </div>
      )}
    </div>
  );

  const handleSubmit = () => {
    // Yeni yük ilanı oluştur
    const newLoad = {
      ...formData,
      id: `L${String(Date.now()).slice(-5)}`, // Son 5 haneyi al
      createdBy: user.id, // Aktif kullanıcının ID'si
      createdAt: new Date().toISOString(),
      status: 'Pending',
      offerCount: 0,
      offers: []
    };

    // Mock data'yı güncelle
    if (typeof window !== 'undefined') {
      const currentLoads = JSON.parse(localStorage.getItem('loads') || '[]');
      localStorage.setItem('loads', JSON.stringify([...currentLoads, newLoad]));
    }

    // Başarı mesajını göster
    setShowSuccess(true);
  };

  const renderDistanceStep = () => (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div>
        <label className="block text-gray-400 mb-2">Nereden</label>
        <AutocompleteInput
          value={fromLocation}
          onChange={setFromLocation}
          onSelect={setSelectedFrom}
          placeholder="Şehir ara..."
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-2">Nereye</label>
        <AutocompleteInput
          value={toLocation}
          onChange={setToLocation}
          onSelect={setSelectedTo}
          placeholder="Şehir ara..."
        />
      </div>

      {formData.distance > 0 && (
        <div className="text-center p-4 bg-[#2a2a2a] rounded-lg border border-[#333333]">
          <p className="text-gray-400">Toplam Mesafe:</p>
          <p className="text-2xl font-bold text-white">{formData.distance} km</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker text-center">Yük İlanı Oluştur</h1>
        
        {showSuccess && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#242424] p-6 rounded-lg text-center space-y-4 relative">
              <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
              <h2 className="text-xl text-white">İlan başarıyla oluşturuldu!</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    navigate('/dashboard/loads/manage');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaEye /> İlanlarımı Görüntüle
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
          <div className="mb-4">
            <div className="flex justify-center mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex-1 text-center ${index <= currentStep ? 'text-blue-500' : 'text-gray-400'}`}>
                  <div className="flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-gray-600">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            {currentStep === 0 && renderLoadTypeSelection()}

            {currentStep === 1 && (
              <div className="text-center">
                <label className="block text-gray-400 mb-2">Boyut</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`}
                  placeholder="Örn: 2m x 2m x 2m"
                />
                {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center">
                <label className="block text-gray-400 mb-2">Ağırlık (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`}
                  placeholder="Örn: 1000"
                />
                {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
              </div>
            )}

            {currentStep === 3 && renderDistanceStep()}

            {currentStep === 4 && (
              <div className="text-center">
                <label className="block text-gray-400 mb-2">Bütçe (₺)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`}
                  placeholder="Örn: 2000"
                />
                {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
              </div>
            )}

            {currentStep === 5 && (
              <div className="w-full max-w-lg mx-auto bg-[#2a2a2a] rounded-lg border border-[#333333] p-6">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Yük İlanı Özeti</h2>
                
                <div className="space-y-6">
                  {/* Yük Tipi */}
                  <div className="flex items-center justify-between p-3 bg-[#242424] rounded-lg">
                    <div className="flex items-center gap-3">
                      {React.createElement(LOAD_TYPE_ICONS[formData.loadType] || FaBox, {
                        className: "text-2xl text-blue-500"
                      })}
                      <div>
                        <p className="text-gray-400 text-sm">Yük Türü</p>
                        <p className="text-white font-medium">{formData.loadType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Boyut ve Ağırlık */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[#242424] rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaCube className="text-blue-500" />
                        <div>
                          <p className="text-gray-400 text-sm">Boyut</p>
                          <p className="text-white font-medium">{formData.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#242424] rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaWeight className="text-blue-500" />
                        <div>
                          <p className="text-gray-400 text-sm">Ağırlık</p>
                          <p className="text-white font-medium">{formData.weight} kg</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rota Bilgisi */}
                  <div className="p-4 bg-[#242424] rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <p className="text-gray-400">Rota Bilgisi</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-500"></div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">Nereden</p>
                          <p className="text-white font-medium">{formData.from}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Nereye</p>
                          <p className="text-white font-medium">{formData.to}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#333333]">
                      <div className="flex items-center gap-2">
                        <FaRoad className="text-blue-500" />
                        <div>
                          <p className="text-gray-400 text-sm">Toplam Mesafe</p>
                          <p className="text-white font-medium">{formData.distance} km</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bütçe */}
                  <div className="p-4 bg-[#242424] rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-500" />
                        <div>
                          <p className="text-gray-400 text-sm">Bütçe</p>
                          <p className="text-white font-medium">{formData.budget} ₺</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">~{Math.round(formData.budget / formData.distance)} ₺/km</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Geri
              </button>
            )}
            
            {currentStep < 4 ? ( // İlk 4 adım için "İleri" butonu
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center ml-4"
              >
                İleri <FaArrowRight className="ml-2" />
              </button>
            ) : currentStep === 4 ? ( // 5. adım için "Sonuç" butonu
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center ml-4"
              >
                Sonuç <FaArrowRight className="ml-2" />
              </button>
            ) : ( // Son adım için "Gönder" butonu
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center ml-4"
              >
                Gönder <FaArrowRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};