'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import { getVehicleImageUrl } from '@/lib/vehicleImageUrl';
import Header from '@/components/allpages/Header';
import Footer from '@/components/allpages/Footer';
import PageHero from '@/components/ui/PageHero';
import VehicleCard from '@/components/ui/VehicleCard';

export default function NosVentes() {
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
        setVehicules(data || []);
        setBrands([...new Set((data || []).map((v) => v.marque).filter(Boolean))]);
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
        kicker="Catalogue"
        title="Nos véhicules"
        subtitle="Stock SafeCars à Sanguinet : occasions contrôlées, statut affiché. Ouvrez une fiche pour les détails ou contactez-nous pour un essai."
      />

      <main className="sc-container pb-20 -mt-2">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <p className="sc-muted text-sm">
            {loading ? 'Chargement…' : `${vehicules.filter((v) => v.statut !== 'vendu').length} véhicule(s) affiché(s)`}
          </p>
          <Link href="/nos-ventes/vendus" className="sc-text-cta text-sm">
            Véhicules vendus →
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
          <p className="sc-muted text-center py-16">Aucun véhicule disponible pour le moment.</p>
        )}

        {!loading &&
          brands.map((brand) => {
            const brandVehicules = vehicules.filter((v) => v.marque === brand && v.statut !== 'vendu');
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
                        onImageError={() => setImageErrors((p) => ({ ...p, [vehicle.id]: true }))}
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
