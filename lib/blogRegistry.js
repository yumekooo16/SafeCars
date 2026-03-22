import ChecklistAchatOccasion from '@/components/blog/posts/ChecklistAchatOccasion'
import OccasionLandesSanguinet from '@/components/blog/posts/OccasionLandesSanguinet'
import CourtierMandataireConcessionnaire from '@/components/blog/posts/CourtierMandataireConcessionnaire'
import CarteGriseCession from '@/components/blog/posts/CarteGriseCession'
import ArnaqueAnnonceAuto from '@/components/blog/posts/ArnaqueAnnonceAuto'

export const blogRegistry = {
  'checklist-achat-voiture-occasion': {
    title: 'Checklist achat voiture d’occasion : guide pratique SafeCars',
    description:
      'Budget, historique, essai routier, reprise et documents : la checklist pour acheter une occasion en toute sécurité, par SafeCars Sanguinet.',
    date: '15 mars 2025',
    Content: ChecklistAchatOccasion,
  },
  'acheter-occasion-landes-sanguinet': {
    title: 'Acheter une occasion dans les Landes et près de Sanguinet',
    description:
      'Marché local, types de véhicules adaptés au territoire, transparence des prix et services SafeCars en Nouvelle-Aquitaine.',
    date: '12 mars 2025',
    Content: OccasionLandesSanguinet,
  },
  'courtier-mandataire-ou-concessionnaire': {
    title: 'Courtier auto, mandataire ou concessionnaire : quelles différences ?',
    description:
      'Comprendre les rôles du courtier, du mandataire et du concessionnaire pour choisir le bon canal d’achat automobile.',
    date: '8 mars 2025',
    Content: CourtierMandataireConcessionnaire,
  },
  'carte-grise-et-certificat-cession-occasion': {
    title: 'Carte grise et certificat de cession : grandes étapes pour une occasion',
    description:
      'Cession, déclaration, immatriculation et contrôle technique : points de vigilance lors de l’achat d’un véhicule d’occasion.',
    date: '5 mars 2025',
    Content: CarteGriseCession,
  },
  'reconnaitre-arnaque-annonce-auto': {
    title: 'Reconnaître une arnaque sur une annonce automobile',
    description:
      'Signaux d’alerte, paiement, photos volées et intérêt d’un professionnel local pour éviter les arnaques en ligne.',
    date: '1 mars 2025',
    Content: ArnaqueAnnonceAuto,
  },
}

export const blogSlugs = Object.keys(blogRegistry)

export function getBlogPost(slug) {
  return blogRegistry[slug] || null
}
