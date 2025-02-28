import React from 'react';

interface IPhoneInput {
    placeholder: string;
    typed: string;
    onTyping: (value: string) => void;
  }

const PhoneInput : React.FC<IPhoneInput> = ({placeholder, typed, onTyping}) => {
    return (
        <div className="relative w-9/10 max-w-sm md:max-w-md lg:max-w-lg ">
          {/* Icône positionnée dans l'input */}
          <div className="absolute inset-y-0 left-3 flex items-center">
            <img
              src={require("../../../assets/icons/form_phone.svg").default}
              alt={"Numéro de téléphone"}
              title={"Numéro de téléphone"}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
    
          {/* Champ de texte */}
          <input
            className={`w-full h-10 sm:h-12 rounded-lg outline-none shadow-md border border-gray-300 
              text-gray-700 text-base sm:text-lg focus:ring-2 focus:ring-gray-400 transition-all pl-12 sm:pl-14`}
            type="phone"
            onChange={(e) => onTyping(e.target.value)}
            value={typed}
            placeholder={placeholder}
          />
        </div>
      );
};

export default PhoneInput;