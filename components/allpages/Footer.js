'use client';

import Link from 'next/link';
import Image from "next/image";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/10">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Colonne 1 : Logo & Description */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <Image 
                src="/image/Logosafecarsv2.png" 
                alt="SafeCars Logo" 
                width={150} 
                height={200}
                priority 
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Votre courtier automobile de confiance à Sanguinet pour un achat de véhicule sécurisé et sans stress.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/50 hover:text-blue-500 transition-colors duration-300">Accueil</Link></li>
              <li><Link href="#services" className="text-white/50 hover:text-blue-500 transition-colors duration-300">Services</Link></li>
              <li><Link href="/nos-ventes" className="text-white/50 hover:text-blue-500 transition-colors duration-300">Nos Vehicules</Link></li>
              <li><Link href="#contact" className="text-white/50 hover:text-blue-500 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Informations légales */}
          <div>
            <h4 className="text-white font-bold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-white/50 mb-6">
              <li>SIRET : 993 514 090 00014</li>
              <li>Sanguinet, Landes (40)</li>
              <li>contact@safecars.fr</li>
            </ul>
            
            <h4 className="text-white font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pages/mentions-legales" className="text-white/50 hover:text-blue-500 transition-colors duration-300">Mentions légales</Link></li>
              <li><Link href="/pages/politique-confidentialite" className="text-white/50 hover:text-blue-500 transition-colors duration-300">Confidentialité</Link></li>
              <li><Link href="/pages/CGU" className="text-white/50 hover:text-blue-500 transition-colors duration-300">CGU</Link></li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8">
          {/* Signature Wyatt - Marque de fabrique */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright client */}
            <p className="text-sm text-white/30 text-center md:text-left">
              &copy; {currentYear} SafeCars. Tous droits réservés.
            </p>

            {/* Signature développeur - TA MARQUE DE FABRIQUE */}
            <div className="flex items-center space-x-3 group">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/40">Fait par </span>
                <div className="relative">
                  {/* Badge avec effet hover */}
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 group-hover:border-blue-500/50 transition-all duration-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-white-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-black text-xs">W</span>
                    </div>
                    <span className="text-white font-bold text-sm">Wyatt</span>
                  </div>
                  {/* Effet brillant au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine rounded-full pointer-events-none"></div>
                </div>
              </div>
              <span className="text-white/20 text-xs hidden sm:inline">|</span>
              <span className="text-xs text-white/30 hidden sm:inline">Web Developer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation CSS pour l'effet brillant */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </footer>
  );
}