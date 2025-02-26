import React from "react";
import searchIcon from "../../../assets/icons/search.svg";

const SearchBar: React.FC = () => {
  return (
    <div className="mt-2 w-3/4 md:w-2/4">
      <form className="relative w-full">
        {/* Champ de recherche */}
        <input
          type="text"
          className="w-full h-[35px] md:h-[40px] pl-4 pr-12 rounded-full bg-[#F8F4E3] focus:outline-none text-sm md:text-base"
          placeholder="À la recherche d'un bon vin ?"
        />

        {/* Bouton de recherche */}
        <button
          type="submit"
          className="absolute right-[2px] border-none top-1/2 transform -translate-y-1/2 bg-[#6A1B1A] text-white rounded-full w-[30px] h-[30px] md:w-[35px] md:h-[35px] flex items-center justify-center cursor-pointer"
          aria-label="Rechercher"
        >
          <img
            src={searchIcon}
            alt="Rechercher"
            title="Rechercher"
            className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
