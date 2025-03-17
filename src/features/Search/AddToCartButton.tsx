import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import {  getCustomerCart } from "../../services/cart"; // Ajout de getCustomerCart
import { toast } from "react-toastify";
import { useCart } from "../../hooks/CartContext";
import { IProduct } from "../../models/productModel";
import { addProductToCart } from "../../services/products";

interface IAddToCartButton {
  product: IProduct;
  setIsLoading: (value: boolean) => void;
}

const AddToCartButton: React.FC<IAddToCartButton> = ({ product, setIsLoading }) => {
  const { isLoggedIn } = useAuth();
  const { setCounter, setCartLines } = useCart(); // Ajout de setCartLines
  const navigate = useNavigate();

  const onClickAdding = async () => {
    setIsLoading(true);

    if (!isLoggedIn) {
      setIsLoading(false);
      navigate("/login");
      toast.info("Vous devez vous connecter avant d'effectuer cette action.");
      return;
    }

    try {
      const response = await addProductToCart({ productId: product.productId, quantity: 1 });

      if (response.success) {
        // Recharger le panier immédiatement après ajout
        const updatedCart = await getCustomerCart();
        if (updatedCart) {
          setCartLines(updatedCart.cartLines);
          setCounter(updatedCart.cartLines.length);
        }

        toast.success("Ajouté au panier.");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-detail-button">
      <button
        onClick={onClickAdding}
        className="bg-[#A63E36] w-full text-white text-xs font-bold py-2 px-4 rounded-md cursor-pointer"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export { AddToCartButton };
