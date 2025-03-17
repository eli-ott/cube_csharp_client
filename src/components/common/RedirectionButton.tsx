import React from "react";
import { useNavigate } from "react-router-dom";

interface IRedirectionButton {
  label: string;
  destination: string;
}

const RedirectionButton: React.FC<IRedirectionButton> = ({ label, destination }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(destination)}
      className="block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg px-4 sm:px-6 py-2 sm:py-3 text-white text-base sm:text-lg md:text-xl font-medium bg-[#A33E32] rounded-lg shadow-md hover:bg-[#8C3329] transition-all duration-300 cursor-pointer"
    >
      {label}
    </button>
  );
};

export default RedirectionButton;
