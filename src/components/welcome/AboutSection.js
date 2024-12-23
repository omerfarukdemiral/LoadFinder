export const AboutSection = () => {
  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 opacity-80"
               style={{
                 backgroundImage: 'url("/images/about-bg.jpg")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundBlendMode: 'overlay'
               }}>
          </div>
          <div className="relative py-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Hakkımızda</h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed px-4">
              YükBul, dijital çağda lojistik süreçlerini yeniden tanımlıyor. 
              Yük göndericiler ve nakliyeciler arasında köprü kurarak, 
              taşımacılık süreçlerini optimize ediyor ve maliyetleri minimize ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 