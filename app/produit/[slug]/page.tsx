
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetail from './ProductDetail';

// Mock data pour les produits (en attendant la base de données)
const products = [
  {
    id: "1",
    title: "Bague Solitaire Diamant Or 18K",
    slug: "bague-solitaire-diamant-or-18k",
    price: 8500,
    images: [
      "https://readdy.ai/api/search-image?query=Elegant%20diamond%20solitaire%20ring%20in%2018k%20gold%2C%20single%20brilliant%20cut%20diamond%2C%20classic%20engagement%20ring%20design%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20luxury%20and%20sophistication&width=600&height=600&seq=detail1a&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Diamond%20solitaire%20ring%20side%20view%2C%2018k%20gold%20band%20with%20brilliant%20cut%20diamond%2C%20professional%20jewelry%20photography%20on%20white%20background%2C%20elegant%20and%20luxurious%20presentation&width=600&height=600&seq=detail1b&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Close%20up%20diamond%20solitaire%20ring%2C%20sparkling%20diamond%20in%2018k%20gold%20setting%2C%20macro%20jewelry%20photography%2C%20brilliant%20cut%20diamond%20details&width=600&height=600&seq=detail1c&orientation=squarish"
    ],
    category: "Bague",
    metalColor: "Or jaune",
    carat: "18K",
    description: "Magnifique bague solitaire en or 18 carats sertie d'un diamant brillant. Cette pièce intemporelle symbolise l'élégance et la sophistication. Parfaite pour une demande en mariage ou comme cadeau précieux.",
    specifications: [
      "Or 18 carats certifié",
      "Diamant brillant de qualité supérieure",
      "Sertissage professionnel",
      "Finition polie haute qualité",
      "Garantie 2 ans"
    ]
  },
  {
    id: "2",
    title: "Collier Chaîne Or 18K",
    slug: "collier-chaine-or-18k",
    price: 3200,
    images: [
      "https://readdy.ai/api/search-image?query=Beautiful%2018k%20gold%20chain%20necklace%2C%20elegant%20design%20with%20delicate%20links%2C%20luxury%20gold%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting&width=600&height=600&seq=detail2a&orientation=squarish",
      "https://readdy.ai/api/search-image?query=18k%20gold%20chain%20necklace%20close%20up%2C%20detailed%20view%20of%20gold%20links%2C%20professional%20jewelry%20photography%2C%20luxury%20and%20elegance&width=600&height=600&seq=detail2b&orientation=squarish"
    ],
    category: "Collier",
    metalColor: "Or jaune",
    carat: "18K",
    description: "Collier chaîne en or 18 carats d'une finesse exceptionnelle. Cette pièce polyvalente s'adapte à toutes les occasions, du quotidien aux événements spéciaux.",
    specifications: [
      "Or 18 carats pur",
      "Longueur ajustable",
      "Fermoir sécurisé",
      "Poids optimal pour le confort",
      "Entretien facile"
    ]
  },
  {
    id: "3",
    title: "Montre Tissot PRC 200",
    slug: "montre-tissot-prc-200",
    price: 4800,
    images: [
      "https://readdy.ai/api/search-image?query=Tissot%20PRC%20200%20luxury%20watch%2C%20stainless%20steel%20case%20with%20black%20dial%2C%20Swiss%20made%20timepiece%2C%20professional%20watch%20photography%20on%20dark%20background%2C%20sophisticated%20and%20elegant%20presentation&width=600&height=600&seq=detail3a&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Tissot%20PRC%20200%20watch%20side%20view%2C%20stainless%20steel%20bracelet%20and%20case%2C%20Swiss%20precision%20timepiece%2C%20professional%20watch%20photography&width=600&height=600&seq=detail3b&orientation=squarish"
    ],
    category: "Montre",
    brand: "Tissot",
    description: "Montre Tissot PRC 200, symbole de précision suisse et d'élégance sportive. Étanche jusqu'à 200 mètres, cette montre allie performance et style raffiné.",
    specifications: [
      "Mouvement quartz suisse",
      "Étanchéité 200m",
      "Boîtier acier inoxydable",
      "Cadran noir avec index lumineux",
      "Bracelet acier ajustable",
      "Garantie internationale Tissot"
    ]
  },
  {
    id: "4",
    title: "Bracelet Gourmette Or 18K",
    slug: "bracelet-gourmette-or-18k",
    price: 2800,
    images: [
      "https://readdy.ai/api/search-image?query=18k%20gold%20curb%20chain%20bracelet%2C%20classic%20gourmette%20design%2C%20luxury%20gold%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting%2C%20elegant%20and%20sophisticated&width=600&height=600&seq=detail4a&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Gold%20gourmette%20bracelet%20close%20up%2C%20detailed%20view%20of%20chain%20links%2C%2018k%20gold%20jewelry%20photography%2C%20luxury%20and%20craftsmanship&width=600&height=600&seq=detail4b&orientation=squarish"
    ],
    category: "Bracelet",
    metalColor: "Or jaune",
    carat: "18K",
    description: "Bracelet gourmette classique en or 18 carats. Design intemporel qui traverse les générations, parfait pour homme ou femme.",
    specifications: [
      "Or 18 carats massif",
      "Maillons gourmette traditionnels",
      "Fermoir mousqueton sécurisé",
      "Différentes tailles disponibles",
      "Gravure personnalisée possible"
    ]
  },
  {
    id: "5",
    title: "Montre Guess Collection",
    slug: "montre-guess-collection",
    price: 2400,
    images: [
      "https://readdy.ai/api/search-image?query=Guess%20Collection%20luxury%20watch%20for%20women%2C%20elegant%20design%20with%20crystals%2C%20fashion%20timepiece%20on%20sophisticated%20background%2C%20professional%20watch%20photography%2C%20modern%20and%20stylish%20presentation&width=600&height=600&seq=detail5a&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Guess%20Collection%20watch%20close%20up%2C%20crystal%20details%20and%20elegant%20design%2C%20fashion%20watch%20photography%2C%20luxury%20and%20style&width=600&height=600&seq=detail5b&orientation=squarish"
    ],
    category: "Montre",
    brand: "Guess Collection",
    description: "Montre Guess Collection alliant mode et sophistication. Ornée de cristaux scintillants, cette montre est l'accessoire parfait pour la femme moderne.",
    specifications: [
      "Mouvement quartz de précision",
      "Cristaux Swarovski",
      "Boîtier plaqué or",
      "Bracelet cuir véritable",
      "Résistante aux éclaboussures",
      "Garantie internationale Guess"
    ]
  },
  {
    id: "6",
    title: "Boucles d'Oreilles Or 18K",
    slug: "boucles-oreilles-or-18k",
    price: 1800,
    images: [
      "https://readdy.ai/api/search-image?query=Elegant%2018k%20gold%20earrings%2C%20classic%20design%20with%20small%20diamonds%2C%20luxury%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting%2C%20sophisticated%20and%20timeless&width=600&height=600&seq=detail6a&orientation=squarish",
      "https://readdy.ai/api/search-image?query=18k%20gold%20earrings%20close%20up%2C%20diamond%20details%20and%20gold%20craftsmanship%2C%20professional%20jewelry%20photography%2C%20luxury%20and%20elegance&width=600&height=600&seq=detail6b&orientation=squarish"
    ],
    category: "Boucle",
    metalColor: "Or jaune",
    carat: "18K",
    description: "Boucles d'oreilles délicates en or 18 carats ornées de petits diamants. Élégance discrète pour sublimer votre beauté naturelle.",
    specifications: [
      "Or 18 carats certifié",
      "Diamants sertis main",
      "Système de fermeture sécurisé",
      "Hypoallergénique",
      "Écrin de présentation inclus"
    ]
  }
];

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
