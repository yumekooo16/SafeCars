"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/allpages/Footer";
import Header from "@/components/allpages/Header";
import VehicleCard from "@/components/ui/VehicleCard";
import { supabaseClient } from "@/lib/supabaseClient";
import { getVehicleImageUrl } from "@/lib/vehicleImageUrl";

const STEPS = [
  { num: "01", title: "Parcourez", desc: "Explorez le stock en ligne ou venez en showroom à Sanguinet." },
  { num: "02", title: "Essayez", desc: "Réservez un essai routier — nous prenons le temps de vous écouter." },
  { num: "03", title: "Validez", desc: "Offre, financement ou reprise : nous sécurisons les démarches avec vous." },
  { num: "04", title: "Roulez", desc: "Repartez sereinement, avec un suivi si vous en avez besoin." },
];

const BENEFITS = [
  { title: "Véhicules contrôlés", desc: "Chaque occasion est inspectée et présentée avec transparence sur l'état réel." },
  { title: "Prix clairs", desc: "Pas de frais cachés : le prix affiché correspond à ce que nous vous expliquons." },
  { title: "Un interlocuteur", desc: "Courtier local à Sanguinet — conseil, essai et suivi du début à la fin." },
];

export default function HomePage() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabaseClient
          .from("vehicules")
          .select("*")
          .neq("statut", "vendu")
          .order("created_at", { ascending: false })
          .limit(3);
        if (error) throw error;
        setVehicules(data || []);
      } catch {
        setVehicules([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="sc-page">
      <Header />

      <section className="sc-hero-split">
        <div className="sc-container sc-hero-copy">
          <div className="max-w-xl">
            <p className="sc-kicker">Sanguinet · Landes · Bassin d&apos;Arcachon</p>
            <h1 className="sc-hero-title">
              Des occasions contrôlées.
              <em> Un courtier qui vous accompagne.</em>
            </h1>
            <p className="sc-lead mt-6 max-w-lg">
              SafeCars sélectionne, vérifie et vend des véhicules d&apos;occasion avec transparence — plus un service de lavage professionnel sur place.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="#vehicules" className="sc-btn sc-btn-primary sc-btn-lg">
                Voir le stock
              </Link>
              <Link href="/contact" className="sc-btn sc-btn-outline sc-btn-lg">
                Nous contacter
              </Link>
            </div>
            <div className="sc-figures mt-12 !border-0 !pt-0 !pb-0 grid-cols-2 md:grid-cols-2">
              <div>
                <p className="sc-figure-value">100+</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">Véhicules vendus</p>
              </div>
              <div>
                <p className="sc-figure-value">98%</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">Clients satisfaits</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sc-hero-media">
          <Image
            src="/image/Vente_de_voitures_en_journée.png"
            alt="SafeCars — courtier automobile Sanguinet"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 960px) 55vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent lg:bg-gradient-to-r lg:from-[var(--bg)] lg:via-transparent lg:to-transparent" />
          <p className="sc-hero-media-cap">Occasions contrôlées · Sanguinet</p>
        </div>
      </section>

      <section id="vehicules" className="sc-section scroll-mt-24">
        <div className="sc-container">
          <div className="sc-section-header sc-section-header--row flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="sc-kicker">Stock</p>
              <h2 className="sc-section-title">À disposition</h2>
              <p className="sc-lead mt-3 max-w-lg">
                Quelques modèles du moment — statut affiché, fiche détaillée en un clic.
              </p>
            </div>
            <Link href="/nos-ventes" className="sc-text-cta shrink-0">
              Tout le catalogue →
            </Link>
          </div>

          {loading && (
            <div className="sc-fleet-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/3] sc-card animate-pulse bg-[var(--surface)]" />
              ))}
            </div>
          )}

          {!loading && vehicules.length === 0 && (
            <p className="sc-muted text-center py-12">Aucun véhicule disponible pour le moment.</p>
          )}

          {!loading && vehicules.length > 0 && (
            <div className="sc-fleet-grid">
              {vehicules.map((vehicle) => {
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
          )}
        </div>
      </section>

      <section className="sc-section sc-section-alt">
        <div className="sc-container">
          <div className="max-w-2xl">
            <p className="sc-kicker">Territoire</p>
            <h2 className="sc-section-title">Votre courtier près du Bassin d&apos;Arcachon</h2>
          </div>
          <div className="sc-prose mt-8">
            <p>
              Basés à <strong>Sanguinet</strong>, nous accompagnons particuliers et professionnels pour l&apos;achat d&apos;une{" "}
              <Link href="/nos-ventes" className="sc-link">voiture d&apos;occasion</Link> en toute confiance.
              Historique vérifié, état expliqué clairement, conseils adaptés à votre budget — sur les{" "}
              <strong>Landes</strong>, la <strong>Gironde</strong> et les départements voisins.
            </p>
            <p className="mt-5">
              En parallèle, notre{" "}
              <Link href="/tarifs-lavage-auto" className="sc-link">service de lavage</Link> (medium, premium, gold)
              préserve la valeur et le confort de votre véhicule. Questions sur un modèle ou un essai ?{" "}
              <Link href="/contact" className="sc-link">Contactez-nous</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="sc-section scroll-mt-24">
        <div className="sc-container">
          <p className="sc-kicker">Engagements</p>
          <h2 className="sc-section-title">Pourquoi SafeCars</h2>
          <div className="sc-benefit-grid mt-10">
            {BENEFITS.map((b) => (
              <article key={b.title} className="sc-card sc-card-padded">
                <h3 className="sc-display text-xl">{b.title}</h3>
                <p className="sc-muted mt-3 text-sm leading-relaxed">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sc-section sc-section-alt">
        <div className="sc-container">
          <p className="sc-kicker">Parcours</p>
          <h2 className="sc-section-title">Acheter en 4 étapes</h2>
          <div className="sc-timeline mt-10">
            {STEPS.map((step) => (
              <article key={step.num}>
                <span className="sc-timeline-index">{step.num}</span>
                <h3 className="sc-timeline-title">{step.title}</h3>
                <p className="sc-timeline-text">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sc-close">
        <div className="sc-container">
          <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end">
            <div>
              <p className="sc-kicker">Projet auto</p>
              <h2 className="sc-close-title mt-3">
                Prêt à trouver<br />votre prochaine voiture ?
              </h2>
              <p className="sc-lead mt-4 max-w-md">
                Parcourez le stock, posez vos questions ou prenez rendez-vous pour un essai à Sanguinet.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link href="/nos-ventes" className="sc-btn sc-btn-primary sc-btn-lg w-full md:w-auto justify-center">
                Voir tous les véhicules
              </Link>
              <Link href="/contact" className="sc-btn sc-btn-secondary sc-btn-lg w-full md:w-auto justify-center">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
