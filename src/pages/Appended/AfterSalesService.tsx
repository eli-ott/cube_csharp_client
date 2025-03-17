import React from "react";

const AfterSalesService: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center text-[#333] p-8">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-center">
        Contacter notre service client
      </h1>
      {/* Conteneur des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Carte courrier */}
        <div className="bg-[#EEE7C7] p-6 rounded-xl shadow-lg border border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <img
              className="w-12 h-12"
              src={require("../../assets/icons/others/other_mail.svg").default}
              alt="Courrier"
              title="Courrier"
            />
            <h2 className="text-xl font-bold">Par courrier</h2>
          </div>
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>
              Indiquez votre <strong>nom, prénom</strong>.
            </li>
            <li>
              Ajoutez votre <strong>numéro de commande</strong>.
            </li>
          </ul>
          <div className="bg-white p-4 rounded-md mt-4 shadow-sm">
            <p className="text-gray-800 font-medium leading-relaxed">
              NEGOSUD <br />
              Service Client <br />
              BP 90200 <br />
              32013 Auch
            </p>
          </div>
          <p className="mt-4 text-red-500 font-semibold">
            Merci de ne pas retourner votre colis à cette adresse.
          </p>
        </div>

        {/* Carte email */}
        <div className="bg-[#EEE7C7] p-6 rounded-xl shadow-lg border border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <img
              className="w-12 h-12"
              src={require("../../assets/icons/form_icons/form_email.svg").default}
              alt="Email"
              title="Email"
            />
            <h2 className="text-xl font-bold">Par mail</h2>
          </div>
          <p className="text-sm text-gray-700">
            En précisant le motif de votre demande ainsi que les informations de
            votre commande :
          </p>
          <ul className="text-sm text-gray-700 list-disc pl-5 mt-2">
            <li>Numéro de commande</li>
            <li>Nom et prénom</li>
          </ul>
          <p className="mt-4 font-semibold text-blue-500">
            Email :{" "}
            <a href="mailto:serviceclient@negosud.com" className="underline">
              serviceclient@negosud.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AfterSalesService;
