import { FaTruck, FaMoneyBillWave, FaBoxes, FaShippingFast } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Maliyetler",
      value: "57,890",
      change: "+4.40%",
      isIncrease: true,
      icon: <FaMoneyBillWave className="text-blue-500" />
    },
    {
      title: "Gelir",
      value: "1,390",
      change: "+32.40%",
      isIncrease: true,
      icon: <FaTruck className="text-green-500" />
    },
    {
      title: "Satışlar",
      value: "12,390",
      change: "+32.40%",
      isIncrease: true,
      icon: <FaBoxes className="text-purple-500" />
    },
    {
      title: "Sevkiyatlar",
      value: "12,390",
      change: "+32.40%",
      isIncrease: true,
      icon: <FaShippingFast className="text-orange-500" />
    }
  ];

  return (
    <div className="space-y-6 font-nunito">
      <h1 className="text-2xl font-bold text-white font-blinker">
        Hoş Geldiniz, {user?.username}
      </h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1 font-blinker">{stat.value}</h3>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className={`mt-2 text-sm ${stat.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Açık Siparişler</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Grafik Alanı
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Sevkiyat Planlaması</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Grafik Alanı
          </div>
        </div>
      </div>
    </div>
  );
}; 