
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    title: "Bijoux en Or 18 Carats",
    subtitle: "Collection Exclusive de Haute Qualité",
    description: "Découvrez notre sélection raffinée de bijoux en or 18 carats, alliant tradition et modernité pour sublimer votre élégance.",
    cta: "Découvrir les Bijoux",
    link: "/bijoux",
    image: "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20elegant%20woman%20wearing%20beautiful%2018k%20gold%20earrings%20and%20jewelry%2C%20luxury%20lifestyle%20photography%2C%20sophisticated%20lighting%2C%20modern%20studio%20setting%2C%20high-end%20fashion%20photography%20style%2C%20clean%20background%20with%20warm%20golden%20tones%2C%20confident%20and%20elegant%20pose&width=1200&height=600&seq=hero1pro&orientation=landscape"
  },
  {
    title: "Montres de Marques Prestigieuses",
    subtitle: "Guess • Festina • Tissot • Calvin Klein",
    description: "Explorez notre collection de montres des plus grandes marques internationales, symboles d'excellence et de raffinement.",
    cta: "Voir les Montres",
    link: "/montres",
    image: "https://readdy.ai/api/search-image?query=Professional%20lifestyle%20photography%20of%20elegant%20couple%20wearing%20luxury%20watches%2C%20sophisticated%20man%20and%20woman%20in%20premium%20attire%2C%20both%20displaying%20beautiful%20timepieces%20on%20their%20wrists%2C%20modern%20luxury%20studio%20setting%2C%20high-end%20fashion%20photography%2C%20perfect%20hand%20positioning%2C%20refined%20poses%2C%20premium%20lifestyle%20aesthetic%20with%20warm%20lighting&width=1200&height=600&seq=hero2fixed&orientation=landscape"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isClient) {
    return (
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroSlides[0].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  {heroSlides[0].title}
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-yellow-300 font-medium">
                  {heroSlides[0].subtitle}
                </p>
                <p className="text-lg mb-8 leading-relaxed opacity-90">
                  {heroSlides[0].description}
                </p>
                <Link
                  href={heroSlides[0].link}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  {heroSlides[0].cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-yellow-300 font-medium">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-8 leading-relaxed opacity-90">
                  {slide.description}
                </p>
                <Link
                  href={slide.link}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl"></i>
        </div>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-right-line text-xl"></i>
        </div>
      </button>
    </section>
  );
}
