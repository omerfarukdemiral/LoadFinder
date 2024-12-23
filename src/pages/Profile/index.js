import { useAuth } from '../../contexts/AuthContext';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Profil</h1>
      <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Ad Soyad</label>
            <p className="text-white">{user?.name || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">E-posta</label>
            <p className="text-white">{user?.email || 'Belirtilmemiş'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};