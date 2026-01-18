'use client';

import Header from '@/components/allpages/Header.js';
import Footer from '@/components/allpages/Footer.js';

export default function TarifsLavageAuto() {
  // Services de nettoyage extérieur
  const exterieurServices = [
    { name: 'Lavage complet (prélavage + lavage + rinçage)', price: 25 },
    { name: 'Séchage microfibre professionnel', price: 10 },
    { name: 'Cirage et protection carrosserie', price: 30 },
    { name: 'Nettoyage des jantes et pneus', price: 15 },
    { name: 'Déshuilage du compartiment moteur', price: 20 },
    { name: 'Nettoyage complet des vitres', price: 12 },
  ];

  // Services de nettoyage intérieur
  const interieurServices = [
    { name: 'Aspiration complète (sièges + tapis + coffre)', price: 35 },
    { name: 'Nettoyage des sièges (professionnel)', price: 45 },
    { name: 'Nettoyage des tapis et moquette', price: 40 },
    { name: 'Nettoyage du tableau de bord et plastiques', price: 25 },
    { name: 'Désodorisation intérieure', price: 20 },
    { name: 'Nettoyage des vitres intérieures', price: 15 },
    { name: 'Protection hydrofuge des sièges', price: 50 },
    { name: 'Nettoyage complet du coffre', price: 25 },
  ];

  // Services premium
  const premiumServices = [
    { name: 'Traitement céramique (protection 12 mois)', price: 80 },
    { name: 'Detailing complet (intérieur + extérieur)', price: 150 },
    { name: 'Polissage de la peinture', price: 70 },
  ];

  const ServiceSection = ({ title, services, icon }) => (
    <div className="mb-12">
      <h3 className="text-3xl font-bold mb-8 text-blue-400 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        {title}
      </h3>
      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-zinc-700 pb-4 hover:border-blue-400/50 transition">
            <span className="text-lg text-gray-200">{service.name}</span>
            <span className="text-2xl font-bold text-blue-400 ml-4">{service.price}€</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="mt-20 relative min-h-72 flex items-center justify-center py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-blue-400">Tarifs</span> Lavage Automobile
          </h1>
          <p className="text-xl text-gray-300">Nettoyage professionnel intérieur et extérieur avec matériel haut de gamme</p>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* Info Important */}
        <div className="bg-blue-400/10 border-l-4 border-blue-400 p-6 mb-16 rounded">
          <h2 className="text-blue-400 font-bold mb-2 text-lg">✓ Services Professionnels</h2>
          <p className="text-gray-300">Tous nos services utilisent du matériel professionnel de haute qualité pour garantir le meilleur rendu et la protection optimale de votre véhicule.</p>
        </div>

        {/* Services */}
        <ServiceSection 
          title="Nettoyage Extérieur" 
          services={exterieurServices}
          
        />
        
        <ServiceSection 
          title="Nettoyage Intérieur" 
          services={interieurServices}
          
        />

        <ServiceSection 
          title="Services Premium" 
          services={premiumServices}
          
        />

        {/* Info Pratiques */}
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg p-8 mt-16 border border-blue-400/30">
          <h3 className="text-2xl font-bold text-blue-400 mb-6">Informations Pratiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-blue-400 font-bold mb-2"> Durée estimée</div>
              <p className="text-gray-300">1h à 3h selon les services choisis</p>
            </div>
            <div>
              <div className="text-blue-400 font-bold mb-2"> Localisation</div>
              <p className="text-gray-300">À domicile ou à notre atelier</p>
            </div>
            <div>
              <div className="text-blue-400 font-bold mb-2">✓ Garantie</div>
              <p className="text-gray-300">Satisfaction client garantie</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-400 text-black font-bold py-4 px-8 rounded-lg hover:bg-blue-300 transition text-lg">
            Demander un Devis
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 border-t border-zinc-700 pt-16">
          <h2 className="text-3xl font-bold mb-10 text-blue-400">Questions Fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Quel type de produits utilisez-vous ?</h4>
              <p className="text-gray-300">Nous utilisons exclusivement des produits professionnels haut de gamme, sans danger pour votre véhicule et respectueux de l'environnement.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Combien de temps dure un nettoyage complet ?</h4>
              <p className="text-gray-300">Entre 2h et 4h selon l'état initial du véhicule et les services choisis.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Peut-on faire les services à domicile ?</h4>
              <p className="text-gray-300">Oui, nous nous déplaçons à votre domicile pour la plupart de nos services. Contactez-nous pour les modalités.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Avez-vous des forfaits spéciaux ?</h4>
              <p className="text-gray-300">Oui ! Contactez-nous pour des tarifs de groupe ou des contrats de nettoyage régulier.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
