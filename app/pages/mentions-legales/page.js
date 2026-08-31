'use client'

import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

function LegalSection({ title, children }) {
  return (
    <article className="sc-card sc-card-padded border-l-2 border-l-[var(--border-accent)]">
      <h2 className="sc-display text-xl mb-5">{title}</h2>
      <div className="space-y-3 text-[var(--text-muted)] leading-relaxed [&_strong]:text-[var(--text)] [&_strong]:font-medium">
        {children}
      </div>
    </article>
  )
}

export default function MentionsLegales() {
  return (
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Informations légales"
        title="Mentions légales"
        subtitle="Informations relatives au site SafeCars, conformément à la loi pour la confiance dans l'économie numérique."
      />

      <section className="sc-container pb-20 -mt-2 max-w-3xl">
        <div className="space-y-6">
          <LegalSection title="Éditeur du site">
            <p><strong>Raison sociale :</strong> SafeCars</p>
            <p><strong>Forme juridique :</strong> SAS (Société par actions simplifiée)</p>
            <p><strong>Siège social :</strong> 102 Rue de l&apos;Aiguille, 40460 Sanguinet</p>
            <p><strong>SIREN :</strong> 993 514 090</p>
            <p><strong>SIRET (siège) :</strong> 993 514 090 00014</p>
            <p><strong>Capital social :</strong> 10 000 €</p>
            <p><strong>Email :</strong> contact@safecars.fr</p>
            <p><strong>Téléphone :</strong> +33 7 69 80 38 89</p>
            <p>
              <strong>Activité principale :</strong> Courtier automobile en véhicules neufs et d&apos;occasion.
            </p>
          </LegalSection>

          <LegalSection title="Directeur de publication">
            <p>Damien Camus, Président de SAS — données déclarées au RCS Mont-de-Marsan.</p>
          </LegalSection>

          <LegalSection title="Hébergement">
            <p><strong>Site internet :</strong> www.safecars.fr</p>
            <p><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
            <p>
              <strong>Site web :</strong>{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="sc-link">
                https://vercel.com
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Propriété intellectuelle">
            <p>
              L&apos;ensemble de ce site relève de la législation française et internationale sur le droit
              d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
            </p>
          </LegalSection>

          <LegalSection title="Protection des données personnelles">
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
            </p>
            <p>
              Pour exercer ces droits : <strong>contact@safecars.fr</strong>
            </p>
            <Link href="/pages/politique-confidentialite" className="inline-block mt-2 sc-link font-medium">
              Consulter notre politique de confidentialité
            </Link>
          </LegalSection>

          <LegalSection title="Cookies">
            <p>
              Le site peut être amené à vous demander l&apos;acceptation des cookies pour des besoins
              de statistiques et d&apos;affichage. Vous pouvez les désactiver dans les paramètres de votre navigateur.
            </p>
          </LegalSection>

          <LegalSection title="Crédits">
            <p><strong>Conception et développement :</strong> Wyatt — Développeur web freelance</p>
          </LegalSection>
        </div>

        <p className="mt-12 text-center text-sm text-[var(--text-subtle)]">
          Données légales extraites du RCS / annonces légales — SIREN : 993 514 090.
        </p>
      </section>

      <Footer />
    </div>
  )
}
