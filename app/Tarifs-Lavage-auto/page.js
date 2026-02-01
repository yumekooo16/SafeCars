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

  const PrestationCard = ({ title, description, startingPrice, prices, options }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6 hover:border-blue-400/50 transition">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-blue-400 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm mb-3">{description}</p>
        )}
        {startingPrice && (
          <p className="text-blue-400 font-semibold">{startingPrice}</p>
        )}
      </div>
      
      {prices && prices.length > 0 && (
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-700">
          {prices.map((price, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-gray-200">{price.type}</span>
              <span className="text-xl font-bold text-white">{price.amount}€</span>
            </div>
          ))}
        </div>
      )}
      
      {options && options.length > 0 && (
        <div className={prices && prices.length > 0 ? "mt-4 pt-4 border-t border-gray-700" : "mt-2"}>
          {options.map((option, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-gray-200">{option.name}</span>
              <span className="text-xl font-bold text-white">{option.price}€</span>
            </div>
          ))}
        </div>
      )}
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

        {/* Prestation Médium */}
        <PrestationCard
          title="Prestation médium"
          description="aspiration des moquette + coffre, vitre + intérieur de porte et nettoyage plastique"
          startingPrice="À partir de 60€"
          prices={[
            { type: 'Citadine', amount: 60 },
            { type: 'Berlines', amount: 65 },
            { type: 'SUV / 4x4', amount: 75 }
          ]}
        />

        {/* Option lavage sièges */}
        <PrestationCard
          title="Option lavage des sièges en tissus"
          prices={null}
          options={[
            { name: 'Lavage des sièges en tissus', price: 25 }
          ]}
        />

        {/* Prestation Premium */}
        <PrestationCard
          title="Prestations premium"
          description="aspiration des moquette plus coffre, vitre + intérieur de porte, nettoyage des plastique et lavage de siège"
          startingPrice="À partir de 80€"
          prices={[
            { type: 'Citadine', amount: 80 },
            { type: 'Berlines', amount: 85 },
            { type: 'SUV / 4x4', amount: 90 }
          ]}
        />

        {/* Lavage extérieur */}
        <PrestationCard
          title="Lavage extérieur"
          prices={null}
          options={[
            { name: 'Lavage extérieur', price: 40 }
          ]}
        />

        {/* Prestation Gold */}
        <PrestationCard
          title="Prestations gold"
          description="Prestation Premium + Lavage extérieur"
          prices={null}
          options={[
            { name: 'Prestation Gold (Premium + Extérieur)', price: 120 }
          ]}
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
