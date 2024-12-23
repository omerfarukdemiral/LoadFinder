import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaHistory, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Mock teklif verisi (gerçek uygulamada location.state'den gelecek)
  const offer = {
    id: 1,
    amount: 2500,
    description: 'İstanbul - Ankara Taşıma Hizmeti',
    date: '2024-03-20'
  };

  // Ödeme geçmişini yükle
  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      // API'den ödeme geçmişi çekilecek
      const mockHistory = [
        {
          id: 1,
          date: '2024-03-15',
          amount: 1500,
          status: 'completed',
          description: 'İstanbul - Ankara taşıma',
        },
        {
          id: 2,
          date: '2024-03-10',
          amount: 2000,
          status: 'completed',
          description: 'İzmir - Antalya taşıma',
        },
      ];
      setPaymentHistory(mockHistory);
    } catch (error) {
      console.error('Ödeme geçmişi yüklenirken hata:', error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Stripe ödeme işlemi simülasyonu
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus('success');
      // Başarılı ödeme sonrası yönlendirme
      setTimeout(() => {
        navigate('/dashboard/loads/manage');
      }, 3000);
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#e0e0e0] font-blinker">Ödeme İşlemleri</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Sütun - Ödeme Geçmişi */}
        <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaHistory className="mr-2" />
            Ödeme Geçmişi
          </h2>
          
          {paymentHistory.length > 0 ? (
            <div className="space-y-4">
              {paymentHistory.map(payment => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-4 bg-[#2a2a2a] rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="text-white">{payment.description}</div>
                    <div className="text-sm text-gray-400">{payment.date}</div>
                  </div>
                  <div className="text-white font-semibold">{payment.amount} ₺</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">
              Henüz ödeme işlemi bulunmamaktadır.
            </div>
          )}
        </div>

        {/* Sağ Sütun - Ödeme Detayları */}
        <div className="bg-[#242424] rounded-lg p-6 border border-[#333333]">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FaCreditCard className="mr-2" />
            Ödeme Detayları
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#2a2a2a] rounded-lg">
              <span className="text-gray-400">Taşıma Ücreti:</span>
              <span className="text-white font-semibold">{offer.amount} ₺</span>
            </div>
            
            {/* Stripe Ödeme Formu */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Kart Numarası</label>
                <input
                  type="text"
                  className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Son Kullanma Tarihi</label>
                  <input
                    type="text"
                    className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">CVC</label>
                  <input
                    type="text"
                    className="w-full bg-[#2a2a2a] border border-[#333333] text-white rounded-md p-2"
                    placeholder="123"
                  />
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-md text-white transition-colors ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <FaCreditCard />
                <span>{loading ? 'İşleniyor...' : 'Ödemeyi Tamamla'}</span>
              </button>
            </div>
          </div>

          {/* Ödeme Durumu Mesajları */}
          {paymentStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/50 rounded-md flex items-center space-x-2 text-green-500">
              <FaCheckCircle />
              <span>Ödeme başarıyla tamamlandı! Yönlendiriliyorsunuz...</span>
            </div>
          )}
          
          {paymentStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-md flex items-center space-x-2 text-red-500">
              <FaTimesCircle />
              <span>Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 