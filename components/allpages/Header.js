'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-white-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <span className="text-black font-black text-xl tracking-tighter">SC</span>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-white">SafeCars</div>
                <p className="text-xs text-blue-500 font-medium tracking-wide">Courtier Automobile</p>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Accueil
              </Link>
              <Link href="/nos-ventes" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                 Nos-Véhicules
              </Link>
              <Link href="#contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">
                Contact
              </Link>
              <Link 
                href="#contact"
                className="bg-gradient-to-r from-blue-500 to-white-600 text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Trouver ma voiture
              </Link>
            </nav>

            {/* Bouton Menu Mobile */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center" 
              aria-label="Menu"
            >
              <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-white rounded my-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link 
            href="/" 
            onClick={() => setMenuOpen(false)} 
            className="text-3xl font-bold text-white hover:text-blue-500 transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link 
            href="/nos-ventes" 
            onClick={() => setMenuOpen(false)} 
            className="text-3xl font-bold text-white hover:text-blue-500 transition-colors duration-300"
          >
            Nos Ventes
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMenuOpen(false)} 
            className="text-3xl font-bold text-white hover:text-blue-500 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link 
            href="/Tarifs-Lavage-auto" 
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300"
          >
            Tarifs Lavage Auto
          </Link>
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="mt-8 bg-gradient-to-r from-blue-500 to-white-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Trouver ma voiture
          </Link>
        </div>
      </div>
    </>
  );
}