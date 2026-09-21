'use client';

import { useState } from 'react';
import Header from '@/components/allpages/Header';
import Footer from '@/components/allpages/Footer';
import { supabase } from '@/lib/supabase';
import { buildContactWhatsAppUrl } from '@/lib/whatsapp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setWhatsappUrl('');

    try {
      // Validation basique
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject,
        message: formData.message.trim(),
      };

      // Enregistrer dans Supabase
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            ...payload,
            status: 'new',
            priority: 'normal',
          }
        ]);

      if (supabaseError) throw supabaseError;

      // Ouvrir WhatsApp avec le message prérempli (numéro SafeCars)
      const waUrl = buildContactWhatsAppUrl(payload);
      setWhatsappUrl(waUrl);
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero Section - Ajouté pt-32 pour compenser le header fixe */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Une question ? Un projet automobile ? Nous sommes là pour vous accompagner
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Formulaire */}
            <div>
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-6 text-white">
                  Envoyez-nous un message
                </h2>

                {/* Message de succès */}
                {success && (
                  <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-green-500 font-bold">Message enregistré !</p>
                        <p className="text-green-500/80 text-sm mt-1">
                          WhatsApp s&apos;ouvre pour finaliser l&apos;envoi vers SafeCars.
                        </p>
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 bg-[#25D366] text-black font-bold text-sm px-4 py-2 rounded-lg hover:brightness-110 transition"
                          >
                            Ouvrir WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Message d'erreur */}
                {error && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-red-500 font-bold">Erreur</p>
                        <p className="text-red-500/80 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Nom complet <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Téléphone (optionnel)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Sujet <span className="text-blue-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    >
                      <option value="" className="bg-black text-white/50">Sélectionnez un sujet</option>
                      <option value="Achat de véhicule" className="bg-black text-white">Achat de véhicule</option>
                      <option value="Lavage auto" className="bg-black text-white">Lavage auto</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message <span className="text-blue-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
                      placeholder="Décrivez-nous votre projet automobile..."
                    />
                  </div>

                  {/* Bouton Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      loading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/40 text-center">
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                  </p>
                </form>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              {/* Coordonnées */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Nos coordonnées</h3>
                
                <div className="space-y-6">
                  {/* Téléphone */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Téléphone</p>
                      <a href="tel:+33769803889" className="text-lg font-bold text-white hover:text-blue-500 transition-colors">
                        +33 7 69 80 38 89
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">WhatsApp</p>
                      <a
                        href="https://wa.me/33769803889"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-white hover:text-[#25D366] transition-colors"
                      >
                        Écrire sur WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Email</p>
                      <a href="mailto:contact@safecars.fr" className="text-lg font-bold text-white hover:text-blue-500 transition-colors">
                        contact@safecars.fr
                      </a>
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Adresse</p>
                      <p className="text-lg font-bold text-white">Sanguinet, Landes (40)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Horaires d&apos;ouverture</h3>
                <div className="space-y-3 text-white/60">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-bold text-white">9h - 19h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-bold text-white">9h - 12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="font-bold text-blue-500">Fermé</span>
                  </div>
                </div>
              </div>

              {/* Réponse rapide */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <svg className="w-8 h-8 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Réponse rapide</h4>
                    <p className="text-white/60 text-sm">
                      Nous nous engageons à vous répondre dans les <span className="text-blue-500 font-bold">24 heures</span> suivant votre demande.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}