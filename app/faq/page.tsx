import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQ() {
  const faqs = [
    {
      question: "Vos bijoux sont-ils authentiques ?",
      answer: "Oui, tous nos bijoux et montres sont 100% authentiques. Nous fournissons un certificat d'authenticité avec chaque achat et travaillons uniquement avec des fournisseurs agréés."
    },
    {
      question: "Proposez-vous un service de gravure ?",
      answer: "Oui, nous proposons un service de gravure personnalisée sur la plupart de nos bijoux et montres. Contactez-nous pour connaître les possibilités selon le produit choisi."
    },
    {
      question: "Comment puis-je connaître ma taille de bague ?",
      answer: "Vous pouvez venir en magasin pour un essayage gratuit, ou utiliser notre guide des tailles disponible en ligne. Nous proposons également un service de redimensionnement."
    },
    {
      question: "Acceptez-vous les paiements en plusieurs fois ?",
      answer: "Oui, nous proposons des facilités de paiement pour les achats importants. Contactez-nous pour discuter des modalités selon votre situation."
    },
    {
      question: "Puis-je échanger un bijou contre un autre ?",
      answer: "Les échanges sont possibles sous certaines conditions, dans les 14 jours suivant l'achat, avec le produit dans son état d'origine et l'emballage conservé."
    },
    {
      question: "Proposez-vous un service de réparation ?",
      answer: "Oui, nous avons un atelier de réparation pour les montres et bijoux. Nous proposons également un service d'entretien et de nettoyage professionnel."
    },
    {
      question: "Vos prix incluent-ils la TVA ?",
      answer: "Oui, tous nos prix affichés incluent la TVA. Aucun frais supplémentaire ne sera ajouté lors de votre achat."
    },
    {
      question: "Comment puis-je suivre ma commande ?",
      answer: "Après votre commande, vous recevrez un numéro de suivi par SMS et email. Vous pourrez suivre l'avancement de votre livraison en temps réel."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Questions Fréquentes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions les plus courantes
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-add-line text-xl text-gray-500 group-open:rotate-45 transition-transform"></i>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-gray-600 mb-6">
                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:0522621818"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Appelez-nous
                </a>
                <a 
                  href="https://wa.me/212661180440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}