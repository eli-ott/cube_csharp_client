import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ISocialButton {
  name: string;
  destination: string;
  iconSize?: string;
  onClick?: () => void;
}

const SocialButton: FC<ISocialButton> = ({
  name,
  destination,
  iconSize = "w-10",
  onClick,
}) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    import(`../../../assets/icons/social_icons/social_${name}.svg`)
      .then((module) => {
        setIconSrc(module.default);
      })
      .catch((error) => {
        console.error("Error loading icon:", error);
      });
  }, [name]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(destination);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-transparent border-none ${iconSize} flex justify-center items-center p-0 cursor-pointer`}
      aria-label={name}
    >
      {iconSrc ? (
        <img
          className="w-full h-full transition-all"
          src={iconSrc}
          title={name}
          alt={name}
        />
      ) : (
        <div className={`bg-gray-300 ${iconSize} rounded-full`} role="status">
          Loading...
        </div>
      )}
    </button>
  );
};

export default SocialButton;
