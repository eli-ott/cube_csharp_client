import { useState } from "react";
import { toggleSetAsideItem } from "../../services/cart";
import { toast } from "react-toastify";
import ItemStateLoader from "../../components/ui/ItemStateLoader";

const SetAsideButton = ({
  setAside,
  productId,
  isAside,
}: {
  setAside: ()=>void;
  productId: number | undefined;
  isAside: boolean | undefined;
}) => {
  const [isAsideLocal, setIsAsideLocal] = useState<boolean>(isAside ?? false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const setAsideProduct = async () => {
    setIsloading(true);
    const success = await toggleSetAsideItem(productId ?? 1);
    setAside();
    if (success) {
      setIsAsideLocal(!isAsideLocal);
    } else {
      toast.error(
        "Une erreur est survenue lors de la mise de côté de l'article."
      );
    }
    setIsloading(false);
  };

  return (
    <>
      <button
        onClick={setAsideProduct}
        className={`mt-4 w-full md:w-1/2 ${isAsideLocal?"bg-gray-800":"bg-gray-600"} text-white text-sm py-3 rounded-md ${isAsideLocal?"hover:bg-gray-900":"hover:bg-gray-700"} transition cursor-pointer`}
      >
        {isAsideLocal ? "Remettre dans la liste" : "Mettre de côté"}
      </button>
      {isLoading ? <ItemStateLoader /> : null}
    </>
  );
};

export default SetAsideButton;
