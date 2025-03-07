import React, { useEffect, useState } from "react";
import Placeholder from "../../../assets/images/placeholder.png";
import { ICartLine } from "../../../models/cartModel";

interface ICartItem {
  cartline?: ICartLine;
  updateQuantity: (value: number) => void;
  deleteLine: () => void;
  setAside: () => void;
  goToProduct: () => void;
}

const CartItem: React.FC<ICartItem> = ({
  cartline,
  updateQuantity,
  deleteLine,
  setAside,
  goToProduct,
}) => {
  const product = cartline?.product;

  const [itemData, setItemData] = useState({
    productName: product?.name ?? "Produit inconnu",
    price: product?.unitPrice ?? product?.boxPrice ?? "0",
    discount: product?.discount?.value,
    quantity: cartline?.quantity ?? 1,
    imageSrc: product?.images?.[0]?.imageUrl ?? Placeholder,
    addedAt: cartline?.creationTime ?? "00/00/0000",
  });

  const updateProductQuantity = (amount: number) => {
    setItemData((prev) => {
      const newQuantity = Math.max(1, prev.quantity + amount);
      updateQuantity(newQuantity); 
      return { ...prev, quantity: newQuantity };
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-[#EEE7C7]/75 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 shadow-lg max-w-3xl mx-auto w-full">
      {/* Image du produit */}
      <button onClick={goToProduct} className="w-24 h-32 md:w-32 md:h-40 cursor-pointer">
      <img
        src={itemData.imageSrc}
        alt={itemData.productName}
        className="w-full h-full object-cover rounded-lg"
      />
      </button>


      {/* Infos produit */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          {/* Prix avec réduction */}
          <div>
            {itemData.discount !== undefined ? (
              <div className="flex gap-2 items-center">
                <span className="line-through text-gray-500 text-sm">
                  {itemData.price}€
                </span>
                <span className="text-[#A63E36] font-bold text-lg">
                  {itemData.discount}€
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold">{itemData.price}€</span>
            )}
            <h2 className="text-lg font-semibold">{itemData.productName}</h2>
          </div>

          {/* Bouton de suppression */}
          <button
            onClick={deleteLine}
            className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* Sélection quantité */}
        <div className="flex items-center gap-3 mt-4">
          <button
            className={`w-9 h-9 flex items-center justify-center border rounded-full text-gray-700 ${
              itemData.quantity === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 cursor-pointer"
            }`}
            disabled={itemData.quantity === 1}
            onClick={() => updateProductQuantity(-1)}
          >
            -
          </button>
          <span className="text-lg font-medium">{itemData.quantity}</span>
          <button
            className="w-9 h-9 flex items-center justify-center border rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer"
            onClick={() => updateProductQuantity(1)}
          >
            +
          </button>
        </div>

        {/* Bouton "Mettre de côté" */}
        <button onClick={setAside} className="mt-4 w-full md:w-1/2 bg-gray-600 text-white text-sm py-3 rounded-md hover:bg-gray-700 transition cursor-pointer">
          Mettre de côté
        </button>

        {/* Date ajout panier */}
        <p className="text-xs text-gray-500 mt-2">
          Ajouté au panier le {itemData.addedAt}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
