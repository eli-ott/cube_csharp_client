import { useEffect, useState } from "react";
import CartItem from "../../components/ui/cart/CartItem";
import { getCustomerInfoFromToken } from "../../services/authentification";
import {
  deleteCartLine,
  getCustomerCart,
} from "../../services/cart";
import { ICart } from "../../models/cartModel";
import { ICustomerCredentials } from "../../models/authentificationModel";
import CartEmpty from "../../components/ui/cart/CartEmpty";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/CartContext";

const CartLineTable: React.FC = () => {
  const [customerData, setCustomerData] = useState<ICustomerCredentials | null>(
    null
  );
  const [cart, setCart] = useState<ICart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const {counter,setCounter} = useCart();

  useEffect(() => {
    const fetchCustomerCredentials = async () => {
      setCustomerData(await getCustomerInfoFromToken());
    };
    setIsLoading(true);
    fetchCustomerCredentials();
  }, []);

  useEffect(() => {
    const fetchCartContent = async (id: number) => {
      setCart(await getCustomerCart(id));
    };
    if (customerData && customerData.id) {
      fetchCartContent(customerData.id);
      setIsLoading(false);
    }
  }, [customerData]);

  const deleteLine = async (productId: number) => {
    try {
      setIsLoadingRemove(true);
      const success = await deleteCartLine(productId);
      if (success) {
        setCart((prevCart) => {
          if (!prevCart) return null;
          return {
            ...prevCart,
            cartLines: prevCart.cartLines.filter(
              (line) => line.product.productId !== productId
            ),
          };
        });
        let newCounter = counter ? counter - 1 : 0;
        setCounter(newCounter);
      } else {
        toast.error("Echec de la suppression de l'article");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    } finally {
      setIsLoadingRemove(false);
    }
  };

  const setAside = (productId: number) => {
    alert(`Produit ${productId} mis de côté.`);
  };

  const goToProduct = (productId: number) => {
    alert(`Détails du produit ${productId}`);
  };

  return (
    <div className="w-8/10 p-4 box-border min-h-80 overflow-y-auto overflow-x-hidden">
      {isLoading ? (
        <LoadingSpinner />
      ) : cart && cart?.cartLines.length > 0 ? (
        cart.cartLines.map((line, idx) => (
          <CartItem
            key={idx}
            cartline={line}
            setAside={() => setAside(line.product.productId)}
            deleteLine={() => deleteLine(line.product.productId)}
            goToProduct={() => goToProduct(line.product.productId)}
            isLoadingRemove={isLoadingRemove}
          />
        ))
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default CartLineTable;
