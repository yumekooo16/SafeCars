'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV = [
  { href: '/', label: 'Accueil', exact: true },
  { href: '/nos-ventes', label: 'Véhicules', exact: false },
  { href: '/services', label: 'Services', exact: false },
  { href: '/blog', label: 'Guides', exact: false },
  { href: '/contact', label: 'Contact', exact: false },
];

function isActive(pathname, href, exact) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? 'border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="sc-container">
          <div className="flex items-center justify-between min-h-[4.5rem] gap-4">
            <Link href="/" className="flex items-center gap-3 shrink-0 opacity-90 hover:opacity-100 transition-opacity">
              <Image
                src="/image/Logosafecarsv2.png"
                alt="SafeCars"
                width={130}
                height={48}
                priority
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-8 flex-1" aria-label="Navigation principale">
              {NAV.map(({ href, label, exact }) => {
                const active = isActive(pathname, href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`font-[family-name:var(--font-display)] text-[1.02rem] font-medium tracking-[-0.02em] transition-colors ${
                      active ? 'text-[var(--text)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/tarifs-lavage-auto"
                className="text-sm text-[var(--silver)] hover:text-[var(--text)] transition-colors"
              >
                Lavage
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <a href="tel:+33769803889" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                07 69 80 38 89
              </a>
              <Link href="/contact" className="sc-btn sc-btn-primary sc-btn-sm">
                Trouver ma voiture
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden relative z-[60] inline-flex items-center justify-center w-11 h-11 border border-[var(--border)] rounded-[var(--radius)] bg-[color-mix(in_srgb,var(--bg)_55%,transparent)] ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span className="block w-[1.125rem] h-3 relative">
                <span className={`absolute left-0 w-full h-px bg-[var(--text)] transition-all duration-300 ${menuOpen ? 'top-[5px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 w-full h-px bg-[var(--text)] transition-all duration-300 top-[5px] ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-full h-px bg-[var(--text)] transition-all duration-300 ${menuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 border-0 bg-[color-mix(in_srgb,var(--surface)_72%,var(--bg))] backdrop-blur-lg cursor-pointer"
          onClick={() => setMenuOpen(false)}
          aria-label="Fermer le menu"
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 gap-2">
          {NAV.map(({ href, label, exact }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-5 py-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.02em] text-[var(--text)] hover:text-[var(--blue-soft)] transition-colors"
            >
              <span className="text-xs tracking-[0.12em] text-[var(--text-subtle)] w-8">{String(i + 1).padStart(2, '0')}</span>
              {label}
            </Link>
          ))}
          <Link
            href="/tarifs-lavage-auto"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-5 py-3 font-[family-name:var(--font-display)] text-3xl font-medium text-[var(--silver)]"
          >
            <span className="text-xs tracking-[0.12em] text-[var(--text-subtle)] w-8">06</span>
            Lavage
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="sc-btn sc-btn-primary mt-8 self-start">
            Trouver ma voiture
          </Link>
        </div>
      </div>
    </>
  );
}
