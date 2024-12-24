import { useState } from 'react';
import { FaCog, FaSave } from 'react-icons/fa';

export const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'YükBul Platform',
    maintenance: false,
    notificationsEnabled: true,
    maxFileSize: 5,
    defaultCurrency: 'TRY',
    language: 'tr',
    theme: 'dark'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ayarlar güncellendi:', settings);
    // API çağrısı yapılacak
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker flex items-center gap-2">
        <FaCog />
        Sistem Ayarları
      </h1>

      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site Adı */}
            <div>
              <label className="block text-gray-400 mb-2">Site Adı</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              />
            </div>

            {/* Varsayılan Para Birimi */}
            <div>
              <label className="block text-gray-400 mb-2">Para Birimi</label>
              <select
                name="defaultCurrency"
                value={settings.defaultCurrency}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              >
                <option value="TRY">Türk Lirası (TRY)</option>
                <option value="USD">Amerikan Doları (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>

            {/* Maksimum Dosya Boyutu */}
            <div>
              <label className="block text-gray-400 mb-2">Maksimum Dosya Boyutu (MB)</label>
              <input
                type="number"
                name="maxFileSize"
                value={settings.maxFileSize}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              />
            </div>

            {/* Dil Seçimi */}
            <div>
              <label className="block text-gray-400 mb-2">Sistem Dili</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* Toggle Seçenekleri */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg">
              <div>
                <h3 className="text-white font-semibold">Bakım Modu</h3>
                <p className="text-gray-400 text-sm">Site bakım moduna alınsın mı?</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="maintenance"
                  checked={settings.maintenance}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg">
              <div>
                <h3 className="text-white font-semibold">Bildirimler</h3>
                <p className="text-gray-400 text-sm">Sistem bildirimleri aktif edilsin mi?</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notificationsEnabled"
                  checked={settings.notificationsEnabled}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaSave />
              Ayarları Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 