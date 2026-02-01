// Exemple de VehiculeModal.js corrigé

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';

export default function VehicleModal({ vehicle, onClose, getImageUrl }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);

  // Si getImageUrl n'est pas fourni en prop, créer une version locale
  const getImageUrlLocal = getImageUrl || ((imagePath) => {
    if (!imagePath) return null;
    
    // Si l'URL est déjà complète (http/https), la retourner directement
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Si le chemin commence par /uploads/, c'est une image locale - la retourner telle quelle
    if (imagePath.startsWith('/uploads/')) {
      return imagePath;
    }
    
    // Si le chemin commence par uploads/ (sans slash initial), ajouter le slash
    if (imagePath.startsWith('uploads/')) {
      return '/' + imagePath;
    }
    
    // Sinon, essayer Supabase Storage (pour compatibilité avec d'anciennes images)
    let cleanPath = imagePath
      .replace(/^\/+uploads\/+/, '')
      .replace(/^uploads\/+/, '')
      .replace(/^\/+vehicules\/+/, '')
      .replace(/^vehicules\/+/, '')
      .replace(/^\/+/, '');
    
    const { data } = supabaseClient.storage
      .from('vehicle-images')
      .getPublicUrl(cleanPath);
    
    return data?.publicUrl || null;
  });

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (vehicle.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (vehicle.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  if (!vehicle) return null;

  const currentImageUrl = vehicle.images?.[currentImageIndex] 
    ? getImageUrlLocal(vehicle.images[currentImageIndex])
    : null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center z-10">
          <h2 className="text-3xl font-bold text-white">
            {vehicle.marque} {vehicle.modele}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              {/* Image principale */}
              <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden">
                {currentImageUrl && !imageErrors[currentImageIndex] ? (
                  <img
                    src={currentImageUrl}
                    alt={`${vehicle.marque} ${vehicle.modele}`}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onError={() => handleImageError(currentImageIndex)}
                    onClick={() => setZoomedImage(currentImageUrl)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Navigation des images */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                    >
                      ‹
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                      {currentImageIndex + 1} / {vehicle.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Miniatures */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {vehicle.images.map((img, index) => {
                    const thumbUrl = getImageUrlLocal(img);
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex
                            ? 'border-blue-500'
                            : 'border-transparent hover:border-gray-600'
                        }`}
                      >
                        {thumbUrl && !imageErrors[`thumb-${index}`] ? (
                          <img
                            src={thumbUrl}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(`thumb-${index}`)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Détails */}
            <div className="space-y-6">
              {/* Prix */}
              <div className="bg-blue-600 rounded-xl p-6">
                <div className="text-4xl font-black text-white">
                  {vehicle.prix?.toLocaleString()} €
                </div>
              </div>

              {/* Caractéristiques principales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Année</div>
                  <div className="text-white font-bold text-xl">{vehicle.annee}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Kilométrage</div>
                  <div className="text-white font-bold text-xl">
                    {vehicle.kilometrage?.toLocaleString()} km
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Carburant</div>
                  <div className="text-white font-bold text-xl">{vehicle.carburant}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Transmission</div>
                  <div className="text-white font-bold text-xl">{vehicle.transmission}</div>
                </div>
              </div>

              {/* Couleur */}
              {vehicle.couleur && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Couleur</div>
                  <div className="text-white font-bold text-lg">{vehicle.couleur}</div>
                </div>
              )}

              {/* Description */}
              {vehicle.description && (
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Description</div>
                  <div className="text-white leading-relaxed">{vehicle.description}</div>
                </div>
              )}

              {/* Bouton Contact */}
              <button 
                onClick={() => {
                  onClose(); // Fermer le modal
                  router.push('/contact'); // Rediriger vers la page contact
                }} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors"
              >
                Demander plus d'informations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de zoom d'image */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-400 z-10"
          >
            ×
          </button>
          <img 
            src={zoomedImage} 
            alt="Image zoomée"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}