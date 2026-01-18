'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/allpages/Header.js';
import Footer from '@/components/allpages/Footer.js';
import VehicleModal from '@/components/hero/VehicleModal.js';

export default function NosVentes() {
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true)
        .order('brand', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVehicles(data || []);

      // Liste unique des marques
      const uniqueBrands = [...new Set(data.map(v => v.brand))];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error('Erreur récupération véhicules:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Header />

      <main className="px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-16 text-center bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          Nos ventes
        </h1>

        {/* Loader */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Aucun véhicule */}
        {!loading && vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">Aucun véhicule disponible pour le moment.</p>
          </div>
        )}

        {/* Véhicules groupés par marque */}
        {!loading && vehicles.length > 0 && brands.map((brand) => {
          const brandVehicles = vehicles.filter(v => v.brand === brand);
          if (brandVehicles.length === 0) return null;

          return (
            <div key={brand} className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{brand}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {brandVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  >
                    {/* Image principale */}
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

                    {/* Infos véhicule */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm text-amber-500 font-bold mb-1">{vehicle.brand}</p>
                      <p className="text-xl font-black text-white">{vehicle.model}</p>
                      {vehicle.price && (
                        <p className="text-lg font-bold text-white/80 mt-1">{vehicle.price.toLocaleString()} €</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Modal pour détails + futur carousel */}
        {selectedVehicle && (
          <VehicleModal
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
