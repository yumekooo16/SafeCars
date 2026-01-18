'use client';

import Header from '@/components/allpages/Header.js';
import Footer from '@/components/allpages/Footer.js';
import VehicleGallery from '@/components/hero/Vehiclegallery.js';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background removed - applied globally */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">Sanguinet & Région</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Courtier automobile
            </span>
            <br />
            <span className="text-blue-500">à Sanguinet</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Votre expert en acquisition automobile : recherche, négociation et démarches administratives pour un achat sécurisé et sans stress
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact" className="group bg-gradient-to-r from-blue-500 via-white-600 to-blue-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <span>Recherche personnalisée</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#contact" className="group bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Nous contacter</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-white-500 mb-2">100+</div>
              <div className="text-sm text-white/50 font-medium">Véhicules trouvés</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-4xl font-black text-white-500 mb-2">100%</div>
              <div className="text-sm text-white/50 font-medium">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white-500 mb-2">15j</div>
              <div className="text-sm text-white/50 font-medium">Délai moyen</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Notre expertise
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Un accompagnement complet pour votre projet automobile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-500 transition-colors duration-300">
                Recherche personnalisée
              </h3>
              <p className="text-white/60 leading-relaxed">
                Nous trouvons le véhicule qui correspond exactement à vos critères et votre budget
              </p>
            </div>

            {/* Service 2 */}
            <div className="group bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-500 transition-colors duration-300">
                Négociation du prix
              </h3>
              <p className="text-white/60 leading-relaxed">
                Notre expertise vous garantit le meilleur prix du marché grâce à notre réseau professionnel
              </p>
            </div>

            {/* Service 3 */}
            <div className="group bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-500 transition-colors duration-300">
                Démarches administratives
              </h3>
              <p className="text-white/60 leading-relaxed">
                Prise en charge complète de toutes les formalités : carte grise, contrôle technique, assurance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Safe Cars Section */}
      <section className="py-24 relative overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
                Pourquoi choisir SafeCars ?
              </h2>
              <p className="text-xl text-white/60 mb-12 leading-relaxed">
                Un courtier automobile de confiance à Sanguinet qui place votre satisfaction au cœur de ses priorités.
              </p>

              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
                      Achat sécurisé
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Vérification complète de l&apos;historique et de l&apos;état du véhicule
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
                      Gain de temps
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Nous gérons tout de A à Z pendant que vous vous concentrez sur l&apos;essentiel
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
                      Transparence totale
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Aucun frais caché, devis clair et accompagnement personnalisé
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-white-600/10 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <svg className="w-32 h-32 text-blue-500 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-2xl font-bold text-white/80">Votre confiance,</p>
                  <p className="text-2xl font-bold text-blue-500">Notre engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - MAINTENANT DYNAMIQUE AVEC SUPABASE */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Nos véhicules disponibles
            </h2>
            <p className="text-xl text-white/50">
              Découvrez notre sélection de véhicules rigoureusement inspectés et prêts à prendre la route
            </p>
          </div>

          {/* Galerie dynamique depuis Supabase */}
          <VehicleGallery />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
                Démarrez votre projet
              </h2>
              <p className="text-xl text-white/60 mb-12">
                Contactez-nous pour une recherche personnalisée de votre prochain véhicule
              </p>

              <form className="space-y-6">
                <input type="text" placeholder="Nom complet" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
                <input type="tel" placeholder="Téléphone" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300" />
                <textarea placeholder="Décrivez-nous votre projet automobile..." rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-white-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                  Envoyer ma demande
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Informations de contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Téléphone</p>
                      <p className="text-lg font-bold text-white">06 XX XX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Email</p>
                      <p className="text-lg font-bold text-white">contact@safecars.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-white-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Localisation</p>
                      <p className="text-lg font-bold text-white">Sanguinet, Landes (40)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-white-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Horaires d&apos;ouverture</h3>
                <div className="space-y-3 text-white/60">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-bold text-white">9h - 19h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-bold text-white">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="font-bold text-blue-500">Sur rendez-vous</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}