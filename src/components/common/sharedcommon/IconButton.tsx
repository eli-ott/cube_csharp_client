import { FC, useState, useEffect } from "react";

interface IIconButton {
  iconName: string;
  iconSize?: string;
  onClick?: () => void; // renommé ici
}

const IconButton: FC<IIconButton> = ({ iconName, iconSize = "w-10", onClick }) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);
  const extractedName = iconName.split(".")[0];

  useEffect(() => {
    import(`../../../assets/icons/${iconName}`)
      .then((module) => {
        setIconSrc(module.default);
      })
      .catch((error) => {
        console.error("Error loading icon:", error);
      });
  }, [iconName]);

  return (
    <button
      onClick={onClick}  // utilisation directe de onClick
      className={`bg-transparent border-none ${iconSize} flex justify-center items-center p-0 cursor-pointer`}
      aria-label={extractedName}
    >
      {iconSrc ? (
        <img
          className="w-full h-full transition-all"
          src={iconSrc}
          title={extractedName}
          alt={extractedName}
        />
      ) : (
        <div className={`bg-gray-300 ${iconSize} rounded-full`} role="status">
          Loading...
        </div>
      )}
    </button>
  );
};

export default IconButton;
