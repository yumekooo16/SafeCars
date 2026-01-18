'use client';

import React from 'react';
import Header from '@/components/allpages/Header.js';
import Footer from '@/components/allpages/Footer.js';
import Link from 'next/link';

/* =========================
   Composant FAQ Item
========================= */
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm transition hover:border-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-700/30"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-medium pr-6">
          {question}
        </span>
        <svg
          className={`w-6 h-6 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-4 md:p-6 pt-0 text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Page Tarifs Lavage Auto
========================= */
export default function TarifsLavageAuto() {

  const interieurServices = [
    { name: 'Aspiration complète (sièges + tapis + coffre)', price: 35 },
    { name: 'Nettoyage des sièges (professionnel)', price: 45 },
    { name: 'Nettoyage des tapis et moquette', price: 40 },
    { name: 'Nettoyage du tableau de bord et plastiques', price: 25 },
    { name: 'Désodorisation intérieure', price: 20 },
    { name: 'Nettoyage des vitres intérieures', price: 15 },
    { name: 'Protection hydrofuge des sièges', price: 50 },
    { name: 'Nettoyage complet du coffre', price: 25 },
  ];

  const premiumServices = [
    { name: 'Traitement céramique (protection 12 mois)', price: 80 },
    { name: 'Detailing complet (intérieur + extérieur)', price: 150 },
    { name: 'Polissage de la peinture', price: 70 },
  ];

  const ServiceSection = ({ title, services }) => (
    <div className="mb-14">
      <h3 className="text-3xl font-bold mb-8 text-blue-400">
        {title}
      </h3>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b border-zinc-700 pb-4 hover:border-blue-400/50 transition"
          >
            <span className="text-lg text-gray-200">
              {service.name}
            </span>
            <span className="text-2xl font-bold text-blue-400">
              {service.price}€
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* HERO */}
      <section className="mt-20 py-16 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-blue-400">Tarifs</span> Lavage Automobile
          </h1>
          <p className="text-xl text-gray-300">
            Nettoyage professionnel intérieur et extérieur
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-blue-400/10 border-l-4 border-blue-400 p-6 mb-16 rounded">
          <h2 className="text-blue-400 font-bold mb-2">
            ✓ Services Professionnels
          </h2>
          <p className="text-gray-300">
            Matériel haut de gamme & finition premium.
          </p>
        </div>

        <ServiceSection
          title="Nettoyage Intérieur"
          services={interieurServices}
        />

        <ServiceSection
          title="Services Premium"
          services={premiumServices}
        />

        <div className="text-center mt-12">
          <Link href="/contact">
            <button className="bg-blue-400 text-black font-bold px-8 py-4 rounded-lg hover:bg-blue-300 transition text-lg">
              Demander un devis
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-4">
            Questions fréquentes
          </h2>
          <p className="text-center text-gray-400 mb-14">
            Tout savoir sur nos services premium
          </p>

          <div className="space-y-6">
            <FAQItem
              question="Où intervenez-vous ?"
              answer="Nous intervenons à domicile ou en atelier, selon votre préférence."
            />
            <FAQItem
              question="Combien de temps dure un nettoyage complet ?"
              answer="Entre 2h et 4h selon l’état du véhicule."
            />
            <FAQItem
              question="Utilisez-vous des produits écologiques ?"
              answer="Oui, uniquement des produits professionnels respectueux des matériaux et de l’environnement."
            />
            <FAQItem
              question="Proposez-vous des forfaits ?"
              answer="Oui, des forfaits et abonnements sont disponibles sur demande."
            />
          </div>

          <div className="text-center mt-16">
            <Link href="/contact">
              <button className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl hover:bg-gray-200 transition">
                Contactez-nous
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
