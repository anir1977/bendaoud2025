
'use client';

export default function Services() {
  const collections = [
    {
      title: 'Bagues de Fiançailles',
      description: 'Collection exclusive de bagues solitaires et alliances en or blanc, jaune et rose avec diamants certifiés',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20diamond%20engagement%20rings%20collection%20displayed%20on%20white%20velvet%2C%20various%20cuts%20including%20solitaire%2C%20halo%2C%20and%20vintage%20styles%2C%20professional%20jewelry%20photography%20with%20soft%20lighting&width=400&height=300&seq=rings-001&orientation=landscape',
      price: 'À partir de 1 500€'
    },
    {
      title: 'Colliers & Pendentifs',
      description: 'Colliers raffinés en or et argent, ornés de perles, diamants et pierres précieuses colorées',
      image: 'https://readdy.ai/api/search-image?query=Luxury%20necklaces%20and%20pendants%20collection%20with%20gold%20chains%2C%20diamond%20pendants%2C%20pearl%20necklaces%2C%20and%20gemstone%20jewelry%20displayed%20elegantly%20on%20marble%20surface%20with%20warm%20lighting&width=400&height=300&seq=necklaces-001&orientation=landscape',
      price: 'À partir de 800€'
    },
    {
      title: 'Bracelets de Luxe',
      description: 'Bracelets élégants en métaux précieux, designs contemporains et classiques pour toutes occasions',
      image: 'https://readdy.ai/api/search-image?query=Premium%20gold%20and%20silver%20bracelets%20collection%20including%20tennis%20bracelets%2C%20charm%20bracelets%2C%20and%20luxury%20bangles%20with%20diamonds%20and%20gemstones%2C%20elegant%20jewelry%20display&width=400&height=300&seq=bracelets-001&orientation=landscape',
      price: 'À partir de 600€'
    },
    {
      title: 'Boucles d\'Oreilles',
      description: 'Puces, créoles et pendants d\'oreilles en or, argent et platine avec pierres précieuses',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20earrings%20collection%20including%20diamond%20studs%2C%20gold%20hoops%2C%20and%20drop%20earrings%20with%20precious%20stones%2C%20luxury%20jewelry%20photography%20on%20white%20background&width=400&height=300&seq=earrings-001&orientation=landscape',
      price: 'À partir de 400€'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nos Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos collections de bijoux exceptionnels, chaque pièce étant soigneusement sélectionnée pour sa beauté et sa qualité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-product-shop>
          {collections.map((collection, index) => (
            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${collection.image})` }}></div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {collection.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-yellow-600">
                    {collection.price}
                  </span>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                    Voir Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
