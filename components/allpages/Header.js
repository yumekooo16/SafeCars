'use client';

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

const MOBILE_LINKS = [
  { href: "/", label: "Accueil", variant: "blue" },
  { href: "/nos-ventes", label: "Nos Véhicules", variant: "blue" },
  { href: "/services", label: "Services", variant: "blue" },
  { href: "/blog", label: "Guides", variant: "blue" },
  { href: "/contact", label: "Contact", variant: "blue" },
  {
    href: "/tarifs-lavage-auto",
    label: "Tarifs Lavage Auto",
    variant: "amber",
  },
];

const mobileLinkClass = {
  blue: "text-3xl font-bold text-white hover:text-blue-500 transition-colors duration-300",
  amber:
    "text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300",
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
          scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image 
                src="/image/Logosafecarsv2.png" 
                alt="SafeCars — courtier automobile Sanguinet" 
                width={150} 
                height={200}
                priority
              />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Accueil
              </Link>
              <Link href="/nos-ventes" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Nos Véhicules
              </Link>
              <Link href="/services" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Services
              </Link>
              <Link href="/blog" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Guides
              </Link>
              <Link href="/contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Contact
              </Link>
              <Link 
                href="/tarifs-lavage-auto"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                Tarifs Lavage Auto
              </Link>
              {/* FIX 1 : "to-white-600" remplacé par "to-blue-600" */}
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Trouver ma voiture
              </Link>
            </nav>

            {/* FIX 3 : z-[60] pour que le bouton reste au-dessus du menu overlay (z-50) */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden z-[60] w-10 h-10 flex flex-col justify-center items-center" 
              aria-label="Menu"
            >
              <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-white rounded my-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* FIX 3 : menu mobile z-50 (sous le bouton z-[60]) */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-md z-50 md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {/* FIX 2 : clé basée sur l'index pour éviter les doublons */}
          {MOBILE_LINKS.map(({ href, label, variant }, index) => (
            <Link
              key={index}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass[variant]}
            >
              {label}
            </Link>
          ))}
          {/* FIX 1 : "to-white-600" remplacé par "to-blue-600" */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Trouver ma voiture
          </Link>
        </div>
      </div>
    </>
  );
}