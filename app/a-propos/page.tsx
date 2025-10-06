
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppFloat />
      
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20jewelry%20store%20interior%20with%20luxury%20display%20cases%2C%20warm%20golden%20lighting%2C%20sophisticated%20atmosphere%2C%20professional%20photography%2C%20high-end%20bijouterie%20ambiance%2C%20modern%20and%20classic%20design%20elements&width=1200&height=600&seq=apropos1&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            À Propos de Ben Daoud Bijouterie
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Une tradition d'excellence dans l'art de la bijouterie depuis des années
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ben Daoud Bijouterie est une entreprise familiale établie au cœur de Casablanca, 
                spécialisée dans la création et la vente de bijoux en or 18 carats de haute qualité. 
                Depuis notre création, nous nous sommes engagés à offrir à notre clientèle des pièces 
                d'exception alliant tradition artisanale et modernité.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Notre passion pour l'excellence nous a menés à développer une expertise reconnue 
                dans le domaine de la bijouterie fine, en proposant également une sélection 
                prestigieuse de montres des plus grandes marques internationales.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Située au rez-de-chaussée du Tachfine Center Marjane sur le Boulevard Ibn Tachfine, 
                notre boutique vous accueille dans un cadre élégant et raffiné pour vous faire 
                découvrir nos créations uniques.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20jewelry%20craftsman%20working%20on%2018k%20gold%20jewelry%2C%20traditional%20jewelry%20making%20techniques%2C%20skilled%20artisan%20at%20work%2C%20warm%20lighting%2C%20authentic%20craftsmanship%20atmosphere%2C%20detailed%20jewelry%20creation%20process&width=500&height=400&seq=apropos2&orientation=landscape"
                alt="Artisan bijoutier"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-award-line text-2xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous sélectionnons uniquement des matériaux de première qualité et travaillons 
                avec les meilleurs artisans pour garantir l'excellence de chaque pièce.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-2xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Passion</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre amour pour l'art de la bijouterie se reflète dans chaque création, 
                chaque conseil et chaque service que nous offrons à nos clients.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-check-line text-2xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Confiance</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous construisons des relations durables avec nos clients basées sur la transparence, 
                l'honnêteté et un service personnalisé de qualité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Expertise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Luxury%20jewelry%20display%20with%2018k%20gold%20pieces%2C%20elegant%20showcase%20with%20rings%2C%20necklaces%2C%20bracelets%2C%20professional%20jewelry%20photography%2C%20sophisticated%20presentation%2C%20warm%20golden%20lighting&width=500&height=400&seq=apropos3&orientation=landscape"
                alt="Collection de bijoux"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Expertise</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-gem-line text-yellow-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Bijoux en Or 18 Carats</h3>
                    <p className="text-gray-600">
                      Spécialistes de l'or 18 carats, nous proposons une gamme complète de bijoux : 
                      bagues, colliers, bracelets, boucles d'oreilles et parures complètes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-time-line text-yellow-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Montres de Prestige</h3>
                    <p className="text-gray-600">
                      Distributeur officiel des plus grandes marques : Tissot, Guess, Festina, 
                      Calvin Klein, Daniel Klein et Just Cavalli.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-tools-line text-yellow-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Services Personnalisés</h3>
                    <p className="text-gray-600">
                      Conseil personnalisé, réparations, entretien et créations sur mesure 
                      pour répondre à tous vos besoins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Qualité */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Notre Engagement Qualité</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-medal-line text-xl text-yellow-600"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Or 18 Carats Certifié</h3>
              <p className="text-sm text-gray-600">Garantie de pureté et d'authenticité</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-truck-line text-xl text-yellow-600"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Livraison Sécurisée</h3>
              <p className="text-sm text-gray-600">Partout au Maroc dès 1000 MAD</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-refresh-line text-xl text-yellow-600"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Échange 7 Jours</h3>
              <p className="text-sm text-gray-600">Satisfaction garantie</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-line text-xl text-yellow-600"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Service Client</h3>
              <p className="text-sm text-gray-600">Accompagnement personnalisé</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
