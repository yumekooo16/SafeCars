'use client'

import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

function LegalSection({ title, children }) {
  return (
    <article className="glass-card border-l-4 border-l-blue-500/40 p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      <div className="space-y-3 text-white/65 leading-relaxed">{children}</div>
    </article>
  )
}

export default function MentionsLegales() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <PageHero
        title="Mentions légales"
        subtitle="Informations légales relatives au site SafeCars, conformément à la loi pour la confiance dans l'économie numérique."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 -mt-4">
        <div className="space-y-6">
          <LegalSection title="Éditeur du site">
            <p><span className="text-white font-medium">Raison sociale :</span> SafeCars</p>
            <p><span className="text-white font-medium">Forme juridique :</span> SAS (Société par actions simplifiée)</p>
            <p><span className="text-white font-medium">Siège social :</span> 102 Rue de l&apos;Aiguille, 40460 Sanguinet</p>
            <p><span className="text-white font-medium">SIREN :</span> 993 514 090</p>
            <p><span className="text-white font-medium">SIRET (siège) :</span> 993 514 090 00014</p>
            <p><span className="text-white font-medium">Capital social :</span> 10 000 €</p>
            <p><span className="text-white font-medium">Email :</span> contact@safecars.fr</p>
            <p><span className="text-white font-medium">Téléphone :</span> +33 7 69 80 38 89</p>
            <p>
              <span className="text-white font-medium">Activité principale :</span> Courtier automobile en véhicules neufs et d&apos;occasion.
            </p>
          </LegalSection>

          <LegalSection title="Directeur de publication">
            <p>Damien Camus, Président de SAS — données déclarées au RCS Mont-de-Marsan.</p>
          </LegalSection>

          <LegalSection title="Hébergement">
            <p><span className="text-white font-medium">Site internet :</span> www.safecars.fr</p>
            <p><span className="text-white font-medium">Hébergeur :</span> Vercel Inc.</p>
            <p><span className="text-white font-medium">Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
            <p>
              <span className="text-white font-medium">Site web :</span>{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
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
              Pour exercer ces droits : <span className="text-white">contact@safecars.fr</span>
            </p>
            <Link href="/pages/politique-confidentialite" className="inline-block mt-2 text-blue-400 font-semibold hover:underline">
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
            <p><span className="text-white font-medium">Conception et développement :</span> Wyatt — Développeur web freelance</p>
          </LegalSection>
        </div>

        <p className="mt-12 text-center text-sm text-white/40">
          Données légales extraites du RCS / annonces légales — SIREN : 993 514 090.
        </p>
      </section>

      <Footer />
    </div>
  )
}
