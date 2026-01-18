"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="border-t border-gray-800 mb-12 pt-8 text-center text-gray-500 text-sm" suppressHydrationWarning />

      <div className="max-w-6xl mx-auto px-6" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left" suppressHydrationWarning>
          
          {/* Logo et Plan du site */}
          <div suppressHydrationWarning>
            <h3 className="text-3xl font-bold mb-5">SafeCars</h3>
            
            <h4 className="text-lg font-semibold mb-4">Plan du site</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-blue-400 transition">Accueil</Link></li>
              <li><Link href="/nos-ventes" className="hover:text-blue-400 transition">Nos-Ventes</Link></li>
              <li><Link href="#contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Pages légales et Réseaux sociaux */}
          <div suppressHydrationWarning>
            <h4 className="text-lg font-semibold mb-4">Pages légales</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/pages/mentions-legales" className="hover:text-yellow-400 transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/pages/politique-confidentialite" className="hover:text-yellow-400 transition">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/pages/CGU" className="hover:text-yellow-400 transition">
                 CGU
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold mb-4 mt-8">Nos réseaux</h4>
            <div className="flex gap-4 justify-center md:justify-start" suppressHydrationWarning>
              <a 
                href="" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/33775775389" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
                aria-label="WhatsApp"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="3 2 24 30">
                  <path
                    d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm" suppressHydrationWarning>
          <p>Réalisé par <span className="text-white font-semibold">Wyatt</span> - Développeur web freelance</p>
          <p className="mt-2">© 2026 SafeCars. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}


