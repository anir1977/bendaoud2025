
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LivraisonRetours() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Livraison &amp; Retours
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Toutes les informations sur nos conditions de livraison et de retour
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-truck-line text-2xl text-yellow-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Livraison</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Zones de livraison</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous livrons dans tout le Maroc. Livraison gratuite pour les commandes supérieures à 1000 MAD.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Délais de livraison</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Casablanca : 24-48h
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Rabat, Marrakech, Fès : 2-3 jours
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Autres villes : 3-5 jours
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Frais de livraison</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Gratuite pour les commandes &ge; 1000 MAD
                    </li>
                    <li className="flex items-center">
                      {/* Escape the less‑than sign to avoid JSX parsing errors */}
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      50 MAD pour les commandes &lt; 1000 MAD
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-arrow-go-back-line text-2xl text-blue-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Retours</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Conditions de retour</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Retour possible sous 14 jours
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Produit dans son état d'origine
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Emballage d'origine conservé
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      Certificat d'authenticité inclus
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Procédure de retour</h3>
                  <ol className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                      Contactez notre service client
                    </li>
                    <li className="flex items-start">
                      <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                      Obtenez votre numéro de retour
                    </li>
                    <li className="flex items-start">
                      <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                      Emballez soigneusement le produit
                    </li>
                    <li className="flex items-start">
                      <span className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                      Expédiez à notre adresse
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-shield-check-line text-2xl text-green-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Garantie</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Tous nos bijoux et montres sont garantis contre les défauts de fabrication. 
                  La durée de garantie varie selon les marques et les produits.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Montres : 2 ans minimum
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Bijoux en or : 1 an
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Service après-vente disponible
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
