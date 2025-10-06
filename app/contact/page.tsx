
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('telephone', formData.telephone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d3egqsf09ffggnll6mgg', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', telephone: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppFloat />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de Contact */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos Coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line text-xl text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Adresse</h3>
                  <p className="text-gray-600">
                    Rez de chaussée Tachfine Center<br />
                    Marjane Bd Ibn Tachfine<br />
                    Casablanca, Maroc
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-phone-line text-xl text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Téléphone</h3>
                  <p className="text-gray-600">
                    <a href="tel:0522621818" className="hover:text-yellow-600 cursor-pointer">
                      0522 62 18 18
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-smartphone-line text-xl text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Mobile / WhatsApp</h3>
                  <p className="text-gray-600">
                    <a href="https://wa.me/212661180440" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 cursor-pointer">
                      0661 18 04 40
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-printer-line text-xl text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Fax</h3>
                  <p className="text-gray-600">0522 61 45 48</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-xl text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Horaires d'ouverture</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Tous les jours: 10h30 - 21h00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://web.facebook.com/bendaoud.bijouterie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a 
                  href="https://www.instagram.com/bendaoud_officiel/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-7
00 transition-colors cursor-pointer"
                >
                  <i className="ri-instagram-fill text-xl"></i>
                </a>
                <a 
                  href="https://wa.me/212661180440" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer"
                >
                  <i className="ri-whatsapp-fill text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} data-readdy-form id="contact-form">
              <div className="space-y-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                    placeholder="Votre adresse email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    maxLength={500}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm resize-none"
                    placeholder="Votre message (maximum 500 caractères)"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.message.length}/500 caractères
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-check-circle-line text-green-600 mr-2"></i>
                  Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 mr-2"></i>
                  Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Carte Google Maps */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Localisation</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.7234567890123!2d-7.5942577!3d33.5861925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6a79846c4d%3A0x81cb4eff7369e1d6!2sBen%20Daoud%20Bijouterie!5e0!3m2!1sfr!2sma!4v1234567890123"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ben Daoud Bijouterie - Localisation"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
