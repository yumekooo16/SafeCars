import Link from 'next/link'

export function NotreMethodeBody() {
  return (
    <>
      <p>
        Chez <strong>SafeCars</strong>, une &quot;occasion contrôlée&quot; n&apos;est pas un simple mot sur
        une étiquette : c&apos;est une <strong>méthode</strong> pour vous donner des repères clairs avant
        l&apos;essai et la décision d&apos;achat. Basés à <strong>Sanguinet</strong> dans les{' '}
        <strong>Landes (40)</strong>, nous sélectionnons des véhicules en nous appuyant sur l&apos;historique,
        l&apos;état visible et les besoins réels des conducteurs du <strong>Bassin d&apos;Arcachon</strong> et
        de la région.
      </p>
      <h2>Sélection et sourcing</h2>
      <p>
        Nous privilégions les véhicules dont la <strong>traçabilité</strong> est exploitable : kilométrage
        cohérent avec l&apos;usure, documents disponibles, absence de signaux d&apos;alerte majeurs sur
        l&apos;identité et l&apos;historique. Chaque modèle rejoint notre{' '}
        <Link href="/nos-ventes">stock en ligne</Link> lorsque nous pouvons en assumer la description avec
        sérieux — pas uniquement lorsque le prix est agressif sur le papier.
      </p>
      <h2>Contrôle et transparence</h2>
      <p>
        Un contrôle, ce sont des <strong>points de vérification</strong> mécaniques, esthétiques et
        électroniques expliqués au client : niveaux, freinage, train roulant, climatisation, éclairage,
        électronique embarquée, état des pneus. Nous vous présentons ce qui est sain, ce qui est à
        surveiller, et ce qui a été pris en charge avant la vente. La transparence sur le{' '}
        <strong>prix</strong> va de pair : il reflète l&apos;état, l&apos;équipement et le marché local.
      </p>
      <h2>Essai et accompagnement</h2>
      <p>
        L&apos;<strong>essai routier</strong> est le moment où le projet devient concret. Nous vous laissons
        le temps de tester sur des routes représentatives, sans pression commerciale abusive. Ensuite,
        discutons <Link href="/financement-voiture-occasion">financement</Link>,{' '}
        <Link href="/reprise-auto">reprise</Link> ou simple achat comptant selon votre situation.
      </p>
      <h2>Après la vente</h2>
      <p>
        Retrouvez nos engagements sur la <Link href="/garantie-occasion">garantie</Link> et la{' '}
        <Link href="/faq-achat-auto">FAQ</Link>. Pour l&apos;entretien esthétique, nos{' '}
        <Link href="/Tarifs-Lavage-auto">tarifs de lavage</Link> complètent souvent le suivi de votre
        véhicule.
      </p>
      <p>
        <Link href="/contact" className="text-blue-400 font-semibold">
          Contactez-nous
        </Link>{' '}
        pour préciser votre recherche ou planifier une visite.
      </p>
    </>
  )
}

export function RepriseBody() {
  return (
    <>
      <p>
        La <strong>reprise de votre ancien véhicule</strong> peut financer une partie de votre prochain achat
        et simplifier les démarches lorsque tout est traité avec le même interlocuteur. SafeCars accompagne
        les particuliers en <strong>Landes</strong>, <strong>Gironde</strong> limitrophe et sur le{' '}
        <strong>Bassin d&apos;Arcachon</strong> pour une estimation réaliste et des documents en règle.
      </p>
      <h2>Ce que nous regardons en priorité</h2>
      <ul>
        <li>Marque, modèle, finition et kilométrage.</li>
        <li>Historique d&apos;entretien et état des pneus / freins.</li>
        <li>État carrosserie et intérieur (impact sur la valeur de revente).</li>
        <li>Dernier contrôle technique et éventuelles réserves.</li>
      </ul>
      <h2>Documents utiles à préparer</h2>
      <p>
        Carte grise, dernier contrôle technique, carnet d&apos;entretien, factures récentes : chaque pièce
        permet d&apos;affiner le prix et d&apos;accélérer la reprise. Si vous achetez en parallèle une
        occasion sur notre <Link href="/nos-ventes">stock</Link>, nous pouvons intégrer reprise et achat
        dans un <strong>parcours unique</strong>.
      </p>
      <h2>Limites et honnêteté</h2>
      <p>
        Une reprise professionnelle n&apos;égale pas toujours la vente entre particuliers « au prix du
        marché théorique » : en échange, vous gagnez en <strong>sécurité</strong>, en gain de temps et en
        clarté administrative. Nous préférons un chiffre défendable à une promesse irréaliste.
      </p>
      <p>
        <Link href="/contact" className="text-blue-400 font-semibold">
          Demander une estimation de reprise
        </Link>
      </p>
    </>
  )
}

