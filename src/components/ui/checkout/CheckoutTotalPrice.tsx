import React from "react";
import { ICartLine } from "../../../models/cartModel";
import { determineSubTotal } from "../../../utils/prices";

interface CheckoutTotalPriceProps {
  cartLines: ICartLine[];
}

const CheckoutTotalPrice = ({ cartLines }: CheckoutTotalPriceProps) => {
  return (
    <div className="flex justify-between mb-4">
      <span>Total:</span>
      <span>{determineSubTotal(cartLines).toFixed(2)} €</span>
    </div>
  );
};

export default CheckoutTotalPrice;
