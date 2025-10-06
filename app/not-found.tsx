
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-['Pacifico'] text-gray-800 mb-2">
            Ben Daoud Bijouterie
          </h1>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h2 className="text-8xl font-bold text-yellow-500 mb-4">404</h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Page non trouvée
          </h3>
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Retour à l'accueil
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              href="/bijoux"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors cursor-pointer whitespace-nowrap text-center"
            >
              Voir les Bijoux
            </Link>
            <Link 
              href="/montres"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors cursor-pointer whitespace-nowrap text-center"
            >
              Voir les Montres
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Besoin d'aide ? Contactez-nous
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="tel:+212661180440"
              className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-phone-line"></i>
              </div>
            </a>
            <a 
              href="https://wa.me/212661180440"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-whatsapp-line"></i>
              </div>
            </a>
            <Link 
              href="/contact"
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-mail-line"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
