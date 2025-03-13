import { useEffect, useState } from "react";
import CartItem from "../../components/ui/cart/CartItem";
import { deleteCartLine } from "../../services/cart";
import CartEmpty from "../../components/ui/cart/CartEmpty";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/CartContext";
import { useNavigate } from "react-router-dom";
import CartSubTotal from "./CartSubTotal";

const CartLineTable: React.FC = () => {
  const { cartLines, setCartLines, counter, setCounter } = useCart();
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const navigate = useNavigate();

  const setAside = (productId: number) => {
    setCartLines((prevCartLines) =>
      prevCartLines
        ? prevCartLines.map((line) =>
            line.product.productId === productId
              ? { ...line, isSetAside: !line.isSetAside }
              : line
          )
        : []
    );
  };

  const deleteLine = async (productId: number) => {
    try {
      setIsLoadingRemove(true);
      const success = await deleteCartLine(productId);
      if (success) {
        setCartLines((prevCartLines) =>
          prevCartLines ? prevCartLines.filter((line) => line.product.productId !== productId) : []
        );
        setCounter((prevCounter) => Math.max((prevCounter ?? 0) - 1, 0));
      } else {
        toast.error("Échec de la suppression de l'article");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    } finally {
      setIsLoadingRemove(false);
    }
  };

  const goToProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Séparation des articles mis de côté et ceux non mis de côté
  const asideItems = cartLines?.filter((c) => c.isSetAside) || [];
  const regularItems = cartLines?.filter((c) => !c.isSetAside) || [];

  return (
    <>
      <CartSubTotal />

      <div className="w-8/10 p-4 box-border min-h-80 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
        {cartLines === null ? (
          <LoadingSpinner />
        ) : regularItems.length > 0 ? (
          regularItems.map((line) => (
            <CartItem
              key={line.product.productId}
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

      {/* Affichage du titre "Articles mis de côté" même si aucun article n'est mis de côté */}
      {cartLines && cartLines.length > 0 && (
        <h1 className="text-2xl font-bold text-center text-[#333333] mt-4">
          Articles mis de côté
        </h1>
      )}

      {/* Affichage des articles mis de côté OU message indiquant qu'il n'y en a pas */}
      {cartLines && cartLines.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center gap-4 mb-10">
          {asideItems.length > 0 ? (
            asideItems.map((line) => (
              <CartItem
                key={line.product.productId}
                cartline={line}
                setAside={() => setAside(line.product.productId)}
                deleteLine={() => deleteLine(line.product.productId)}
                goToProduct={() => goToProduct(line.product.productId)}
                isLoadingRemove={isLoadingRemove}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg italic mt-2">
              Aucun article n'a été mis de côté.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CartLineTable;
