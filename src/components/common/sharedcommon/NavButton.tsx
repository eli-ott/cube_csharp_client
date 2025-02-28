import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface INavButton {
  icon?: string;
  text: string;
  destination: string;
}

const NavButton: React.FC<INavButton> = ({ icon, text, destination }) => {
  const navigate = useNavigate();
  const [iconSrc, setIconSrc] = useState<string | null>(null);

  useEffect(() => {
    if (icon) {
      import(`../../../assets/icons/nav_icons/nav_${icon}.svg`)
        .then((module) => setIconSrc(module.default))
        .catch((error) => console.error("Error loading icon:", error));
    }
  }, [icon]);

  if (text === "separator") {
    return <div className="m-auto border-t-2 rounded-lg border-[#6A1B1A] w-9/10 my-2"></div>;
  }

  return (
    <button
      className="flex items-center justify-between w-full h-14 cursor-pointer px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4"
      onClick={() => navigate(destination)}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={icon}
          title={icon}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" 
        />
      )}
      <span className={`w-full text-left ${icon ? "pl-4" : "pl-0"} text-sm sm:text-md md:text-lg xl:text-xl`}>{text}</span> 
      <img
        src={require("../../../assets/icons/nav_icons/nav_chevron_right.svg").default}
        alt="chevron"
        title="chevron"
        className="w-10 h-10 sm:w-8 sm:h-8 "
      />
    </button>
  );
};

export default NavButton;
