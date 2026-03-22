import Link from 'next/link'

export default function CourtierMandataireConcessionnaire() {
  return (
    <>
      <p>
        Entre <strong>mandataire</strong>, <strong>courtier automobile</strong> et{' '}
        <strong>concessionnaire</strong>, les rôles se croisent souvent dans les discours commerciaux —
        pourtant les attentes, la proximité et le type d&apos;accompagnement ne sont pas les mêmes. Voici une
        lecture claire pour choisir en connaissance de cause, puisque SafeCars agit comme{' '}
        <strong>courtier</strong> à Sanguinet.
      </p>

      <h2>Le concessionnaire : la marque, le neuf et l&apos;atelier</h2>
      <p>
        Le concessionnaire représente une marque : il vend du neuf, de l&apos;occasion « approuvée » par la
        marque, et dispose en général d&apos;un atelier agréé. Les prix neufs incluent la structure (showroom,
        stock constructeur). C&apos;est pertinent si vous visez un modèle très récent avec exigences de
        garantie constructeur strictes.
      </p>

      <h2>Le mandataire : souvent du neuf à prix affiné</h2>
      <p>
        Le mandataire achète ou fait immatriculer des véhicules neufs via des flux européens ou des remises
        volume ; l&apos;acheteur peut économiser sur le prix catalogue. En revanche, la relation est souvent
        plus « distante » (livraison, formalités), et le suivi post-achat dépend du réseau choisi. Ce n&apos;est
        pas le même métier qu&apos;un courtier qui sélectionne de l&apos;occasion au cas par cas.
      </p>

      <h2>Le courtier automobile : sélection, conseil et transparence</h2>
      <p>
        Le <strong>courtier</strong> se rémunère en rapprochant un besoin client et un véhicule pertinent —
        souvent en <strong>occasion</strong> contrôlée. L&apos;objectif est de gagner du temps, de sécuriser
        l&apos;historique et de clarifier le prix. Chez SafeCars, nous expliquons l&apos;état du véhicule,
        les points de contrôle réalisés et les options pour{' '}
        <Link href="/financement-voiture-occasion">financer</Link> ou{' '}
        <Link href="/reprise-auto">reprendre</Link> votre ancienne auto.
      </p>

      <h2>Quel modèle pour votre situation ?</h2>
      <ul>
        <li>
          <strong>Budget serré, occasion récente</strong> : courtier ou stock pro local pour comparer
          plusieurs marques.
        </li>
        <li>
          <strong>Neuf dernier millésime, marque précise</strong> : concessionnaire ou mandataire selon
          délai et prix.
        </li>
        <li>
          <strong>Peu de temps, besoin de confiance</strong> : interlocuteur unique qui assume le contrôle
          et la parole — voir <Link href="/notre-methode">notre méthode</Link>.
        </li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Il n&apos;y a pas de « meilleur » acteur universel : il y a un <strong>alignement</strong> avec votre
        projet. Si vous cherchez une <strong>occasion contrôlée</strong> et un suivi humain en Landes,{' '}
        <Link href="/contact">écrivez-nous</Link> ou consultez le <Link href="/nos-ventes">stock</Link>.
      </p>
    </>
  )
}
