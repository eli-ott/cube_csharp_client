import React from "react";
import { IDiscount } from "../../../models/discountModel";

interface IProductDetailsPriceProps {
  price: number;
  discount?: IDiscount;
}

const ProductDetailsPrice: React.FC<IProductDetailsPriceProps> = ({ price, discount }) => {
  if (discount) {
    const discountPercentage = discount.value;
    const discountedPrice = price * (1 - discountPercentage / 100);
    return (
      <div className="flex items-center">
        <span className="text-lg line-through mr-2 text-gray-400">{price.toFixed(2)}€</span>
        <span className="text-lg font-bold mr-2 text-[#A63E36]">{discountedPrice.toFixed(2)}€</span>
        <span className="text-[10px] md:text-[12px] bg-[#A63E36] rounded-sm text-white px-1" >-{discountPercentage}%</span>
      </div>
    );
  }
  return <div className="text-[#A63E36] font-bold">{price.toFixed(2)}€</div>;
};

export default ProductDetailsPrice;
