'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import { getVehicleImageUrl } from '@/lib/vehicleImageUrl';
import Header from '@/components/allpages/Header.js';
import Footer from '@/components/allpages/Footer.js';

export default function NosVentes() {
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

      setVehicules(data || []);

      const uniqueBrands = [...new Set((data || []).map((v) => v.marque).filter(Boolean))];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error('Erreur récupération véhicules:', err);
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
        <h1 className="text-5xl font-black mb-6 text-center bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          Nos véhicules
        </h1>
        <p className="text-white/60 text-center max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          Stock SafeCars à Sanguinet (Landes) : occasions contrôlées, statut affiché (disponible, réservé, vendu).
          Ouvrez une fiche pour toutes les photos et les détails, ou{' '}
          <Link href="/contact" className="text-blue-400 hover:underline">
            contactez-nous
          </Link>{' '}
          pour un essai ou une reprise.
        </p>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse"></div>
            ))}
          </div>
        )}

        {!loading && vehicules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">Aucun véhicule disponible pour le moment.</p>
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
                    const imageUrl =
                      vehicle.images && vehicle.images.length > 0
                        ? getVehicleImageUrl(vehicle.images[0])
                        : null;

                    const isVendu = vehicle.statut === 'vendu';
                    const isReserve = vehicle.statut === 'reserve';

                    return (
                      <Link
                        key={vehicle.id}
                        href={`/vehicules/${vehicle.id}`}
                        className={`group relative aspect-square rounded-2xl overflow-hidden block ${
                          isVendu ? 'opacity-50' : ''
                        }`}
                      >
                        {imageUrl && !imageErrors[vehicle.id] ? (
                          <img
                            src={imageUrl}
                            alt={`${vehicle.marque} ${vehicle.modele}`}
                            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                              isVendu ? 'grayscale' : ''
                            }`}
                            onError={() => handleImageError(vehicle.id)}
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center ${
                              isVendu ? 'grayscale' : ''
                            }`}
                          >
                            <svg
                              className="w-20 h-20 text-white/20"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-amber-500/20 transition-all duration-500"></div>

                        {isVendu && (
                          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                            VENDU
                          </div>
                        )}
                        {isReserve && (
                          <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                            RÉSERVÉ
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-sm text-amber-500 font-bold mb-1">{vehicle.marque}</p>
                          <p className="text-xl font-black text-white">{vehicle.modele}</p>
                          {vehicle.prix && (
                            <p className="text-lg font-bold text-white/80 mt-1">
                              {vehicle.prix.toLocaleString()} €
                            </p>
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
