import { useEffect, useState } from "react";
import CartItem from "../../components/ui/cart/CartItem";
import { getCustomerInfoFromToken } from "../../services/authentification";
import { getCustomerCart } from "../../services/cart";
import { ICart } from "../../models/cartModel";
import { ICustomerCredentials } from "../../models/authentificationModel";
import CartEmpty from "../../components/ui/cart/CartEmpty";

const CartLineTable: React.FC = () => {
  const [customerData, setCustomerData] = useState<ICustomerCredentials | null>(
    null
  );
  const [cart, setCart] = useState<ICart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const deleteLine = () => {
    alert("Ligne supprimée");
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    newQuantity: number
  ) => {
    if (newQuantity > quantity) {
      alert(`Produit ${productId} incrémenté`);
    } else {
      alert(`Produit ${productId} décrémenté`);
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
        <div className="flex justify-center items-center h-auto">
          <div className="w-16 h-16 border-4 border-t-transparent border-[#6A1B1A] border-solid rounded-full animate-spin"></div>
        </div>
      ) : cart && cart?.cartLines.length > 0 ? (
        cart.cartLines.map((line, idx) => (
          <CartItem
            key={idx}
            cartline={line}
            updateQuantity={(value) => updateQuantity(line.product.productId, line.quantity, value)}
            setAside={() => setAside(line.product.productId)}
            deleteLine={deleteLine}
            goToProduct={() => goToProduct(line.product.productId)}
          />
        ))
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default CartLineTable;
