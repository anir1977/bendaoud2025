
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-['Pacifico'] mb-4 text-yellow-400">Ben Daoud Bijouterie</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Bijouterie spécialisée en or 18 carats et montres de marques prestigieuses. 
              Votre confiance, notre engagement depuis des années.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://web.facebook.com/bendaoud.bijouterie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-facebook-fill text-xl"></i>
                </div>
              </a>
              <a 
                href="https://www.instagram.com/bendaoud_officiel/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-instagram-fill text-xl"></i>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Accueil</Link></li>
              <li><Link href="/bijoux" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Bijoux</Link></li>
              <li><Link href="/montres" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Montres</Link></li>
              <li><Link href="/marques" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Marques</Link></li>
              <li><Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors cursor-pointer">À Propos</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/livraison-et-retours" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Livraison &amp; Retours</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors cursor-pointer">FAQ</Link></li>
              <li><Link href="/magasin" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Notre Magasin</Link></li>
              <li><span className="text-gray-400">Paiement à la livraison</span></li>
              <li><span className="text-gray-400">Livraison dès 1000 MAD</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-phone-line text-yellow-400"></i>
                </div>
                <span className="text-gray-400">0522 62 18 18</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-smartphone-line text-yellow-400"></i>
                </div>
                <span className="text-gray-400">0661 18 04 40</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 flex items-center justify-center mt-1">
                  <i className="ri-map-pin-line text-yellow-400"></i>
                </div>
                <span className="text-gray-400">
                  Rez de chaussée Tachfine Center<br />
                  Marjane Bd Ibn Tachfine<br />
                  Casablanca, Maroc
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Ben Daoud Bijouterie. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/conditions-generales" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Conditions Générales
              </Link>
              <Link href="/politique-de-confidentialite" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
