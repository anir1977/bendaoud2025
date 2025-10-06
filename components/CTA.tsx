
'use client';

import Link from 'next/link';

export default function CTA() {
  const handleAppointment = () => {
    window.open('https://wa.me/212661180440?text=Bonjour, je souhaite prendre rendez-vous', '_blank');
  };

  const handleLocation = () => {
    window.open('https://maps.google.com/?q=Tachfine+Center+Marjane+Bd+Ibn+Tachfine+Casablanca', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-700">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trouvez le Bijou Parfait
          </h2>
          <p className="text-xl text-yellow-100 mb-8 leading-relaxed">
            Visitez notre boutique ou prenez rendez-vous pour une consultation personnalisée. 
            Nos experts vous aideront à choisir le bijou idéal pour chaque occasion spéciale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleAppointment}
              className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Prendre Rendez-vous
            </button>
            <button 
              onClick={handleLocation}
              className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Nous Localiser
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
