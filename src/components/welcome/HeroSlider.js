import { useState, useEffect } from 'react';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "assets/images/slider1.jpg",
      title: "Yükünüz Güvende",
      description: "Türkiye'nin en güvenilir yük taşıma platformu"
    },
    {
      image: "assets/images/slider2.jpg",
      title: "Hızlı ve Ekonomik",
      description: "Optimize edilmiş rotalar ile maksimum tasarruf"
    },
    {
      image: "assets/images/slider3.jpg",
      title: "7/24 Destek",
      description: "Profesyonel ekibimiz her zaman yanınızda"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative h-[500px] overflow-hidden rounded-lg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 