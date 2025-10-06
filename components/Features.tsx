
'use client';

export default function Features() {
  const features = [
    {
      icon: 'ri-diamond-line',
      title: 'Bijoux de Luxe',
      description: 'Collection exclusive de bijoux en or, argent et pierres précieuses de la plus haute qualité'
    },
    {
      icon: 'ri-hammer-line',
      title: 'Artisanat Expert',
      description: 'Chaque pièce est créée avec un savoir-faire traditionnel et une attention aux détails exceptionnelle'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Garantie Qualité',
      description: 'Tous nos bijoux sont certifiés et accompagnés d\'une garantie de qualité et d\'authenticité'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Service Personnalisé',
      description: 'Conseil expert et service sur mesure pour vous aider à choisir le bijou parfait'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Pourquoi Choisir Ben Daoud Bijouterie
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis des années, nous créons des bijoux d'exception qui marquent les moments les plus précieux de votre vie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className={`${feature.icon} text-2xl text-yellow-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
