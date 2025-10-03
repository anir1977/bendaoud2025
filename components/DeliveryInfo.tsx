
const deliveryFeatures = [
  {
    icon: "ri-truck-line",
    title: "Livraison Partout au Maroc",
    description: "Livraison gratuite à partir de 1000 MAD",
    color: "text-blue-500"
  },
  {
    icon: "ri-money-dollar-circle-line",
    title: "Paiement à la Livraison",
    description: "Payez en espèces lors de la réception",
    color: "text-green-500"
  },
  {
    icon: "ri-store-line",
    title: "Retrait en Boutique",
    description: "Récupérez vos achats directement en magasin",
    color: "text-purple-500"
  },
  {
    icon: "ri-shield-check-line",
    title: "Garantie Qualité",
    description: "Échange sous 7 jours si non utilisé",
    color: "text-yellow-500"
  }
];

export default function DeliveryInfo() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profitez de nos services de qualité pour une expérience d'achat exceptionnelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deliveryFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-50 ${feature.color}`}>
                <i className={`${feature.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Visitez Notre Boutique
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Découvrez notre collection complète dans notre showroom situé au cœur de Casablanca. 
                Nos experts vous conseilleront pour trouver le bijou parfait.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-map-pin-line text-yellow-500"></i>
                  </div>
                  <span className="text-gray-700">Tachfine Center, Bd Ibn Tachfine, Casablanca</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-time-line text-yellow-500"></i>
                  </div>
                  <span className="text-gray-700">Tous les jours: 10h30 - 21h00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-phone-line text-yellow-500"></i>
                  </div>
                  <span className="text-gray-700">0522 62 18 18</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent z-10"></div>
              <img
                src="https://static.readdy.ai/image/60526cae87adeac03b19eea9f4676145/58e2affe7624812c919fdc934de8d0aa.jfif"
                alt="Boutique Ben Daoud Bijouterie"
                className="w-full h-full object-cover brightness-110 contrast-105 saturate-110 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-sm font-semibold text-gray-800">Ben Daoud Haute Joaillerie</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
