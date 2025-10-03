
'use client';

export default function WhatsAppFloat() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/212661180440', '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contacter via WhatsApp"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <i className="ri-whatsapp-fill text-xl"></i>
      </div>
    </button>
  );
}
