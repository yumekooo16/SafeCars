'use client'

import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

function LegalArticle({ title, children }) {
  return (
    <article className="sc-card sc-card-padded border-l-2 border-l-[var(--border-accent)]">
      <h2 className="sc-display text-xl mb-5">{title}</h2>
      <div className="space-y-4 text-[var(--text-muted)] leading-relaxed [&_strong]:text-[var(--text)] [&_strong]:font-medium [&_ul]:space-y-2 [&_ul]:ml-4">
        {children}
      </div>
    </article>
  )
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Informations légales"
        title="Politique de confidentialité"
        subtitle="Comment SafeCars collecte, utilise et protège vos données conformément au RGPD."
      />

      <section className="sc-container pb-20 -mt-2 max-w-3xl">
        <p className="sc-lead mb-12 text-center max-w-2xl mx-auto">
          La protection de vos données personnelles est une priorité pour SafeCars.
        </p>

        <div className="space-y-6">
          <LegalArticle title="1. Responsable du traitement des données">
            <p>
              Le responsable du traitement des données est <strong>SafeCars</strong>,
              société enregistrée sous le SIREN 993 514 090, dont le siège social est situé au
              <strong> 102 Rue de l&apos;Aiguille, 40460 Sanguinet</strong>.
            </p>
            <p><strong>Contact pour les demandes RGPD :</strong></p>
            <ul>
              <li><span>•</span> Email : <a href="mailto:contact@safecars.fr" className="sc-link">contact@safecars.fr</a></li>
              <li><span>•</span> Téléphone : +33 7 69 80 38 89</li>
            </ul>
          </LegalArticle>

          <LegalArticle title="2. Données personnelles collectées">
            <p>Nous collectons uniquement les données nécessaires à la gestion de nos services :</p>
            <ul>
              <li><span>•</span> Nom et prénom</li>
              <li><span>•</span> Adresse email</li>
              <li><span>•</span> Numéro de téléphone</li>
              <li><span>•</span> Informations sur vos demandes de services</li>
            </ul>
          </LegalArticle>

          <LegalArticle title="3. Base légale et finalité du traitement">
            <p>
              <strong>Base légale :</strong> Votre consentement explicite, recueilli lors de la soumission des formulaires, et l&apos;exécution du contrat de prestation de service.
            </p>
            <p><strong>Finalités :</strong></p>
            <ul>
              <li><span>•</span> Traiter vos demandes</li>
              <li><span>•</span> Vous contacter pour organiser vos services</li>
              <li><span>•</span> Répondre à vos questions</li>
            </ul>
            <p><strong>Vos données ne sont jamais revendues à des tiers.</strong></p>
          </LegalArticle>

          <LegalArticle title="4. Durée de conservation des données">
            <p>
              Conformément aux recommandations de la CNIL, vos données personnelles sont conservées pendant
              <strong> 3 ans </strong>
              à compter de votre dernière interaction avec SafeCars. Au-delà de cette période, vos données sont automatiquement supprimées ou anonymisées.
            </p>
          </LegalArticle>

          <LegalArticle title="5. Sécurité et stockage des données">
            <p>
              Vos données sont stockées de manière sécurisée sur la plateforme <strong>Supabase</strong>,
              avec chiffrement et accès restreint.
            </p>
          </LegalArticle>

          <LegalArticle title="6. Vos droits RGPD">
            <p>
              Vous disposez des droits suivants : accès, rectification, effacement, portabilité, opposition et retrait du consentement.
            </p>
            <p>
              Pour exercer vos droits : contactez SafeCars par email, téléphone ou courrier à l&apos;adresse du siège.
            </p>
          </LegalArticle>

          <LegalArticle title="7. Hébergement du site et des données">
            <p>
              Site internet : www.safecars.fr<br />
              Hébergeur du site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Hébergeur des données : Supabase (serveurs sécurisés et conformes RGPD)
            </p>
          </LegalArticle>

          <LegalArticle title="8. Cookies">
            <p>SafeCars utilise des cookies techniques et statistiques uniquement. Aucun cookie publicitaire n&apos;est utilisé.</p>
          </LegalArticle>

          <LegalArticle title="9. Modifications de la politique de confidentialité">
            <p>SafeCars peut modifier cette politique à tout moment. Les modifications seront publiées sur cette page.</p>
          </LegalArticle>

          <LegalArticle title="10. Réclamation auprès de la CNIL">
            <p>Vous pouvez adresser une réclamation à la CNIL si vos droits ne sont pas respectés.</p>
          </LegalArticle>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <Link href="/" className="sc-text-cta">
            ← Retour à l&apos;accueil
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-subtle)]">Dernière mise à jour : janvier 2026</p>
      </section>

      <Footer />
    </div>
  )
}
