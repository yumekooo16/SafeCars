'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import VehicleModal from './VehicleModal.js';

export default function VehicleGallery({ featuredOnly = true }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupérer les véhicules depuis Supabase
  useEffect(() => {
    fetchVehicles();
  }, [featuredOnly]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true); // uniquement les véhicules disponibles

      if (featuredOnly) {
        query = query.eq('is_featured', true); // uniquement les “featured”
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/50 text-lg">Aucun véhicule disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Image du véhicule */}
            {vehicle.image_url ? (
              <img
                src={vehicle.image_url}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 group-hover:scale-110 transition-transform duration-700"></div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-amber-500/20 transition-all duration-500"></div>

            {/* Informations */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm text-amber-500 font-bold mb-1">{vehicle.brand}</p>
              <p className="text-2xl font-black text-white">{vehicle.model}</p>
              {vehicle.price && (
                <p className="text-lg font-bold text-white/80 mt-2">{vehicle.price.toLocaleString()} €</p>
              )}
            </div>

            {/* Badge "Nouveau" si récent */}
            {isRecent(vehicle.created_at) && (
              <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                NOUVEAU
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de détails */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </>
  );
}

// Vérifier si le véhicule est récent (moins de 7 jours)
function isRecent(createdAt) {
  const vehicleDate = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now - vehicleDate) / (1000 * 60 * 60 * 24));
  return diffDays < 7;
}
