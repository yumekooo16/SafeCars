'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { supabaseClient } from '@/lib/supabaseClient';
import VehiculeModal from './VehiculeModal'; // attention au nom exact

export default function VehicleGallery({ featuredOnly = true, limit = 3, columns = 3 }) {
  const [vehicules, setVehicules] = useState([]);
  const [selectedVehicule, setSelectedVehicule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour obtenir l'URL correcte de l'image
  const getImageUrl = (imagePath) => {
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
  };

  useEffect(() => {
    fetchVehicules();
  }, [featuredOnly, limit]);

  const fetchVehicules = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      let query = supabase
        .from('vehicules')
        .select('*')
        .eq('statut', 'disponible');

      if (featuredOnly) query = query.eq('is_featured', true);
      query = query.order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);

      const { data, error } = await query;

      console.log('Supabase data:', data); // ← On voit ce qui est récupéré
      if (error) throw new Error(error.message);

      if (!data || data.length === 0) {
        setErrorMessage('Aucun véhicule ne correspond aux critères.');
      }

      setVehicules(data || []);
    } catch (error) {
      console.error('Erreur Supabase:', error);
      setErrorMessage(error.message || 'Erreur inconnue');
      setVehicules([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-xl bg-gray-800 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (vehicules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">{errorMessage || 'Aucun véhicule disponible pour le moment.'}</p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
        {vehicules.map((vehicule) => (
          <div
            key={vehicule.id}
            onClick={() => setSelectedVehicule(vehicule)}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {(() => {
              const imagePath = vehicule.image_url || (vehicule.images && vehicule.images[0]);
              const imageUrl = imagePath ? getImageUrl(imagePath) : null;
              
              return imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`${vehicule.brand || vehicule.marque} ${vehicule.model || vehicule.modele}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-white">
                  Pas d'image
                </div>
              );
            })()}


            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm text-amber-400 font-semibold">{vehicule.brand || vehicule.marque}</p>
              <p className="text-xl font-bold">{vehicule.model || vehicule.modele}</p>
              {(vehicule.price || vehicule.prix) && (
                <p className="text-lg text-gray-200 mt-1">{(vehicule.price || vehicule.prix).toLocaleString()} €</p>
              )}
            </div>

            {isRecent(vehicule.created_at) && (
              <div className="absolute top-4 right-4 bg-amber-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                NOUVEAU
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedVehicule && (
        <VehiculeModal vehicle={selectedVehicule} onClose={() => setSelectedVehicule(null)} getImageUrl={getImageUrl} />
      )}
    </>
  );
}

function isRecent(createdAt) {
  const vehiculeDate = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now - vehiculeDate) / (1000 * 60 * 60 * 24));
  return diffDays < 7;
}
