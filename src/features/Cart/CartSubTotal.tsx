import React, { useEffect, useState } from "react";
import { ICartLine } from "../../models/cartModel";
import { useCart } from "../../hooks/CartContext";

const CartSubTotal = () => {
  const { cartLines } = useCart();
  const [subTotalRegular, setSubTotalRegular] = useState<number>(0);
  const [subTotalAside, setSubTotalAside] = useState<number>(0);

  // Fonction pour déterminer le prix après réduction
  const determinePriceAfterDiscount = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  // Fonction pour calculer le sous-total
  const determineSubTotal = (lines: ICartLine[]) => {
    return lines.reduce((total, line) => {
      const basePrice = line.product.unitPrice ?? line.product.boxPrice ?? 0;
      const finalPrice = line.product.discount
        ? determinePriceAfterDiscount(basePrice, line.product.discount.value)
        : basePrice;
      return total + finalPrice * line.quantity;
    }, 0);
  };

  useEffect(() => {
    if (cartLines) {
      const asideItems = cartLines.filter((line) => line.isSetAside);
      const regularItems = cartLines.filter((line) => !line.isSetAside);

      setSubTotalAside(determineSubTotal(asideItems));
      setSubTotalRegular(determineSubTotal(regularItems));
    }
  }, [cartLines]);

  return (
    <div className="w-8/10 max-w-lg bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
      {subTotalAside > 0 && (
        <div className="text-base md:text-lg font-semibold text-gray-800 text-center">
          Articles mis de côté :{" "}
          <span className="text-orange-500">{subTotalAside.toFixed(2)} €</span>
        </div>
      )}

      <div className="text-base md:text-lg font-semibold text-gray-800 text-center">
        Sous-total du panier :{" "}
        <span className="text-green-600">{subTotalRegular.toFixed(2)} €</span>
      </div>

      <button
        className="w-full px-6 py-3 text-white text-sm md:text-base lg:text-lg font-medium bg-[#A33E32] rounded-lg shadow-md hover:bg-[#8C3329] transition-all duration-300 cursor-pointer"
      >
        Passer la commande
      </button>
    </div>
  );
};

export default CartSubTotal;
