import Link from 'next/link'

export default function ArnaqueAnnonceAuto() {
  return (
    <>
      <p>
        Les arnaques aux annonces automobiles prolifèrent : prix trop bas, vendeur « pressé », demande de
        virement avant visite, photos volées sur d&apos;autres annonces. Ce guide résume les{' '}
        <strong>signaux d&apos;alerte</strong> et les bons réflexes — avant d&apos;acheter auprès d&apos;un
        particulier ou d&apos;un professionnel comme <Link href="/">SafeCars</Link>.
      </p>

      <h2>Les classiques : prix irréaliste et urgence artificielle</h2>
      <p>
        Un véhicule affiché <strong>20 à 30 % sous le marché</strong> sans justification (accident, gros
        kilométrage, VEI) mérite une suspicion saine. L&apos;urgence (« je pars à l&apos;étranger demain »)
        sert souvent à vous faire sauter l&apos;étape de l&apos;inspection physique. Un professionnel sérieux
        accepte le contre-temps d&apos;un <strong>essai</strong> et d&apos;une vérification des papiers.
      </p>

      <h2>Photos et description : croiser les sources</h2>
      <p>
        Faites une <strong>recherche inverse d&apos;image</strong> sur une ou deux photos : si elles
        apparaissent sur d&apos;autres annonces à des prix différents, fuyez. Les descriptions floues (« très
        bien entretenu » sans facture) ou les refus systématiques de visio / visite réelle sont des indices
        faibles.
      </p>

      <h2>Paiement et identité du vendeur</h2>
      <ul>
        <li>Refusez un virement intégral avant d&apos;avoir vu le véhicule et le vendeur.</li>
        <li>Vérifiez l&apos;identité, la concordance carte grise / VIN / vendeur.</li>
        <li>Méfiez-vous des « intermédiaires » qui ne sont ni sur place ni joignables.</li>
      </ul>

      <h2>L&apos;intérêt d&apos;un professionnel local</h2>
      <p>
        Acheter via un <strong>courtier</strong> ou un vendeur établi à <strong>Sanguinet</strong> avec{' '}
        <Link href="/notre-methode">processus de contrôle</Link> et{' '}
        <Link href="/garantie-occasion">transparence sur la garantie</Link> réduit fortement ces risques. Vous
        savez où nous trouver, vous pouvez inspecter le véhicule et signer dans un cadre clair.
      </p>

      <h2>Check-list express avant de payer</h2>
      <ol>
        <li>Essai routier effectué.</li>
        <li>VIN cohérent avec documents et plaques.</li>
        <li>Historique d&apos;entretien ou au minimum points d&apos;usure expliqués.</li>
        <li>Contrat / facture et mode de paiement traçable.</li>
      </ol>
      <p>
        Pour aller plus loin sur la méthode d&apos;achat, lisez aussi notre{' '}
        <Link href="/blog/checklist-achat-voiture-occasion">checklist d&apos;achat occasion</Link> et
        parcourez le <Link href="/nos-ventes">stock SafeCars</Link>.
      </p>
    </>
  )
}
