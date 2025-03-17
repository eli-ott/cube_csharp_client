import React, { useState } from 'react';

interface IExtandingSection {
    title: string;
    children?: React.ReactNode;
}

const ExtandingSection: React.FC<IExtandingSection> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#EEE7C7] w-full overflow-hidden flex flex-col border-b border-gray-400">
            {/* Bouton d'ouverture */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="cursor-pointer flex flex-row items-center justify-start h-20 px-4 w-full"
            >
                <img 
                    className={`h-10 w-10 transition-transform duration-300 transform ${isOpen ? "rotate-90" : "rotate-0"}`} 
                    src={require("../../assets/icons/nav_icons/nav_chevron_right.svg").default} 
                    alt="Ouvrir" 
                    title="Ouvrir" 
                />
                <h1 className="text-left text-lg md:text-xl lg:text-2xl font-bold ml-4">{title}</h1>
            </button>

            {/* Contenu extensible */}
            <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-auto" : "max-h-0"}`}
            >
                <div className="px-6 py-4">{children}</div>
            </div>
        </div>
    );
};

export default ExtandingSection;
