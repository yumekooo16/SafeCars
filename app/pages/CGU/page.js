'use client'

import Link from 'next/link'
import Header from '@/components/allpages/Header'
import Footer from '@/components/allpages/Footer'
import PageHero from '@/components/ui/PageHero'

function LegalArticle({ title, children }) {
  return (
    <article className="sc-card sc-card-padded border-l-2 border-l-[var(--border-accent)]">
      <h2 className="sc-display text-xl mb-5">{title}</h2>
      <div className="space-y-4 text-[var(--text-muted)] leading-relaxed [&_strong]:text-[var(--text)] [&_strong]:font-medium">
        {children}
      </div>
    </article>
  )
}

export default function CGU() {
  return (
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Informations légales"
        title="Conditions générales d'utilisation"
        subtitle="Les présentes conditions régissent l'accès et l'utilisation du site www.safecars.fr."
      />

      <section className="sc-container pb-20 -mt-2 max-w-3xl">
        <p className="sc-lead mb-12 text-center max-w-2xl mx-auto">
          En accédant au site, vous acceptez sans réserve les présentes conditions.
        </p>

        <div className="space-y-6">
          <LegalArticle title="Article 1 — Objet">
            <p>
              Les présentes CGU ont pour objet de définir les modalités et conditions d&apos;utilisation
              du site www.safecars.fr ainsi que les droits et obligations des parties dans ce cadre.
              Le site permet aux utilisateurs de découvrir les services proposés par SafeCars.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 2 — Accès au site">
            <p>
              Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet.
              Tous les frais nécessaires pour l&apos;accès aux services (matériel informatique, connexion Internet, etc.)
              sont à la charge de l&apos;utilisateur.
            </p>
            <p>
              SafeCars met en œuvre tous les moyens raisonnables pour assurer un accès de qualité au site,
              mais n&apos;est tenue à aucune obligation d&apos;y parvenir. L&apos;éditeur ne peut être tenu responsable
              en cas d&apos;indisponibilité technique pour quelque raison que ce soit.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 3 — Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu présent sur le site (structure, textes, logos, images, vidéos, etc.)
              est la propriété exclusive de SafeCars ou de ses partenaires. Toute reproduction, distribution, modification,
              adaptation, retransmission ou publication de ces éléments est strictement interdite sans l&apos;accord écrit de SafeCars.
            </p>
            <p>
              Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une
              contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 4 — Données personnelles">
            <p>SafeCars s&apos;engage à respecter le RGPD pour le traitement des données à caractère personnel.</p>
            <p>Pour plus d&apos;informations, consultez notre politique de confidentialité.</p>
            <Link href="/pages/politique-confidentialite" className="inline-block mt-2 sc-link font-medium">
              Consulter notre politique de confidentialité
            </Link>
          </LegalArticle>

          <LegalArticle title="Article 5 — Responsabilité">
            <p>
              SafeCars ne pourra être tenue responsable des dommages directs et indirects causés
              au matériel de l&apos;utilisateur lors de l&apos;accès au site.
            </p>
            <p>
              Les informations sur le site sont fournies avec soin mais SafeCars ne garantit pas
              l&apos;exactitude ou l&apos;actualité complète des contenus.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 6 — Liens hypertextes">
            <p>
              Le site peut contenir des liens vers d&apos;autres sites. SafeCars n&apos;exerce aucun contrôle
              sur ces sites et décline toute responsabilité quant à leur contenu ou accessibilité.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 7 — Cookies">
            <p>
              Le site peut utiliser des cookies pour améliorer l&apos;expérience utilisateur et à des fins statistiques.
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 8 — Modification des CGU">
            <p>
              SafeCars se réserve le droit de modifier à tout moment les présentes CGU.
              Les CGU applicables sont celles en vigueur à la date de connexion et d&apos;utilisation du site.
            </p>
          </LegalArticle>

          <LegalArticle title="Article 9 — Droit applicable et juridiction">
            <p>Les présentes CGU sont régies par le droit français. Tout litige sera porté devant les tribunaux français.</p>
          </LegalArticle>

          <LegalArticle title="Article 10 — Contact">
            <p>Pour toute question relative aux présentes CGU ou au site, vous pouvez nous contacter :</p>
            <p><strong>Par courrier :</strong> SafeCars, 102 Rue de l&apos;Aiguille, 40460 Sanguinet</p>
            <p><strong>Par email :</strong> contact@safecars.fr</p>
          </LegalArticle>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <Link href="/" className="sc-text-cta">
            ← Retour à l&apos;accueil
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-subtle)]">
          Conditions générales d&apos;utilisation en vigueur au 6 décembre 2025 — SafeCars, SIREN 993 514 090
        </p>
      </section>

      <Footer />
    </div>
  )
}
