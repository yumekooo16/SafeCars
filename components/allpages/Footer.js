import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] pt-16 pb-10">
      <div className="sc-container">
        <p className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] tracking-[-0.04em] font-medium">
          SafeCars
        </p>
        <p className="mt-3 mb-12 text-[var(--text-muted)] max-w-md">
          Courtier automobile à Sanguinet — occasions contrôlées, lavage pro et accompagnement sur les Landes et le Bassin d&apos;Arcachon.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-subtle)] mb-3">Coordonnées</p>
            <address className="not-italic text-sm text-[var(--text-muted)] space-y-1">
              <span className="block">102 Rue de l&apos;Aiguille</span>
              <span className="block">40460 Sanguinet</span>
            </address>
            <a href="tel:+33769803889" className="block mt-3 text-sm text-[var(--text)] hover:text-[var(--silver)] transition-colors">
              07 69 80 38 89
            </a>
            <a href="mailto:contact@safecars.fr" className="block mt-1 text-sm text-[var(--text)] hover:text-[var(--silver)] transition-colors">
              contact@safecars.fr
            </a>
          </div>

          <nav aria-label="Navigation">
            <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-subtle)] mb-3">Explorer</p>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Accueil'],
                ['/nos-ventes', 'Nos véhicules'],
                ['/services', 'Services'],
                ['/blog', 'Guides'],
                ['/contact', 'Contact'],
                ['/tarifs-lavage-auto', 'Tarifs lavage'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-subtle)] mb-3">Services</p>
            <ul className="space-y-2 text-sm">
              {[
                ['/notre-methode', 'Notre méthode'],
                ['/reprise-auto', 'Reprise auto'],
                ['/financement-voiture-occasion', 'Financement'],
                ['/faq-achat-auto', 'FAQ'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Légal">
            <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-subtle)] mb-3">Légal</p>
            <ul className="space-y-2 text-sm">
              {[
                ['/pages/mentions-legales', 'Mentions légales'],
                ['/pages/politique-confidentialite', 'Confidentialité'],
                ['/pages/CGU', 'CGU'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--text-subtle)]">SIRET 993 514 090 00014</p>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[var(--text-subtle)]">
          <p>&copy; {year} SafeCars. Tous droits réservés.</p>
          <p>
            Conception{' '}
            <span className="text-[var(--text-muted)]">Wyatt</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
