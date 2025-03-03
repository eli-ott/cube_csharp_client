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
    { icon: "products", text: "Tous nos produits", destination: "/" },
    { icon: "discount", text: "Nos promotions", destination: "/" },
    { icon: "", text: "separator", destination: "" },
    { icon: "contact", text: "Service client", destination: "/after-sales-service" },
    { icon: "who", text: "Qui sommes-nous ?", destination: "/" },
    { icon: "", text: "separator", destination: "" },
    { icon: "package", text: "Mes commandes", destination: "/" },
    { icon: "cart", text: "Mon panier", destination: "/" },
    { icon: "account", text: "Mon compte", destination: "/" },
    { icon: "", text: "separator", destination: "" },
    { icon: "", text: "Mentions légales", destination: "/" },
    { icon: "", text: "Conditions Générales de Vente", destination: "/" },
  ];

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClosing = () => {
    setIsOpenedMenu(false);
  };

  return (
    <div
      className={`transition-colors duration-1500 absolute left-0 top-0 z-10 h-full w-full ${
        isOpenedMenu
          ? "bg-black/50 pointer-events-auto"
          : "bg-transparent pointer-events-none"
      }`}
    >
      <div
        className={`flex flex-col relative items-center justify-start w-full sm:w-3/4 md:w-2/4 h-full bg-[#F8F4E3] transform ${
          isOpenedMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-1000`}
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
