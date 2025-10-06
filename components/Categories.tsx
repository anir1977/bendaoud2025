
import Link from 'next/link';

const categories = [
  {
    title: "Bijoux en Or",
    description: "Bagues, colliers, bracelets en or 18K",
    image: "https://readdy.ai/api/search-image?query=Beautiful%20gold%20jewelry%20collection%20with%20rings%2C%20necklaces%2C%20bracelets%20in%2018k%20gold%2C%20elegant%20display%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting%2C%20luxury%20and%20sophistication&width=400&height=300&seq=cat1&orientation=landscape",
    link: "/bijoux",
    items: "150+ produits"
  },
  {
    title: "Montres de Luxe",
    description: "Guess, Festina, Tissot, Calvin Klein",
    image: "https://readdy.ai/api/search-image?query=Luxury%20watches%20collection%20featuring%20premium%20brands%2C%20elegant%20timepieces%20arranged%20on%20dark%20sophisticated%20background%2C%20professional%20product%20photography%2C%20modern%20and%20luxurious%20presentation%2C%20high-end%20watch%20display&width=400&height=300&seq=cat2&orientation=landscape",
    link: "/montres",
    items: "80+ modèles"
  },
  {
    title: "Bagues de Fiançailles",
    description: "Solitaires et alliances uniques",
    image: "https://readdy.ai/api/search-image?query=Elegant%20engagement%20rings%20and%20wedding%20bands%20in%2018k%20gold%20with%20diamonds%2C%20romantic%20jewelry%20photography%20on%20soft%20white%20background%2C%20luxury%20bridal%20jewelry%20collection%2C%20sophisticated%20and%20romantic%20atmosphere&width=400&height=300&seq=cat3&orientation=landscape",
    link: "/bijoux?category=solitaire",
    items: "50+ créations"
  },
  {
    title: "Parures Complètes",
    description: "Ensembles coordonnés bijoux",
    image: "https://readdy.ai/api/search-image?query=Complete%20jewelry%20sets%20with%20matching%20necklaces%2C%20earrings%2C%20bracelets%20in%2018k%20gold%2C%20coordinated%20jewelry%20collection%20on%20elegant%20background%2C%20professional%20luxury%20jewelry%20photography%2C%20sophisticated%20presentation&width=400&height=300&seq=cat4&orientation=landscape",
    link: "/bijoux?category=parure",
    items: "30+ ensembles"
  }
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nos Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de bijoux en or 18 carats et montres de marques prestigieuses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm font-medium bg-yellow-500 text-black px-2 py-1 rounded">
                    {category.items}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-yellow-600 font-medium">
                  <span>Découvrir</span>
                  <div className="w-4 h-4 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
