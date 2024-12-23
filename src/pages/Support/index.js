import { useState } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

export const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form verileri:', formData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Destek</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* E-posta Kutusu */}
        <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">E-posta</h2>
              <p className="text-gray-400">destek@example.com</p>
            </div>
          </div>
        </div>

        {/* Telefon Kutusu */}
        <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <FaPhone className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Telefon</h2>
              <p className="text-gray-400">+90 (212) 123 45 67</p>
            </div>
          </div>
        </div>
      </div>

      {/* İletişim Formu */}
      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <h2 className="text-xl font-semibold text-white mb-4">Bize Ulaşın</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Adınız</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              placeholder="Adınızı giriniz"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">E-posta Adresiniz</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              placeholder="E-posta adresinizi giriniz"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Mesajınız</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              placeholder="Mesajınızı yazın"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};