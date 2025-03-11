import IconButton from "../common/sharedcommon/IconButton";
import SearchBar from "../ui/searchBar/SearchBar";
import logo from "../../assets/images/layouts/logo_large.svg";
import NavMenu from "../common/sharedcommon/NavMenu";
import { useState } from "react";
import { useNavigate } from "react-router";
import CartIcon from "../ui/header/CartIcon";
import { useAuth } from "../../hooks/AuthContext";

const Header: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const handleOpening = () => {
    setIsOpened(true);
  };
  return (
    <>
      <header className="w-full h-[130px] bg-[#6A1B1A] sticky z-20 top-0 flex flex-col items-center pb-[4px] box-border">
        {/* Barre supérieure : icônes + logo */}
        <div className="w-full flex items-center justify-between py-2">
          {/* Menu Icon */}
          <div className="w-1/3 flex items-center ">
            <IconButton
              iconName="menu.svg"
              iconSize="w-[40px] h-[40px] md:w-[45px] md:h-[45px] cursor-pointer"
              onClick={handleOpening}
            />
          </div>

          {/* Logo */}
          <button
            className="w-1/3 flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="h-[40px] md:h-[50px]" src={logo} alt="Logo" />
          </button>

          {/* User & Cart Icons */}
          <div className="w-1/3 flex justify-end items-center space-x-4 pr-[4px]">
            <IconButton
              iconName="account.svg"
              iconSize="w-[40px] h-[40px] md:w-[45px] md:h-[45px]"
              onClick={isLoggedIn ? ()=>navigate("/") : ()=>navigate("/login")}
            />
            <CartIcon iconSize="w-[40px] h-[40px] md:w-[45px] md:h-[45px] cart-counter" />
          </div>
        </div>

        {/* Barre inférieure : SearchBar */}
        <div className="flex justify-center items-center w-full px-4 pb-2">
          <SearchBar />
        </div>
      </header>

      <NavMenu isOpenedMenu={isOpened} setIsOpenedMenu={setIsOpened} />
    </>
  );
};

export default Header;