export function FinancementBody() {
  return (
    <>
      <p>
        Le <strong>financement</strong> d&apos;une voiture d&apos;occasion peut passer par le comptant, le
        crédit affecté, la LOA ou d&apos;autres solutions selon votre profil et l&apos;âge du véhicule.
        SafeCars vous aide à <strong>structurer le projet</strong> : budget mensuel, apport, durée, coût
        total — sans jargon inutile.
      </p>
      <h2>Comptant vs crédit</h2>
      <p>
        Le comptant reste souvent le plus simple si votre épargne le permet. Le <strong>crédit</strong>{' '}
        lisse l&apos;effort et peut débloquer un véhicule plus récent ou mieux équipé ; il impose de comparer
        TAEG, assurances optionnelles et pénalités de remboursement anticipé. Nous vous orientons vers des
        partenaires ou des solutions adaptées lorsque c&apos;est pertinent.
      </p>
      <h2>Cohérence avec votre reprise</h2>
      <p>
        Si vous avez une <Link href="/reprise-auto">reprise</Link>, intégrez-la dans le calcul de
        l&apos;apport ou du montant à financer. Cela modifie parfois sensiblement la mensualité ou la durée
        recommandée.
      </p>
      <h2>Transparence</h2>
      <p>
        Aucun engagement n&apos;est pris tant que vous n&apos;avez pas validé une offre claire. Parcourez
        d&apos;abord nos <Link href="/nos-ventes">véhicules disponibles</Link>, puis{' '}
        <Link href="/contact">contactez-nous</Link> pour un scénario chiffré.
      </p>
    </>
  )
}

export function ZoneInterventionBody() {
  return (
    <>
      <p>
        SafeCars est implanté à <strong>Sanguinet (40460)</strong>, au cœur des <strong>Landes</strong>, avec
        une clientèle régulière sur le <strong>Bassin d&apos;Arcachon</strong>, <strong>Bordeaux</strong> et
        les départements voisins. Nous organisons rendez-vous, essais et remises de véhicule selon des
        plannings réalistes — la proximité humaine fait partie du service.
      </p>
      <h2>Zones desservies (indicatif)</h2>
      <ul>
        <li>Landes : Sanguinet, Biscarrosse, Parentis, Mont-de-Marsan, Dax (selon disponibilités).</li>
        <li>Gironde : Arcachon, La Teste-de-Buch, Biganos, et axes vers Bordeaux.</li>
        <li>Autres villes : sur demande et selon projet (longue distance possible au cas par cas).</li>
      </ul>
      <h2>Prestations liées</h2>
      <p>
        Outre la vente d&apos;<Link href="/nos-ventes">occasion</Link>, nos{' '}
        <Link href="/lavage-auto-professionnel-sanguinet">prestations de lavage</Link> peuvent être
        planifiées pour les clients locaux. <Link href="/contact">Écrivez-nous</Link> en précisant votre
        commune.
      </p>
    </>
  )
}

export function GarantieBody() {
  return (
    <>
      <p>
        La <strong>garantie</strong> sur une occasion varie selon l&apos;âge du véhicule, le kilométrage et
        les solutions souscrites. SafeCars vise la <strong>clarté</strong> : ce qui est couvert, ce qui ne
        l&apos;est pas, et comment agir en cas de sinistre mécanique couvert.
      </p>
      <h2>Ce qu&apos;une garantie occasion couvre souvent</h2>
      <p>
        Les pièces moteur, boîte, pont ou organes majeurs peuvent être inclus selon le contrat ; l&apos;usure
        normale, les consommables (pneus, plaquettes, batterie usée) et les dommages liés à un mauvais
        entretien en sont généralement exclus. Lisez toujours le <strong>descriptif contractuel</strong>{' '}
        fourni au moment de l&apos;achat.
      </p>
      <h2>Notre approche</h2>
      <p>
        Nous préférons annoncer l&apos;état réel du véhicule <strong>avant</strong> la vente pour limiter
        les surprises. La <Link href="/notre-methode">méthode de contrôle</Link> et la{' '}
        <Link href="/faq-achat-auto">FAQ</Link> répondent aux questions fréquentes.
      </p>
      <p>
        <Link href="/contact" className="text-blue-400 font-semibold">
          Questions sur la garantie d&apos;un véhicule précis
        </Link>
      </p>
    </>
  )
}

