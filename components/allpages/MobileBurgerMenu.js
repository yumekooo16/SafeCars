'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function MobileBurgerMenu() {
  const [open, setOpen] = useState(false);

  // Fermer le menu avec Escape et bloquer le scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Bouton Burger */}
      <button
        className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block w-7 h-0.5 bg-white rounded my-1.5 transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
        <span className={`block w-7 h-0.5 bg-white rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>

      {/* Menu Mobile */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {/* Bouton fermer */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Links */}
          <Link 
            href="/" 
            onClick={closeMenu}
            className="text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link 
            href="/nos-ventes" 
            onClick={closeMenu}
            className="text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300"
          >
            Nos Ventes
          </Link>
          <Link 
            href="/tarifs" 
            onClick={closeMenu}
            className="text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300"
          >
            Tarifs
          </Link>
          <Link 
            href="/contact" 
            onClick={closeMenu}
            className="text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300"
          >
            Contact
          </Link>

          <Link 
            href="/Tarifs-Lavage-auto" 
            onClick={closeMenu}
            className="text-3xl font-bold text-white hover:text-amber-500 transition-colors duration-300"
          >
            Tarifs Lavage Auto
          </Link>

          {/* CTA Button */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
          >
            Trouver ma voiture
          </Link>
        </div>
      </div>
    </>
  );
}