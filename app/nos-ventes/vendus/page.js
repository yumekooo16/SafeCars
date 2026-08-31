'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import { getVehicleImageUrl } from '@/lib/vehicleImageUrl';
import Header from '@/components/allpages/Header.js';
import Footer from '@/components/allpages/Footer.js';

export default function VehiculesVendus() {
  const [vehicules, setVehicules] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('vehicules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const sold = (data || []).filter((v) => v.statut === 'vendu');
      setVehicules(sold);

      const uniqueBrands = [...new Set(sold.map((v) => v.marque).filter(Boolean))];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error('Erreur récupération véhicules vendus:', err);
      setVehicules([]);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (vehicleId) => {
    setImageErrors((prev) => ({ ...prev, [vehicleId]: true }));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="px-4 sm:px-6 lg:px-8 pt-24 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <h1 className="text-4xl font-black text-center bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Véhicules vendus
          </h1>
          <Link href="/nos-ventes" className="ml-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Retour aux ventes
          </Link>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse"></div>
            ))}
          </div>
        )}

        {!loading && vehicules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">Aucun véhicule vendu pour le moment.</p>
          </div>
        )}

        {!loading &&
          vehicules.length > 0 &&
          brands.map((brand) => {
            const brandVehicules = vehicules.filter((v) => v.marque === brand);
            if (brandVehicules.length === 0) return null;

            return (
              <div key={brand} className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{brand}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {brandVehicules.map((vehicle) => {
                    const imageUrl = vehicle.images && vehicle.images.length > 0 ? getVehicleImageUrl(vehicle.images[0]) : null;

                    return (
                      <Link
                        key={vehicle.id}
                        href={`/vehicules/${vehicle.id}`}
                        className="group relative aspect-square rounded-2xl overflow-hidden block opacity-60"
                      >
                        {imageUrl && !imageErrors[vehicle.id] ? (
                          <img
                            src={imageUrl}
                            alt={`${vehicle.marque} ${vehicle.modele}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale"
                            onError={() => handleImageError(vehicle.id)}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center grayscale">
                            <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-sm text-amber-500 font-bold mb-1">{vehicle.marque}</p>
                          <p className="text-xl font-black text-white">{vehicle.modele}</p>
                          {vehicle.prix && (
                            <p className="text-lg font-bold text-white/80 mt-1">{vehicle.prix.toLocaleString()} €</p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </main>

      <Footer />
    </div>
  );
}
