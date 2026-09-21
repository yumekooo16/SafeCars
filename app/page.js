"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/allpages/Footer";
import Header from "@/components/allpages/Header";
import { supabaseClient } from '@/lib/supabaseClient';
import { getVehicleImageUrl } from '@/lib/vehicleImageUrl';


export default function HomePage() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('vehicules')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      setVehicules(data || []);
    } catch (err) {
      console.error('Erreur récupération véhicules:', err);
      setVehicules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (vehicleId) => {
    setImageErrors(prev => ({ ...prev, [vehicleId]: true }));
  };

  return (
    <>
      <Header />
      
      {/* FIX : relative + min-h-screen au lieu de h-screen pour éviter que le contenu passe sous le header */}
      <section className="relative w-full min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/image/Vente_de_voitures_en_journée.png"
            alt="SafeCars — vente de véhicules d'occasion contrôlés, Sanguinet"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        {/* FIX : pt-20 (= hauteur du header) pour que le contenu commence sous le header */}
        <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-20">
          <div className="max-w-4xl space-y-8">

            {/* Titre principal */}
            <h1 className="text-4xl md:text-7xl lg:text-5xl font-bold text-white leading-tight">
              <span className="block tracking-tight">SAFECARS</span>
              <span className="mt-4 block text-2xl md:text-4xl font-semibold text-gray-200 leading-snug">
                Véhicules d&apos;occasion contrôlés — courtier auto à Sanguinet (Landes, 40)
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl">
              Des véhicules de qualité à des prix justes, avec transparence et accompagnement personnalisé.
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
              Nous sélectionnons et contrôlons chaque véhicule avant mise en vente. Vous pouvez aussi confier
              l&apos;entretien esthétique de votre auto à notre{' '}
              <Link href="/tarifs-lavage-auto" className="text-blue-400 underline-offset-4 hover:underline">
                service de lavage professionnel
              </Link>
              .
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link
                href="#vehicules"
                className="group relative px-12 py-5 bg-blue-600 text-white font-semibold text-lg tracking-wide overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/50"
              >
                <span className="relative z-10">Découvrir nos véhicules</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              
              <Link
                href="/contact"
                className="group px-12 py-5 border-2 border-white text-white font-semibold text-lg tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-2">
                  Nous contacter
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-7 border-t border-white/30">
              <div className="text-center sm:text-left">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
                <div className="text-sm md:text-base text-gray-300 font-light">Véhicules vendus</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                <div className="text-sm md:text-base text-gray-300 font-light">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Galerie de véhicules */}
      <section id="vehicules" className="bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Véhicules disponibles</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez notre sélection de véhicules soigneusement contrôlés et certifiés.
            </p>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse"></div>
              ))}
            </div>
          )}

          {!loading && vehicules.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/50 text-lg">Aucun véhicule disponible pour le moment.</p>
            </div>
          )}

          {!loading && vehicules.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {vehicules.map((vehicle) => {
                const imageUrl = vehicle.images && vehicle.images.length > 0 
                  ? getVehicleImageUrl(vehicle.images[0]) 
                  : null;
                const isVendu = vehicle.statut === 'vendu';
                const isReserve = vehicle.statut === 'reserve';
                
                return (
                  <Link
                    key={vehicle.id}
                    href={`/vehicules/${vehicle.id}`}
                    className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer block ${
                      isVendu ? 'opacity-50' : ''
                    }`}
                  >
                    {imageUrl && !imageErrors[vehicle.id] ? (
                      <img
                        src={imageUrl}
                        alt={`${vehicle.marque} ${vehicle.modele}`}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                          isVendu ? 'grayscale' : ''
                        }`}
                        onError={() => handleImageError(vehicle.id)}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center ${
                        isVendu ? 'grayscale' : ''
                      }`}>
                        <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {isVendu && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                        VENDU
                      </div>
                    )}
                    {isReserve && (
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                        RÉSERVÉ
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-blue-600/40 transition-all duration-500"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm text-blue-400 font-bold mb-1">{vehicle.marque}</p>
                      <p className="text-xl font-black text-white">{vehicle.modele}</p>
                      {vehicle.prix && (
                        <p className="text-lg font-bold text-white/80 mt-1">{vehicle.prix.toLocaleString()} €</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!loading && vehicules.length > 0 && (
            <div className="text-center">
              <Link
                href="/nos-ventes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Voir tous nos véhicules
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contenu éditorial + maillage interne */}
      <section className="bg-zinc-950 py-20 px-6 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-gray-300 space-y-6 text-base md:text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
            Votre courtier automobile près du Bassin d&apos;Arcachon
          </h2>
          <p>
            Basés à <strong className="text-white">Sanguinet</strong>, nous accompagnons les particuliers et
            les professionnels pour l&apos;achat d&apos;une{' '}
            <Link href="/nos-ventes" className="text-blue-400 hover:underline underline-offset-4">
              voiture d&apos;occasion
            </Link>{' '}
            en toute confiance : historique vérifié, état du véhicule expliqué clairement, et conseils adaptés à
            votre budget. Notre objectif est simple — vous faire gagner du temps tout en sécurisant votre projet
            auto sur les <strong className="text-white">Landes</strong>, la{' '}
            <strong className="text-white">Gironde</strong> et les départements voisins.
          </p>
          <p>
            En parallèle de la vente, nous proposons un{' '}
            <Link href="/tarifs-lavage-auto" className="text-blue-400 hover:underline underline-offset-4">
              lavage automobile intérieur et extérieur
            </Link>{' '}
            (prestations medium, premium ou gold) pour préserver la valeur et le confort de votre véhicule.
            Une question sur un modèle du stock ou un créneau d&apos;essai ?{' '}
            <Link href="/contact" className="text-blue-400 hover:underline underline-offset-4">
              Contactez notre équipe
            </Link>
            : nous répondons rapidement par téléphone, email ou formulaire.
          </p>
          <p>
            Découvrez nos{' '}
            <Link href="/services" className="text-blue-400 hover:underline underline-offset-4">
              services détaillés
            </Link>{' '}
            (reprise, financement, garantie) et nos{' '}
            <Link href="/blog" className="text-blue-400 hover:underline underline-offset-4">
              guides d&apos;achat
            </Link>{' '}
            : checklist occasion, arnaques en ligne et démarches administratives.
          </p>
        </div>
      </section>

      {/* Section Avantages */}
      <section id="services" className="bg-black py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white font-semibold tracking-wider uppercase text-sm mb-4 block">
              Nos engagements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pourquoi choisir SAFECARS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center p-8 bg-gray-600 rounded-lg ring-1 ring-white/5 transition-all duration-300 hover:bg-gray-700 hover:ring-blue-500/40">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Véhicules certifiés</h3>
              <p className="text-white leading-relaxed">
                Inspection complète de chaque véhicule avec rapport détaillé et garantie incluse
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-600 rounded-lg ring-1 ring-white/5 transition-all duration-300 hover:bg-gray-700 hover:ring-blue-500/40">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Prix transparents</h3>
              <p className="text-white leading-relaxed">
                Tarification claire sans frais cachés. Ce que vous voyez, c'est ce que vous payez
              </p>
            </div>

            <div className="group text-center p-8 bg-gray-600 rounded-lg ring-1 ring-white/5 transition-all duration-300 hover:bg-gray-700 hover:ring-blue-500/40">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Accompagnement</h3>
              <p className="text-white leading-relaxed">
                Une équipe d'experts à votre écoute pour vous guider dans votre choix
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white font-semibold tracking-wider uppercase text-sm mb-4 block">
              Comment ça marche
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Acheter en 4 étapes simples
            </h2>
          </div>

          <div className="text-white grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Parcourez', desc: 'Explorez notre stock en ligne ou en showroom', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { num: '02', title: 'Essayez', desc: 'Réservez un essai routier gratuit', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { num: '03', title: 'Validez', desc: 'Offre, financement ou reprise : nous sécurisons les démarches avec vous', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { num: '04', title: 'Roulez', desc: 'Repartez avec votre véhicule, suivi et conseils si besoin', icon: 'M5 13l4 4L19 7' },
            ].map((step, idx, arr) => (
              <div key={step.num} className="relative group">
                <div className="bg-gray-600 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-600 rounded-lg h-full">
                  <div className="text-6xl font-bold text-blue-100 mb-4 group-hover:text-blue-200 transition-colors">
                    {step.num}
                  </div>
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <svg className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/75 leading-relaxed">{step.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200 z-10" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative bg-blue-600 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Prêt à trouver votre voiture idéale ?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
            Notre équipe est là pour vous accompagner dans votre projet automobile. 
            N'attendez plus !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/nos-ventes"
              className="group px-14 py-5 bg-white text-blue-600 font-bold text-lg tracking-wide hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 rounded-lg"
            >
              <span className="inline-flex items-center gap-3">
                Voir tous les véhicules
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              href="/contact"
              className="px-14 py-5 border-2 border-white text-white font-bold text-lg tracking-wide hover:bg-white hover:text-blue-600 transition-all duration-300 rounded-lg"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}