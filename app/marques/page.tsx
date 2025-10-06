import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarquesPage() {
  const marques = [
    {
      name: "Rolex",
      description: "Montres de luxe suisses, symbole d'excellence et de prestige",
      image: "https://readdy.ai/api/search-image?query=luxury%20Rolex%20watch%20collection%20display%20elegant%20showcase%20with%20gold%20and%20silver%20timepieces%20on%20premium%20white%20background%20minimalist%20jewelry%20store%20setting&width=400&height=300&seq=rolex1&orientation=landscape"
    },
    {
      name: "Omega",
      description: "Horlogerie de précision, partenaire officiel des Jeux Olympiques",
      image: "https://readdy.ai/api/search-image?query=elegant%20Omega%20watches%20collection%20luxury%20timepieces%20display%20sophisticated%20showcase%20premium%20white%20background%20jewelry%20store%20setting&width=400&height=300&seq=omega1&orientation=landscape"
    },
    {
      name: "Cartier",
      description: "Joaillerie française d'exception, créateur de bijoux iconiques",
      image: "https://readdy.ai/api/search-image?query=luxury%20Cartier%20jewelry%20collection%20elegant%20gold%20rings%20necklaces%20bracelets%20premium%20white%20background%20sophisticated%20jewelry%20store%20display&width=400&height=300&seq=cartier1&orientation=landscape"
    },
    {
      name: "Tissot",
      description: "Tradition horlogère suisse depuis 1853",
      image: "https://readdy.ai/api/search-image?query=Tissot%20watches%20collection%20elegant%20timepieces%20luxury%20display%20premium%20white%20background%20jewelry%20store%20showcase%20sophisticated%20setting&width=400&height=300&seq=tissot1&orientation=landscape"
    },
    {
      name: "TAG Heuer",
      description: "Montres de sport de luxe, précision et performance",
      image: "https://readdy.ai/api/search-image?query=TAG%20Heuer%20luxury%20sports%20watches%20collection%20elegant%20display%20premium%20white%20background%20jewelry%20store%20showcase%20sophisticated%20timepieces&width=400&height=300&seq=tagheuer1&orientation=landscape"
    },
    {
      name: "Pandora",
      description: "Bijoux personnalisables, charms et bracelets uniques",
      image: "https://readdy.ai/api/search-image?query=Pandora%20jewelry%20collection%20elegant%20charms%20bracelets%20silver%20gold%20premium%20white%20background%20jewelry%20store%20display%20sophisticated%20setting&width=400&height=300&seq=pandora1&orientation=landscape"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nos Marques Partenaires
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection exclusive des plus grandes marques de bijoux et montres de luxe
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marques.map((marque, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={marque.image} 
                    alt={marque.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{marque.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{marque.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}