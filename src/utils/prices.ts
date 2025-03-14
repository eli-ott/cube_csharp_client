import { ICartLine } from "../models/cartModel";


const determinePriceAfterDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

const determineSubTotal = (lines: ICartLine[]) => {
  return lines.reduce((total, line) => {
    const basePrice = line.product.unitPrice ?? line.product.boxPrice ?? 0;
    const finalPrice = line.product.discount
      ? determinePriceAfterDiscount(basePrice, line.product.discount.value)
      : basePrice;
    return total + finalPrice * line.quantity;
  }, 0);
};

export { determineSubTotal, determinePriceAfterDiscount };