import ExtandingSection from "../../components/ui/ExtandingSection";

const LegalNotices = () => {
  return (
    <main>
      <h1 className=" text-center text-xl md:text-3xl  p-6 font-extrabold">
        Mentions Légales
      </h1>
      {/* Informations générales */}
      <ExtandingSection title="Informations générales">
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Nom de la société :</span> NEGOSUD
          </li>
          <li>
            <span className="font-semibold">Statut juridique :</span> SAS
          </li>
          <li>
            <span className="font-semibold">Adresse du siège social :</span> 12
            Rue des Vignes, 32000 Auch, France
          </li>
          <li>
            <span className="font-semibold">Téléphone :</span> +33 5 62 00 00 00
          </li>
          <li>
            <span className="font-semibold">Adresse e-mail :</span>{" "}
            contact@negosud.com
          </li>
          <li>
            <span className="font-semibold">Numéro SIRET :</span> 123 456 789
            00012
          </li>
          <li>
            <span className="font-semibold">RCS :</span> Auch
          </li>
          <li>
            <span className="font-semibold">Capital social :</span> 50 000 €
          </li>
        </ul>
      </ExtandingSection>

      {/* Hébergeur du site */}
      <ExtandingSection title="Hébergeur du site">
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Nom de l'hébergeur :</span> OVHcloud
          </li>
          <li>
            <span className="font-semibold">Adresse :</span> 2 Rue Kellermann,
            59100 Roubaix, France
          </li>
          <li>
            <span className="font-semibold">Téléphone :</span> +33 9 72 10 10 07
          </li>
        </ul>
      </ExtandingSection>

      {/* Directeur de la publication */}
      <ExtandingSection title="Directeur de la publication">
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Nom :</span> Jean Martin
          </li>
          <li>
            <span className="font-semibold">Contact :</span>{" "}
            publication@negosud.com
          </li>
        </ul>
      </ExtandingSection>

      {/* Protection des données personnelles */}
      <ExtandingSection title="Protection des données personnelles">
        <span className="block text-gray-700">
          Conformément à la réglementation en vigueur (RGPD), les données
          collectées sur ce site sont utilisées exclusivement pour :
        </span>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">
              La gestion des commandes et des relations clients.
            </span>
          </li>
          <li>
            <span className="font-semibold">
              L'envoi d'informations commerciales si consentement explicite.
            </span>
          </li>
        </ul>
        <span className="block text-gray-700 mt-4">
          Les utilisateurs disposent d'un droit d'accès, de rectification et de
          suppression de leurs données personnelles. Pour toute demande,
          contactez-nous à l'adresse :{" "}
          <a href="mailto:donnees@negosud.com" className="text-blue-600">
            donnees@negosud.com
          </a>
          .
        </span>
      </ExtandingSection>

      {/* Cookies */}
      <ExtandingSection title="Cookies">
        <p className="text-gray-700">
          Le site utilise des cookies pour améliorer l'expérience utilisateur.
          En poursuivant votre navigation, vous acceptez leur utilisation.
          <br />
          <br />
          Vous pouvez gérer vos préférences ou désactiver les cookies via les
          paramètres de votre navigateur.
        </p>
      </ExtandingSection>

      {/* Responsabilité */}
      <ExtandingSection title="Responsabilité">
        <p className="text-gray-700">
          NEGOSUD met tout en œuvre pour garantir la fiabilité des informations
          publiées sur son site.
          <br />
          <br />
          Cependant, la société ne saurait être tenue responsable des
          éventuelles erreurs ou omissions, ni des dommages directs ou indirects
          liés à l'utilisation du site.
        </p>
      </ExtandingSection>

      {/* Contact */}
      <ExtandingSection title="Contact">
        <p className="text-gray-700">
          Pour toute question ou demande relative au site, contactez-nous à
          l'adresse suivante :{" "}
          <a href="mailto:contact@negosud.com" className="text-blue-600">
            contact@negosud.com
          </a>
          .
          <br />
          <br />
          Dernière mise à jour : 3 mars 2025
        </p>
      </ExtandingSection>
    </main>
  );
};

export default LegalNotices;
