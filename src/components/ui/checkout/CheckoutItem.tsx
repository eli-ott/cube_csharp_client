import React from "react";
import { IProduct } from "../../../models/productModel";
import Placeholder from "../../../assets/images/placeholder.png";

interface CheckoutItemProps {
  product: IProduct;
  quantity: number;
}

const CheckoutItem = ({ product, quantity }: CheckoutItemProps) => {
  const productName = product.name;
  const price = product.unitPrice ?? product.boxPrice ?? 0;
  const discount = product.discount?.value;
  const imageSrc = product.images?.[0]?.imageUrl ?? Placeholder;
  const discountedPrice = price * (1 - (discount ?? 0) / 100);

  return (
    <div className="bg-[#EEE7C7]/75 rounded-xl mb-6 p-6 shadow-lg max-w-3xl mx-4 flex flex-col md:flex-row items-center gap-6">
      {/* Product Image */}
      <div className="w-full h-full md:w-40 md:h-40 overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={productName}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="w-full h-9/10 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 truncate">
            {productName}
          </h2>
          <div className="">
            {discount !== undefined ? (
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 line-through">{price}€</span>
                <span className="text-[#A63E36] font-bold">
                  {discountedPrice.toFixed(2)}€
                </span>
              </div>
            ) : (
              <span className="text-gray-500">{price}€</span>
            )}
          </div>
          <span className="text-gray-500">quantité: {quantity}</span>
        </div>

        <span className="text-xl font-bold text-gray-800 mt-4">
          Total: {(discountedPrice * quantity).toFixed(2)}€
        </span>
      </div>
    </div>
  );
};

export default CheckoutItem;
