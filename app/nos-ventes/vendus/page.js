'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import { getVehicleImageUrl } from '@/lib/vehicleImageUrl';
import Header from '@/components/allpages/Header';
import Footer from '@/components/allpages/Footer';
import PageHero from '@/components/ui/PageHero';
import VehicleCard from '@/components/ui/VehicleCard';

export default function VehiculesVendus() {
  const [vehicules, setVehicules] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabaseClient
          .from('vehicules')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        const sold = (data || []).filter((v) => v.statut === 'vendu');
        setVehicules(sold);
        setBrands([...new Set(sold.map((v) => v.marque).filter(Boolean))]);
      } catch {
        setVehicules([]);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Archives"
        title="Véhicules vendus"
        subtitle="Quelques références déjà placées par SafeCars — le stock évolue régulièrement."
      />

      <main className="sc-container pb-20 -mt-2">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <p className="sc-muted text-sm">
            {loading ? 'Chargement…' : `${vehicules.length} véhicule(s) vendu(s)`}
          </p>
          <Link href="/nos-ventes" className="sc-text-cta text-sm">
            Retour au catalogue →
          </Link>
        </div>

        {loading && (
          <div className="sc-fleet-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] sc-card animate-pulse bg-[var(--surface)]" />
            ))}
          </div>
        )}

        {!loading && vehicules.length === 0 && (
          <p className="sc-muted text-center py-16">Aucun véhicule vendu pour le moment.</p>
        )}

        {!loading &&
          brands.map((brand) => {
            const brandVehicules = vehicules.filter((v) => v.marque === brand);
            if (brandVehicules.length === 0) return null;

            return (
              <section key={brand} className="mb-16">
                <h2 className="sc-display text-2xl mb-6 pb-4 border-b border-[var(--border)]">{brand}</h2>
                <div className="sc-fleet-grid">
                  {brandVehicules.map((vehicle) => {
                    const imageUrl =
                      vehicle.images?.[0] && !imageErrors[vehicle.id]
                        ? getVehicleImageUrl(vehicle.images[0])
                        : null;

                    return (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        imageUrl={imageUrl}
                        dimmed
                        onImageError={() =>
                          setImageErrors((prev) => ({ ...prev, [vehicle.id]: true }))
                        }
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
      </main>

      <Footer />
    </div>
  );
}
