import Link from 'next/link'

export default function CarteGriseCession() {
  return (
    <>
      <p>
        La vente d&apos;un véhicule d&apos;occasion s&apos;accompagne de <strong>démarches
        administratives</strong> : certificat de cession, déclaration en ligne, immatriculation au nom de
        l&apos;acquéreur. Ce texte vulgarise les grandes étapes pour l&apos;acheteur — les textes officiels
        et les tarifs évoluant, vérifiez toujours le site de l&apos;
        <strong>ANTS</strong> et les règles en vigueur au moment de votre achat.
      </p>

      <h2>Le certificat de cession : à quoi il sert</h2>
      <p>
        Le <strong>certificat de cession</strong> formalise le transfert de propriété entre vendeur et
        acheteur. Il doit être complété avec soin (identité des parties, date, kilométrage, mentions
        obligatoires). Une erreur peut retarder l&apos;immatriculation : prenez le temps de relire chaque
        champ avant signature.
      </p>

      <h2>Déclaration de cession et délais</h2>
      <p>
        Le vendeur a l&apos;obligation de <strong>déclarer la cession</strong> dans les délais prévus par la
        réglementation (via le service habilité). L&apos;acquéreur, de son côté, doit accomplir les démarches
        pour obtenir la <strong>carte grise</strong> à son nom et payer la taxe régionale correspondante. Ne
        confondez pas « possession des clés » et « immatriculation à jour » : rouler sans titre régulier
        expose à des sanctions.
      </p>

      <h2>Contrôle technique et contre-visite</h2>
      <p>
        Selon l&apos;âge du véhicule et la situation, un <strong>contrôle technique</strong> récent ou une
        contre-visite peut être exigé. En cas de réserves, demandez un devis de mise en conformité clair
        avant de signer un compromis de vente, surtout si vous achetez à distance.
      </p>

      <h2>Comment SafeCars vous accompagne</h2>
      <p>
        Lors d&apos;un achat via <Link href="/">SafeCars</Link>, nous vous guidons sur la{' '}
        <strong>liste des documents</strong> à préparer et le déroulé type, en coordination avec les règles
        applicables. Pour toute question sur un véhicule précis, la page{' '}
        <Link href="/contact">Contact</Link> centralise vos demandes.
      </p>

      <h2>En résumé</h2>
      <ul>
        <li>Documents complets et cohérents avant paiement définitif.</li>
        <li>Cession déclarée dans les délais légaux.</li>
        <li>Immatriculation acquéreur traitée sans procrastination.</li>
        <li>Sources officielles consultées pour le détail des taxes et formulaires.</li>
      </ul>
      <p>
        Ensuite, pensez à l&apos;entretien et à la présentation : nos{' '}
        <Link href="/lavage-auto-professionnel-sanguinet">prestations de lavage</Link> complètent souvent un
        projet auto global.
      </p>
    </>
  )
}
