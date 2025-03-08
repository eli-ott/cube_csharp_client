import React from "react";
import { IDiscount } from "../../../models/discountModel";

interface IProductPriceProps {
  price: number;
  discount?: IDiscount;
}

const ProductPrice: React.FC<IProductPriceProps> = ({ price, discount }) => {
  if (discount) {
    const discountPercentage = discount.value;
    const discountedPrice = price * (1 - discountPercentage / 100);
    return (
      <div className="flex items-center">
        <span className="text-sm line-through mr-2 text-gray-400">{price.toFixed(2)}€</span>
        <span className="text-sm font-bold mr-2 text-[#A63E36]">{discountedPrice.toFixed(2)}€</span>
        <span className="text-[8px] md:text-[12px] lg:text-[14px] bg-[#A63E36] rounded-3xl text-white px-1" >-{discountPercentage}%</span>
      </div>
    );
  }
  return <div className="text-[#A63E36] font-bold">{price.toFixed(2)}€</div>;
};

export default ProductPrice;
