import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConditionsGenerales() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Conditions Générales de Vente
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos conditions générales de vente et d'utilisation
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Objet</h2>
              <p className="text-gray-600 leading-relaxed">
                Les présentes conditions générales de vente s'appliquent à toutes les ventes de bijoux et montres 
                effectuées par Ben Daoud Bijouterie, que ce soit en magasin ou par tout autre moyen de commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Produits</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tous nos produits sont authentiques et accompagnés de leur certificat d'authenticité. 
                Les descriptions et photos sont données à titre indicatif et n'engagent pas la responsabilité 
                du vendeur en cas de légères différences.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Bijoux en or 18 carats certifié
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Montres de marques agréées
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Certificats d'authenticité fournis
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Prix et Paiement</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les prix sont exprimés en dirhams marocains (MAD) et incluent la TVA. 
                Nous nous réservons le droit de modifier nos prix à tout moment.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Modes de paiement acceptés :</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Espèces</li>
                  <li>• Carte bancaire</li>
                  <li>• Virement bancaire</li>
                  <li>• Paiement à la livraison</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Livraison</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les délais de livraison sont donnés à titre indicatif. Ben Daoud Bijouterie s'engage 
                à faire ses meilleurs efforts pour respecter ces délais.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="ri-truck-line text-yellow-600 mr-2"></i>
                  Livraison gratuite dès 1000 MAD
                </li>
                <li className="flex items-center">
                  <i className="ri-time-line text-yellow-600 mr-2"></i>
                  Délais : 24h à 5 jours selon la zone
                </li>
                <li className="flex items-center">
                  <i className="ri-shield-check-line text-yellow-600 mr-2"></i>
                  Emballage sécurisé et assuré
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Droit de Rétractation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours 
                pour exercer votre droit de rétractation sans avoir à justifier de motifs.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Conditions de retour :</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Produit dans son état d'origine</li>
                  <li>• Emballage d'origine conservé</li>
                  <li>• Certificat d'authenticité inclus</li>
                  <li>• Aucune trace d'usure</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Garantie</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tous nos produits bénéficient d'une garantie contre les défauts de fabrication. 
                La durée de garantie varie selon le type de produit et la marque.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <i className="ri-time-line text-green-500 mr-2"></i>
                  Montres : 2 ans minimum
                </li>
                <li className="flex items-center">
                  <i className="ri-time-line text-green-500 mr-2"></i>
                  Bijoux en or : 1 an
                </li>
                <li className="flex items-center">
                  <i className="ri-tools-line text-green-500 mr-2"></i>
                  Service après-vente disponible
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Responsabilité</h2>
              <p className="text-gray-600 leading-relaxed">
                Ben Daoud Bijouterie ne saurait être tenue responsable des dommages indirects 
                ou consécutifs résultant de l'utilisation de ses produits. Notre responsabilité 
                est limitée au montant de la vente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Données Personnelles</h2>
              <p className="text-gray-600 leading-relaxed">
                Vos données personnelles sont collectées et traitées dans le respect de la 
                réglementation en vigueur. Elles ne sont utilisées que pour le traitement 
                de votre commande et ne sont jamais transmises à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Droit Applicable</h2>
              <p className="text-gray-600 leading-relaxed">
                Les présentes conditions générales sont soumises au droit marocain. 
                Tout litige sera de la compétence exclusive des tribunaux de Casablanca.
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Dernière mise à jour :</strong> Janvier 2024<br />
                Pour toute question concernant ces conditions générales, contactez-nous au 0522 62 18 18 
                ou par email à contact@bendaoud.ma
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}