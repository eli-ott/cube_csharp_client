import React, { useEffect, useState } from "react";

interface ITextInput {
  placeholder: string;
  typed: string;
  icon?: string;
  onTyping: (value: string) => void;
}

const TextInput: React.FC<ITextInput> = ({ placeholder, icon, typed, onTyping }) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);

  useEffect(() => {
    if (icon) {
      import(`../../../assets/icons/form_${icon}.svg`)
        .then((module) => setIconSrc(module.default))
        .catch((error) => console.error("Erreur de chargement de l'icône:", error));
    }
  }, [icon]);

  return (
    <div className="relative w-9/10 max-w-sm md:max-w-md lg:max-w-lg ">
      {/* Icône positionnée dans l'input */}
      {iconSrc && (
        <div className="absolute inset-y-0 left-3 flex items-center">
          <img src={iconSrc} alt={icon} title={icon} className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      )}

      {/* Champ de texte */}
      <input
        className={`w-full h-10 sm:h-12 rounded-lg outline-none shadow-md border border-gray-300 
          text-gray-700 text-base sm:text-lg focus:ring-2 focus:ring-gray-400 transition-all
          ${icon ? "pl-12 sm:pl-14" : "pl-4 sm:pl-6"} pr-4 sm:pr-6`}
        type="text"
        onChange={(e) => onTyping(e.target.value)}
        value={typed}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;