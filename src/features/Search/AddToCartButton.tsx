import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { addProductToCart } from "../../services/products";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/CartContext";

interface IAddToCartButton {
  productId: number;
  setIsLoading: (value: boolean) => void;
}

const AddToCartButton: React.FC<IAddToCartButton> = ({
  productId,
  setIsLoading,
}) => {
  const { isLoggedIn } = useAuth();
  const {setCounter,counter} = useCart();
  const navigate = useNavigate();

  const onClickAdding = async () => {
    setIsLoading(true);
    if (!isLoggedIn) {
      setIsLoading(false);
      navigate("/login");
      toast.info("Vous devez vous connecter avant d'effectuer cette action.");
      return;
    }

    const quantity: number = 1;
    const response = await addProductToCart({ productId, quantity });

    if (response.success) {
      setCounter(counter ? counter + 1:1);
      toast.success("Ajouté au panier.");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
    return;
  };

  return (
    <div className="product-detail-button">
      <button
        onClick={() => onClickAdding()}
        className="bg-[#A63E36] w-full text-white text-xs font-bold py-2 px-4 rounded-md cursor-pointer"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export { AddToCartButton };
