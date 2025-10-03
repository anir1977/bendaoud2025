import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comment nous collectons, utilisons et protégeons vos données personnelles
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Collecte des Données</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ben Daoud Bijouterie collecte vos données personnelles uniquement dans le cadre 
                de nos services et avec votre consentement explicite.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Données collectées :</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Nom et prénom</li>
                  <li>• Adresse email</li>
                  <li>• Numéro de téléphone</li>
                  <li>• Adresse de livraison</li>
                  <li>• Historique des commandes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Utilisation des Données</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vos données personnelles sont utilisées exclusivement pour :
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Traitement et suivi de vos commandes
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Communication concernant vos achats
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Service après-vente et garantie
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Amélioration de nos services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Protection des Données</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles 
                appropriées pour protéger vos données personnelles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Sécurité technique</h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Chiffrement des données</li>
                    <li>• Serveurs sécurisés</li>
                    <li>• Accès restreint</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Sécurité organisationnelle</h3>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Formation du personnel</li>
                    <li>• Procédures strictes</li>
                    <li>• Audits réguliers</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Partage des Données</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vos données personnelles ne sont jamais vendues, louées ou transmises à des tiers 
                à des fins commerciales.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <p className="text-red-800 font-semibold">
                  <i className="ri-shield-check-line mr-2"></i>
                  Engagement : Aucune transmission à des tiers sans votre consentement explicite
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Vos Droits</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conformément à la réglementation en vigueur, vous disposez des droits suivants :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <i className="ri-eye-line text-blue-500"></i>
                    <span className="text-gray-600">Droit d'accès</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-edit-line text-green-500"></i>
                    <span className="text-gray-600">Droit de rectification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-delete-bin-line text-red-500"></i>
                    <span className="text-gray-600">Droit d'effacement</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <i className="ri-pause-line text-orange-500"></i>
                    <span className="text-gray-600">Droit de limitation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-download-line text-purple-500"></i>
                    <span className="text-gray-600">Droit à la portabilité</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-close-line text-gray-500"></i>
                    <span className="text-gray-600">Droit d'opposition</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Notre site utilise des cookies pour améliorer votre expérience de navigation 
                et analyser l'utilisation de notre site.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Types de cookies utilisés :</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Cookies techniques (nécessaires au fonctionnement)</li>
                  <li>• Cookies de performance (analyse d'audience)</li>
                  <li>• Cookies de préférences (mémorisation de vos choix)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Conservation des Données</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vos données personnelles sont conservées uniquement pendant la durée nécessaire 
                aux finalités pour lesquelles elles ont été collectées.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="ri-time-line text-yellow-600 mr-2"></i>
                  Données de commande : 5 ans (obligations légales)
                </li>
                <li className="flex items-center">
                  <i className="ri-time-line text-yellow-600 mr-2"></i>
                  Données de contact : jusqu'à votre demande de suppression
                </li>
                <li className="flex items-center">
                  <i className="ri-time-line text-yellow-600 mr-2"></i>
                  Données de garantie : durée de la garantie + 1 an
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pour exercer vos droits ou pour toute question concernant cette politique 
                de confidentialité, contactez-nous :
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email :</strong> contact@bendaoud.ma</p>
                  <p><strong>Téléphone :</strong> 0522 62 18 18</p>
                  <p><strong>Adresse :</strong> Rez de chaussée Tachfine Center, Marjane Bd Ibn Tachfine, Casablanca</p>
                </div>
              </div>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Dernière mise à jour :</strong> Janvier 2024<br />
                Cette politique de confidentialité peut être modifiée. Nous vous informerons 
                de tout changement significatif par email ou via notre site web.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}