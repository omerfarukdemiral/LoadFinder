export const AboutSection = () => {
  return (
    <div className="py-2">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0opacity-80"
               style={{
                 backgroundImage: 'url("SEÇİLEN_GÖRSEL_URL")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundBlendMode: 'overlay'
               }}>
          </div>
          <div className="relative py-10 text-center text-white">
            <p className="text-lg max-w-2xl mx-auto leading-relaxed px-4">
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