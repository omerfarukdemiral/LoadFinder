import { useState } from 'react';
import { FaSave } from 'react-icons/fa';

export const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Şifreniz başarıyla güncellendi!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Şifre Değiştirme</h1>

      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Mevcut Şifre</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Yeni Şifre</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-[#333333] text-[#e0e0e0] rounded-md p-2"
              />
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" /> Şifreyi Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 