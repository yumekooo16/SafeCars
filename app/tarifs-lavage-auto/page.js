'use client';

import React from 'react';
import Header from '@/components/allpages/Header';
import Footer from '@/components/allpages/Footer';
import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="sc-card overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition hover:bg-[var(--surface)]"
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-4">{question}</span>
        <svg
          className={`w-5 h-5 shrink-0 text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-[var(--text-muted)] leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}

function PrestationCard({ title, description, startingPrice, prices, options }) {
  return (
    <article className="sc-card sc-card-padded mb-6">
      <div className="mb-4">
        <h3 className="sc-display text-xl text-[var(--silver)] mb-2">{title}</h3>
        {description && <p className="text-[var(--text-muted)] text-sm mb-3">{description}</p>}
        {startingPrice && <p className="text-[var(--gold)] font-medium text-sm">{startingPrice}</p>}
      </div>

      {prices && prices.length > 0 && (
        <div className="space-y-2 mt-4 pt-4 border-t border-[var(--border)]">
          {prices.map((price, idx) => (
            <div key={idx} className="flex justify-between items-center gap-4">
              <span className="text-[var(--text-muted)]">{price.type}</span>
              <span className="font-serif text-lg text-[var(--text)]">{price.amount} €</span>
            </div>
          ))}
        </div>
      )}

      {options && options.length > 0 && (
        <div className={prices?.length ? 'mt-4 pt-4 border-t border-[var(--border)]' : 'mt-2'}>
          {options.map((option, idx) => (
            <div key={idx} className="flex justify-between items-center gap-4">
              <span className="text-[var(--text-muted)]">{option.name}</span>
              <span className="font-serif text-lg text-[var(--text)]">{option.price} €</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function TarifsLavageAuto() {
  return (
    <div className="sc-page">
      <Header />

      <PageHero
        kicker="Atelier"
        title="Tarifs lavage automobile"
        subtitle="Nettoyage professionnel intérieur et extérieur à Sanguinet — finition soignée, matériel adapté."
      />

      <section className="sc-container pb-12">
        <div className="sc-card sc-card-padded border-l-2 border-l-[var(--border-accent)] mb-12 max-w-3xl">
          <h2 className="sc-display text-lg text-[var(--silver)] mb-2">Services professionnels</h2>
          <p className="text-[var(--text-muted)]">Matériel haut de gamme et finition premium.</p>
        </div>

        <div className="max-w-2xl">
          <PrestationCard
            title="Prestation médium"
            description="Aspiration des moquettes + coffre, vitres + intérieur de porte et nettoyage plastique"
            startingPrice="À partir de 60 €"
            prices={[
              { type: 'Citadine', amount: 60 },
              { type: 'Berlines', amount: 65 },
              { type: 'SUV / 4x4', amount: 75 },
            ]}
          />

          <PrestationCard
            title="Option lavage des sièges en tissus"
            options={[{ name: 'Lavage des sièges en tissus', price: 25 }]}
          />

          <PrestationCard
            title="Prestations premium"
            description="Aspiration des moquettes + coffre, vitres + intérieur de porte, nettoyage plastique et lavage de sièges"
            startingPrice="À partir de 80 €"
            prices={[
              { type: 'Citadine', amount: 80 },
              { type: 'Berlines', amount: 85 },
              { type: 'SUV / 4x4', amount: 90 },
            ]}
          />

          <PrestationCard title="Lavage extérieur" options={[{ name: 'Lavage extérieur', price: 40 }]} />

          <PrestationCard
            title="Prestations gold"
            description="Prestation premium + lavage extérieur"
            options={[{ name: 'Prestation Gold (Premium + Extérieur)', price: 120 }]}
          />
        </div>

        <div className="text-center mt-10">
          <Link href="/contact" className="sc-btn sc-btn-primary sc-btn-lg">
            Demander un devis
          </Link>
        </div>
      </section>

      <section className="sc-section sc-section-alt">
        <div className="sc-container max-w-3xl">
          <div className="sc-section-header mx-auto text-center">
            <p className="sc-kicker">FAQ</p>
            <h2 className="sc-section-title">Questions fréquentes</h2>
            <p className="sc-lead mt-3">Tout savoir sur nos prestations de lavage.</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Combien de temps dure un nettoyage complet ?"
              answer="Entre 2 h et 4 h selon l'état du véhicule."
            />
            <FAQItem
              question="Utilisez-vous des produits écologiques ?"
              answer="Oui, uniquement des produits professionnels respectueux des matériaux et de l'environnement."
            />
            <FAQItem
              question="Proposez-vous des forfaits ?"
              answer="Oui, des forfaits et abonnements sont disponibles sur demande."
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="sc-btn sc-btn-secondary">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
