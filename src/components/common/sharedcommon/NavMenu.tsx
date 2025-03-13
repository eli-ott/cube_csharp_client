import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";
import NavButton from "./NavButton";
import { useAuth } from "../../../hooks/AuthContext";

interface INavMenu {
  isOpenedMenu: boolean;
  setIsOpenedMenu: (value: boolean) => void;
}

const NavMenu: React.FC<INavMenu> = ({ isOpenedMenu, setIsOpenedMenu }) => {
  const NavLayout = [
    { icon: "home", text: "Accueil", destination: "/" },
    { icon: "products", text: "Tous nos produits", destination: "/search" },
    { icon: "", text: "separator", destination: "" },
    { icon: "contact", text: "Service client", destination: "/after-sales-service" },
    { icon: "who", text: "Qui sommes-nous ?", destination: "/about" },
    { icon: "", text: "separator", destination: "" },
    { icon: "package", text: "Mes commandes", destination: "/orders" },
    { icon: "cart", text: "Mon panier", destination: "/cart" },
    { icon: "account", text: "Mon compte", destination: "/profile" },
    { icon: "", text: "separator", destination: "" },
    { icon: "", text: "Mentions légales", destination: "/legal-notices" },
    { icon: "", text: "Conditions Générales de Vente", destination: "/general-terms" },
  ];

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClosing = () => {
    setIsOpenedMenu(false);
  };

  return (
    <div
      className={`transition-colors duration-1500 fixed left-0 top-0 z-30 h-full w-full ${
        isOpenedMenu
          ? "bg-black/50 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      }`}
      onClick={handleClosing} 
    >
      <div
        className={`flex flex-col relative items-center justify-start w-full sm:w-3/4 md:w-2/4 lg:w-1/4 h-full bg-[#F8F4E3] transform ${
          isOpenedMenu ? "translate-x-0" : "-translate-x-[101%]"
        } transition-transform duration-1000`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full h-16 bg-[#6A1B1A]">
          <img
            className="h-10 sm:h-12 md:h-16"
            src={
              require("../../../assets/images/layouts/logo_large.svg").default
            }
            alt="Negosud"
            title="Negosud"
          />
          <IconButton
            iconName="close.svg"
            iconSize="w-[40px] h-[40px] md:w-[45px] md:h-[45px] cursor-pointer"
            onClick={handleClosing}
          />
        </div>
        {/* Navigation */}
        <div className="flex flex-col w-full">
          {NavLayout.map((btn, key) => (
            <NavButton
              key={key}
              icon={btn.icon}
              text={btn.text}
              destination={btn.destination}
              setIsOpenedMenu={setIsOpenedMenu}
            />
          ))}
          {!isLoggedIn ? (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="absolute bottom-0 text-white h-10 cursor-pointer w-full bg-[#A63E36] md:hover:bg-[#88342D] transition-colors duration-1000"
            >
              Se connecter
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
