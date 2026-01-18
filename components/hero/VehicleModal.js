'use client';

import { useEffect } from 'react';

export default function VehicleModal({ vehicle, onClose }) {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image principale */}
        {vehicle.image_url && (
          <div className="relative w-full h-64 sm:h-96 rounded-t-2xl overflow-hidden">
            <img
              src={vehicle.image_url}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          </div>
        )}

        {/* Contenu */}
        <div className="p-6 sm:p-8">
          {/* Titre */}
          <div className="mb-6">
            <p className="text-amber-500 font-bold mb-2">{vehicle.brand}</p>
            <h2 className="text-4xl font-black text-white mb-4">{vehicle.model}</h2>
            {vehicle.price && (
              <p className="text-3xl font-bold text-amber-500">{vehicle.price.toLocaleString()} €</p>
            )}
          </div>

          {/* Caractéristiques principales */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {vehicle.year && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-sm mb-1">Année</p>
                <p className="text-white font-bold text-lg">{vehicle.year}</p>
              </div>
            )}
            {vehicle.mileage && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-sm mb-1">Kilométrage</p>
                <p className="text-white font-bold text-lg">{vehicle.mileage.toLocaleString()} km</p>
              </div>
            )}
            {vehicle.fuel_type && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-sm mb-1">Carburant</p>
                <p className="text-white font-bold text-lg">{vehicle.fuel_type}</p>
              </div>
            )}
          </div>

          {/* Détails supplémentaires */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {vehicle.transmission && (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="text-white/50 text-sm">Transmission</p>
                  <p className="text-white font-medium">{vehicle.transmission}</p>
                </div>
              </div>
            )}
            {vehicle.color && (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div>
                  <p className="text-white/50 text-sm">Couleur</p>
                  <p className="text-white font-medium">{vehicle.color}</p>
                </div>
              </div>
            )}
            {vehicle.doors && (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <div>
                  <p className="text-white/50 text-sm">Portes</p>
                  <p className="text-white font-medium">{vehicle.doors}</p>
                </div>
              </div>
            )}
            {vehicle.seats && (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-white/50 text-sm">Places</p>
                  <p className="text-white font-medium">{vehicle.seats}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {vehicle.description && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Description</h3>
              <p className="text-white/70 leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          {/* Équipements */}
          {vehicle.equipment && vehicle.equipment.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Équipements</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {vehicle.equipment.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bouton contact */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-center hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
            >
              Je suis intéressé
            </a>
            <a
              href="tel:06XXXXXXXX"
              className="flex-1 bg-white/5 border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Appeler</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}