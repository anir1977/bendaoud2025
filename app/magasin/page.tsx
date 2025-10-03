
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MagasinPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Notre Magasin
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Venez découvrir notre showroom et notre collection exclusive au cœur de Casablanca
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-2xl text-yellow-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Adresse</h2>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="font-semibold">Ben Daoud Bijouterie</p>
                  <p>Rez de chaussée Tachfine Center</p>
                  <p>Marjane Bd Ibn Tachfine</p>
                  <p>Casablanca, Maroc</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-time-line text-2xl text-blue-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Horaires d'ouverture</h2>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Tous les jours</span>
                    <span className="font-semibold">10h30 - 21h00</span>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <i className="ri-information-line mr-2"></i>
                      Ouvert 7 jours sur 7
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-2xl text-green-600"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="ri-phone-line text-yellow-600"></i>
                    <span className="text-gray-600">0522 62 18 18</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-smartphone-line text-yellow-600"></i>
                    <span className="text-gray-600">0661 18 04 40</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-printer-line text-yellow-600"></i>
                    <span className="text-gray-600">Fax: 0522 61 45 48</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-whatsapp-line text-green-500"></i>
                    <a 
                      href="https://wa.me/212661180440" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.7234567890123!2d-7.5942577!3d33.5861925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6a79846c4d%3A0x81cb4eff7369e1d6!2sBen%20Daoud%20Bijouterie!5e0!3m2!1sfr!2sma!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation Ben Daoud Bijouterie"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Services disponibles</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-500"></i>
                    <span className="text-gray-600">Essayage gratuit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-500"></i>
                    <span className="text-gray-600">Conseil expert</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-500"></i>
                    <span className="text-gray-600">Gravure sur place</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-500"></i>
                    <span className="text-gray-600">Réparation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-500"></i>
                    <span className="text-gray-600">Redimensionnement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-check-line text-green-500"></i>
                    <span className="text-gray-600">Nettoyage</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Parking</h2>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <i className="ri-car-line text-yellow-600"></i>
                    <span>Parking payant disponible</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-map-pin-line text-yellow-600"></i>
                    <span>Accès facile depuis le boulevard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-wheelchair-line text-yellow-600"></i>
                    <span>Accès PMR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