export function CourtierSanguinetBody() {
  return (
    <>
      <p>
        Choisir un <strong>courtier automobile à Sanguinet</strong>, c&apos;est opter pour un interlocuteur
        qui sélectionne l&apos;occasion en fonction de <strong>votre usage</strong>, pas seulement du stock
        disponible ce jour-là. SafeCars combine <strong>proximité locale</strong> (Landes, Arcachon) et
        exigence sur la qualité des véhicules présentés.
      </p>
      <h2>Pourquoi ne pas chercher seul sur les plateformes ?</h2>
      <p>
        Les annonces en ligne sont utiles mais chronophages : filtrer les arnaques, organiser des essais,
        vérifier les papiers. Un courtier structure ces étapes. Lisez aussi notre article{' '}
        <Link href="/blog/reconnaitre-arnaque-annonce-auto">arnaques et annonces</Link>.
      </p>
      <h2>Ce que nous apportons</h2>
      <ul>
        <li>Conseil sur le budget total (achat + frais + entretien de prise en main).</li>
        <li>Sélection et contrôle selon notre méthode.</li>
        <li>Accompagnement reprise et financement si besoin.</li>
        <li>Service lavage auto pour soigner votre véhicule.</li>
      </ul>
      <p>
        <Link href="/nos-ventes">Voir le stock</Link> ·{' '}
        <Link href="/contact" className="font-semibold text-blue-400">
          Nous contacter
        </Link>
      </p>
    </>
  )
}

export function LivraisonBody() {
  return (
    <>
      <p>
        Selon les cas, la <strong>remise du véhicule</strong> a lieu à Sanguinet ou après accord sur un
        autre lieu raisonnable. Nous définissons ensemble la <strong>date</strong>, les documents à signer
        et le mode de paiement. L&apos;objectif est que vous repartiez en toute clarté sur ce qui a été fait
        et ce qui reste à votre charge (assurance, carte grise à finaliser si applicable, etc.).
      </p>
      <h2>Avant la remise</h2>
      <p>
        Vérification commune du véhicule, explication des équipements, remise des clés et documents. Si une{' '}
        <Link href="/reprise-auto">reprise</Link> est intégrée, les formalités sont coordonnées pour éviter
        les trous administratifs.
      </p>
      <h2>Distance</h2>
      <p>
        Pour les clients éloignés, nous étudions les options au cas par cas. Commencez par une demande via{' '}
        <Link href="/contact">le formulaire de contact</Link> en indiquant votre ville.
      </p>
    </>
  )
}

export function FaqBody() {
  return (
    <>
      <h2>Puis-je essayer le véhicule avant d&apos;acheter ?</h2>
      <p>
        Oui, l&apos;<strong>essai</strong> est un passage clé. Contactez-nous pour fixer un créneau sur le
        modèle qui vous intéresse dans notre <Link href="/nos-ventes">stock</Link>.
      </p>
      <h2>Proposez-vous la reprise de mon ancienne voiture ?</h2>
      <p>
        Oui, voir la page <Link href="/reprise-auto">reprise auto</Link> et préparez vos documents pour une
        estimation sérieuse.
      </p>
      <h2>Comment financer mon achat ?</h2>
      <p>
        Selon votre profil : comptant ou crédit. Détails sur{' '}
        <Link href="/financement-voiture-occasion">financement</Link>.
      </p>
      <h2>Où êtes-vous situés ?</h2>
      <p>
        À <strong>Sanguinet (Landes)</strong>. La page <Link href="/zone-intervention-landes">zone
        d&apos;intervention</Link> précise les secteurs habituels.
      </p>
      <h2>Faites-vous du lavage auto ?</h2>
      <p>
        Oui : <Link href="/lavage-auto-professionnel-sanguinet">lavage professionnel</Link> et{' '}
        <Link href="/Tarifs-Lavage-auto">grille tarifaire</Link>.
      </p>
      <h2>Comment vous écrire ?</h2>
      <p>
        Via la page <Link href="/contact">Contact</Link> (téléphone et formulaire).
      </p>
    </>
  )
}

export function LavageProBody() {
  return (
    <>
      <p>
        Au-delà de la vente d&apos;occasion, SafeCars propose un <strong>service de lavage automobile</strong>{' '}
        à <strong>Sanguinet</strong> : intérieur, extérieur, options sièges. C&apos;est idéal avant une{' '}
        <Link href="/reprise-auto">reprise</Link>, après un achat, ou pour entretenir régulièrement votre
        habitacle.
      </p>
      <h2>Notre positionnement</h2>
      <p>
        Produits professionnels, finitions soignées, fourchettes de temps réalistes. Les{' '}
        <strong>tarifs détaillés</strong> (medium, premium, gold, extérieur) sont sur la page{' '}
        <Link href="/Tarifs-Lavage-auto">Tarifs lavage auto</Link> — consultez-la pour chiffrer votre
        prestation.
      </p>
      <h2>Pourquoi confier l&apos;intérieur à un pro ?</h2>
      <p>
        Les textiles et cuirs réagissent mal aux produits ménagers agressifs. Un nettoyage adapté préserve
        les matériaux et la <strong>valeur de revente</strong>, surtout si vous présentez le véhicule à un
        acheteur ou à un professionnel.
      </p>
      <p>
        <Link href="/contact" className="text-blue-400 font-semibold">
          Demander un créneau ou un devis
        </Link>
      </p>
    </>
  )
}
