import Link from 'next/link';

function statusBadge(statut) {
  if (statut === 'vendu') return { label: 'Vendu', className: 'sc-badge--sold' };
  if (statut === 'reserve') return { label: 'Réservé', className: 'sc-badge--reserve' };
  return { label: 'Disponible', className: 'sc-badge--available' };
}

export default function VehicleCard({ vehicle, imageUrl, onImageError, dimmed = false }) {
  const badge = statusBadge(vehicle.statut);
  const sold = vehicle.statut === 'vendu';

  return (
    <Link
      href={`/vehicules/${vehicle.id}`}
      className={`sc-fleet-card group block ${dimmed || sold ? 'opacity-70' : ''}`}
    >
      <div className="sc-fleet-card-media">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${vehicle.marque} ${vehicle.modele}`}
            className={`sc-fleet-card-image absolute inset-0 w-full h-full object-cover ${sold ? 'grayscale' : ''}`}
            onError={onImageError}
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--surface-raised)] flex items-center justify-center text-[var(--text-subtle)] text-sm">
            Photo à venir
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <span className={`sc-badge ${badge.className}`}>{badge.label}</span>
        </div>
        {vehicle.prix != null && (
          <div className="sc-fleet-card-price">
            <span>À partir de</span>
            <strong>{Number(vehicle.prix).toLocaleString('fr-FR')} €</strong>
          </div>
        )}
      </div>
      <div className="sc-fleet-card-body">
        <p className="sc-fleet-card-brand">{vehicle.marque}</p>
        <p className="sc-fleet-card-model sc-display">{vehicle.modele}</p>
        <div className="sc-fleet-specs">
          {vehicle.annee ? (
            <div className="sc-fleet-spec">
              <dt>Année</dt>
              <dd>{vehicle.annee}</dd>
            </div>
          ) : null}
          {vehicle.kilometrage != null ? (
            <div className="sc-fleet-spec">
              <dt>Km</dt>
              <dd>{Number(vehicle.kilometrage).toLocaleString('fr-FR')}</dd>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
