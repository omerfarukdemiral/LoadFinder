import { useState } from 'react';
import { FaBox, FaWeight, FaRoad, FaMoneyBillWave, FaClipboardList, FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const steps = [
  { id: 1, label: '1. Yük Türü', icon: <FaBox className="text-6xl" /> },
  { id: 2, label: '2. Boyut', icon: <FaClipboardList className="text-6xl" /> },
  { id: 3, label: '3. Ağırlık', icon: <FaWeight className="text-6xl" /> },
  { id: 4, label: '4. Taşıma Mesafesi', icon: <FaRoad className="text-6xl" /> },
  { id: 5, label: '5. Bütçe', icon: <FaMoneyBillWave className="text-6xl" /> },
  { id: 6, label: '6. Sonuç', icon: <FaCheckCircle className="text-6xl" /> },
];

export const CreateLoad = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    loadType: 'Konteyner',
    size: '2m x 2m x 2m',
    weight: 1000,
    distance: 500,
    budget: 2000,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleNext = () => {
    const newErrors = {};
    if (currentStep === 0 && !formData.loadType) newErrors.loadType = 'Yük türü zorunludur.';
    if (currentStep === 1 && !formData.size) newErrors.size = 'Boyut zorunludur.';
    if (currentStep === 2 && !formData.weight) newErrors.weight = 'Ağırlık zorunludur.';
    if (currentStep === 3 && !formData.distance) newErrors.distance = 'Taşıma mesafesi zorunludur.';
    if (currentStep === 4 && !formData.budget) newErrors.budget = 'Bütçe zorunludur.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSuccessMessage('İlan başarıyla oluşturuldu!'); // Başarı mesajı
    console.log(formData); // Formu gönderme işlemi
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker text-center">Yük İlanı Oluştur</h1>
        
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md text-center">
            {successMessage}
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
            {currentStep === 0 && (
              <div className="text-center">
                <label className="block text-gray-400 mb-2">Yük Türü</label>
                <input
                  type="text"
                  name="loadType"
                  value={formData.loadType}
                  onChange={handleChange}
                  className={`w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`}
                  placeholder="Örn: Konteyner"
                />
                {errors.loadType && <p className="text-red-500 text-sm">{errors.loadType}</p>}
              </div>
            )}

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

            {currentStep === 3 && (
              <div className="text-center">
                <label className="block text-gray-400 mb-2">Taşıma Mesafesi (km)</label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className={`w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2`}
                  placeholder="Örn: 500"
                />
                {errors.distance && <p className="text-red-500 text-sm">{errors.distance}</p>}
              </div>
            )}

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

            {currentStep === 5 && ( // Sonuç adımı
              <div className="text-center">
                <h2 className="text-lg font-bold text-white">Sonuç</h2>
                <p className="text-gray-300">Yük Türü: {formData.loadType}</p>
                <p className="text-gray-300">Boyut: {formData.size}</p>
                <p className="text-gray-300">Ağırlık: {formData.weight} kg</p>
                <p className="text-gray-300">Taşıma Mesafesi: {formData.distance} km</p>
                <p className="text-gray-300">Bütçe: {formData.budget} ₺</p>
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