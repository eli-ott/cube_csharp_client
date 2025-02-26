import React from "react";
import SocialButton from "../common/sharedcommon/SocialButton";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const socialMediaBtnProps = [
    { name: "facebook", link: "" },
    { name: "youtube", link: "" },
    { name: "tiktok", link: "" },
    { name: "instagram", link: "" },
  ];

  return (
    <footer className="fixed bottom-[0px] flex flex-col w-full bg-[#6A1B1A] overflow-y-auto h-auto">
      {/* Première section avec les boutons sociaux */}
      <div className="flex flex-col md:flex-row items-center justify-between h-auto sm:h-2/5 w-full bg-[#A63E36] py-4 sm:py-0 px-4">
        <span className="text-white text-center sm:text-left">
          L'art de la Gascogne dans votre verre
        </span>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end items-center gap-4 sm:gap-2 mt-4 sm:mt-0 pt-1 pb-1">
          {socialMediaBtnProps.map((btn, key) => (
            <SocialButton
              key={key}
              name={btn.name}
              destination={btn.link}
              iconSize="w-[35px] h-[35px] cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Deuxième section avec le contenu du footer */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full py-6 px-4 sm:px-16">
        <img
          src={require("../../assets/images/layouts/logo_large.svg").default}
          alt="Negosud"
          title="Negosud"
          className="w-32 sm:w-40"
        />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-white mt-4 sm:mt-0">
          {/* Qui sommes-nous */}
          <div className="flex flex-col items-center sm:items-start">
            <button
              onClick={() => navigate("/")}
              className="text-lg font-semibold cursor-pointer"
            >
              Qui sommes-nous ?
            </button>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-lg font-semibold">Services</h1>
            <button onClick={() => navigate("/")} className="cursor-pointer">
              Mon Espace Client
            </button>
            <button onClick={() => navigate("/")} className="cursor-pointer">
              Mes commandes
            </button>
          </div>

          {/* Séparateur */}
          <div className="border-l-2 w-[1px] sm:w-[1px] h-[80px] border-white sm:block hidden" />

          {/* Contactez-nous */}
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-lg font-semibold">Contactez-nous</h1>
            <button onClick={() => navigate("/")} className="cursor-pointer">
              Contact service client
            </button>
          </div>

          {/* Séparateur */}
          <div className="border-l-2 w-[1px] sm:w-[1px] h-[80px] border-white sm:block hidden" />

          {/* Informations Légales */}
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-lg font-semibold">Informations Légales</h1>
            <button onClick={() => navigate("/")} className="cursor-pointer">
              Conditions Générales de Ventes
            </button>
            <button onClick={() => navigate("/")} className="cursor-pointer">
              Mentions Légales
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
