'use client'

import React from "react";
import Link from "next/link";

export default function CGU() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] mb-4">
            CONDITIONS GÉNÉRALES D&apos;UTILISATION
          </h1>
          <div className="w-24 h-[1px] bg-white/40 mt-6"></div>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-32 text-white">
        
        {/* Introduction */}
        <div className="mb-20 text-center">
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Les présentes conditions générales d&apos;utilisation régissent l&apos;accès et l&apos;utilisation 
            du site www.safecars.fr. En accédant au site, vous acceptez sans réserve 
            les présentes conditions.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          
          {/* Article 1 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 1 - Objet
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Les présentes CGU ont pour objet de définir les modalités et conditions d&apos;utilisation 
              du site www.safecars.fr ainsi que les droits et obligations des parties dans ce cadre. 
              Le site permet aux utilisateurs de découvrir les services de location de véhicules proposés par SafeCars.
            </p>
          </article>

          {/* Article 2 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 2 - Accès au site
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>
                Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet. 
                Tous les frais nécessaires pour l&apos;accès aux services (matériel informatique, connexion Internet, etc.) 
                sont à la charge de l&apos;utilisateur.
              </p>
              <p>
                SafeCars met en œuvre tous les moyens raisonnables pour assurer un accès de qualité au site, 
                mais n&apos;est tenue à aucune obligation d&apos;y parvenir. L&apos;éditeur ne peut être tenu responsable 
                en cas d&apos;indisponibilité technique pour quelque raison que ce soit.
              </p>
            </div>
          </article>

          {/* Article 3 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 3 - Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>
                L&apos;ensemble du contenu présent sur le site (structure, textes, logos, images, vidéos, etc.) 
                est la propriété exclusive de SafeCars ou de ses partenaires. Toute reproduction, distribution, modification, 
                adaptation, retransmission ou publication de ces éléments est strictement interdite sans l&apos;accord écrit de Safe Cars.
              </p>
              <p>
                Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une 
                contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </div>
          </article>

          {/* Article 4 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 4 - Données personnelles
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>
                SafeCars s&apos;engage à respecter le RGPD pour le traitement des données à caractère personnel.
              </p>
              <p>
                Pour plus d&apos;informations, consultez notre politique de confidentialité.
              </p>
              <Link 
                href="/pages/politique-confidentialite" 
                className="inline-block mt-4 text-white hover:text-gray-300 transition-colors border-b border-white/30 hover:border-gray-300"
              >
                Consulter notre politique de confidentialité
              </Link>
            </div>
          </article>

          {/* Article 5 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 5 - Responsabilité
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>
                SafeCars ne pourra être tenue responsable des dommages directs et indirects causés 
                au matériel de l&apos;utilisateur lors de l&apos;accès au site.
              </p>
              <p>
                Les informations sur le site sont fournies avec soin mais SafeCars ne garantit pas 
                l&apos;exactitude ou l&apos;actualité complète des contenus.
              </p>
            </div>
          </article>

          {/* Article 6 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 6 - Liens hypertextes
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Le site peut contenir des liens vers d&apos;autres sites. Safe Cars n&apos;exerce aucun contrôle 
              sur ces sites et décline toute responsabilité quant à leur contenu ou accessibilité.
            </p>
          </article>

          {/* Article 7 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 7 - Cookies
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Le site peut utiliser des cookies pour améliorer l&apos;expérience utilisateur et à des fins statistiques. 
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </article>

          {/* Article 8 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 8 - Modification des CGU
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              SafeCars se réserve le droit de modifier à tout moment les présentes CGU. 
              Les CGU applicables sont celles en vigueur à la date de connexion et d&apos;utilisation du site.
            </p>
          </article>

          {/* Article 9 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 9 - Droit applicable et juridiction
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Les présentes CGU sont régies par le droit français. Tout litige sera porté devant les tribunaux français.
            </p>
          </article>

          {/* Article 10 */}
          <article className="border-l border-gray-800 pl-8">
            <h2 className="text-2xl font-light tracking-wide mb-6 text-white/90">
              Article 10 - Contact
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Pour toute question relative aux présentes CGU ou au site, vous pouvez nous contacter :
            </p>
            <p><span className="text-white">Par courrier :</span> SafeCars, 102 RUE DE L'AIGUILLE 40460 SANGUINET</p>
            <p><span className="text-white">Par email :</span> contact@safecars.fr</p>
          </article>

        </div>

        {/* Footer navigation */}
        <div className="mt-32 pt-12 border-t border-gray-800 text-center">
          <Link 
            href="/" 
            className="inline-block text-white hover:text-gray-400 transition-colors font-light tracking-wide"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

      </section>

      {/* Dernière mise à jour */}
      <section className="text-center pb-20 px-6">
        <p className="text-gray-500 text-sm font-light">
          Conditions générales d&apos;utilisation en vigueur au 6 décembre 2025 — SafeCars, SIREN 993 514 090
        </p>
      </section>
    </div>
  );
}
