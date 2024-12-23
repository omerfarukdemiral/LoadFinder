import { FaTruck, FaUserCog, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';

export const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserCog className="text-4xl text-blue-500" />,
      title: "Profil Yönetimi",
      description: "Kişiselleştirilmiş profil yönetimi ile tüm işlemlerinizi tek noktadan kontrol edin"
    },
    {
      icon: <FaTruck className="text-4xl text-blue-500" />,
      title: "Yük Yönetimi",
      description: "Gelişmiş teklif sistemi ile yüklerinizi güvenle taşıyın"
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-blue-500" />,
      title: "Güvenli Ödeme",
      description: "Entegre ödeme sistemleri ile güvenli ve hızlı işlemler"
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-blue-500" />,
      title: "Akıllı Rota",
      description: "Google Maps entegrasyonu ile optimum rota planlaması"
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 