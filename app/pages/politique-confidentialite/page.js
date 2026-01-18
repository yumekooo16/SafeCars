'use client'

import React from "react";
import Link from "next/link";

export default function PolitiqueConfidentialite() {
  return (
    <div className="bg-black min-h-screen" suppressHydrationWarning>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden" suppressHydrationWarning>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-6" suppressHydrationWarning>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] mb-4">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>
          <div className="w-24 h-[1px] bg-white/40 mt-6" suppressHydrationWarning></div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-32 text-white" suppressHydrationWarning>
        
        {/* Introduction */}
        <div className="mb-20 text-center" suppressHydrationWarning>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            La protection de vos données personnelles est une priorité pour Safe Cars.
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations
            conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16" suppressHydrationWarning>
          
          {/* 1. Responsable du traitement */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              1. Responsable du traitement des données
            </h2>
            <div className="space-y-3 text-gray-400 font-light leading-relaxed" suppressHydrationWarning>
              <p>
                Le responsable du traitement des données est <span className="text-white">SafeCars</span>,
                société enregistrée sous le SIREN 993 514 090, dont le siège social est situé à
                <span className="text-white"> 102 RUE DE L'AIGUILLE 40460 SANGUINET</span>.
              </p>
              <p className="mt-4">
                <strong className="text-white">Contact pour les demandes RGPD :</strong>
              </p>
              <ul className="space-y-2 ml-6 mt-2">
                <li><span className="text-white mr-3">•</span>Email : <a href="mailto:contact@safecars.fr" className="text-white hover:text-gray-300 border-b border-white/30">contact@safecars.fr</a></li>
                <li><span className="text-white mr-3">•</span>Téléphone : +33 7 69 80 38 89</li>
              </ul>
            </div>
          </article>

          {/* 2. Données collectées */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              2. Données personnelles collectées
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed" suppressHydrationWarning>
              <p>
                Nous collectons uniquement les données nécessaires à la réservation et à la gestion de nos services :
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Nom et prénom</span></li>
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Adresse email</span></li>
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Numéro de téléphone</span></li>
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Informations sur vos demandes de services ou réservation</span></li>
              </ul>
            </div>
          </article>

          {/* 3. Base légale et finalité */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              3. Base légale et finalité du traitement
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed" suppressHydrationWarning>
              <p>
                <strong className="text-white">Base légale :</strong> Votre consentement explicite, recueilli lors de la soumission des formulaires, et l&apos;exécution du contrat de prestation de service.
              </p>
              <p>
                <strong className="text-white">Finalités :</strong>
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Traiter vos demandes et réservations</span></li>
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Vous contacter pour organiser vos services</span></li>
                <li className="flex items-start"><span className="text-white mr-3">•</span><span>Répondre à vos questions</span></li>
              </ul>
              <p className="mt-4 font-semibold text-white">
                Vos données ne sont jamais revendues à des tiers.
              </p>
            </div>
          </article>

          {/* 4. Durée de conservation */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              4. Durée de conservation des données
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Conformément aux recommandations de la CNIL, vos données personnelles sont conservées pendant 
              <span className="text-white font-semibold"> 3 ans </span>
              à compter de votre dernière interaction avec SafeCars. Au-delà de cette période, vos données sont automatiquement supprimées ou anonymisées.
            </p>
          </article>

          {/* 5. Sécurité */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              5. Sécurité et stockage des données
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Vos données sont stockées de manière sécurisée sur la plateforme <span className="text-white">Supabase</span>, 
              avec chiffrement et accès restreint.
            </p>
          </article>

          {/* 6. Vos droits RGPD */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              6. Vos droits RGPD
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Vous disposez des droits suivants : accès, rectification, effacement, portabilité, opposition et retrait du consentement.
            </p>
            <p className="mt-4 text-gray-400 font-light">
              Pour exercer vos droits : contactez Safe Cars par email, téléphone ou courrier à l’adresse du siège.
            </p>
          </article>

          {/* 7. Hébergement */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              7. Hébergement du site et des données
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Site internet : www.safecars.fr <br/>
              Hébergeur du site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis <br/>
              Hébergeur des données : Supabase (serveurs sécurisés et conformes RGPD)
            </p>
          </article>

          {/* 8. Cookies */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">8. Cookies</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Safe Cars utilise des cookies techniques et statistiques uniquement. Aucun cookie publicitaire n’est utilisé.
            </p>
          </article>

          {/* 9. Modifications */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              9. Modifications de la politique de confidentialité
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Safe Cars peut modifier cette politique à tout moment. Les modifications seront publiées sur cette page.
            </p>
          </article>

          {/* 10. Réclamation */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              10. Réclamation auprès de la CNIL
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Vous pouvez adresser une réclamation à la CNIL si vos droits ne sont pas respectés.
            </p>
          </article>

        </div>

        {/* Footer navigation */}
        <div className="mt-32 pt-12 border-t border-gray-800 flex justify-between items-center" suppressHydrationWarning>
          <Link 
            href="/" 
            className="text-white hover:text-gray-400 transition-colors font-light tracking-wide"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>

      {/* Dernière mise à jour */}
      <section className="text-center pb-20 px-6">
        <p className="text-gray-500 text-sm font-light">
          Dernière mise à jour : Janvier 2026
        </p>
      </section>
    </div>
  );
}
