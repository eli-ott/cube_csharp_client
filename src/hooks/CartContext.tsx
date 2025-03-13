import { createContext, useContext, useEffect, useState } from "react";
import { getCustomerInfoFromToken } from "../services/authentification";
import { getCustomerCart } from "../services/cart";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { ICartLine } from "../models/cartModel";

interface CartContextType {
  cartId: number | null;
  cartLines : ICartLine[] | null;
  counter: number | null;
  setCounter: React.Dispatch<React.SetStateAction<number | null>>;
  setCartLines:React.Dispatch<React.SetStateAction<ICartLine[] | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [cartId, setCartId] = useState<number | null>(null);
  const [counter, setCounter] = useState<number | null>(null);
  const [cartLines,setCartLines] = useState<ICartLine[] | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const decipheredToken = getCustomerInfoFromToken();
        if (!decipheredToken?.id) return;

        const cart = await getCustomerCart(decipheredToken.id);
        if (cart) {
          setCartId(cart.cartId);
          setCounter(cart.cartLines?.length || 0);
          setCartLines(cart.cartLines);
        }
      } catch (error) {
        toast.error("Erreur lors de la récupération du panier :");
      }
    };
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cartId, counter, cartLines, setCounter, setCartLines }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};
