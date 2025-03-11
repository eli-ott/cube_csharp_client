import React, { useEffect, useState } from "react";
import Placeholder from "../../../assets/images/placeholder.png";
import { ICartLine } from "../../../models/cartModel";
import QuantityButtons from "../../../features/Cart/QuantityButtons";
import ItemStateLoader from "../ItemStateLoader";
import SetAsideButton from "../../../features/Cart/SetAsideButton";

interface ICartItem {
  cartline?: ICartLine;
  deleteLine: () => void;
  setAside: () => void;
  goToProduct: () => void;
  isLoadingRemove: boolean;
}

const CartItem: React.FC<ICartItem> = ({
  cartline,
  deleteLine,
  goToProduct,
  isLoadingRemove
}) => {
  const product = cartline?.product;

  const [itemData] = useState({
    productName: product?.name ?? "Produit inconnu",
    price: product?.unitPrice ?? product?.boxPrice ?? "0",
    discount: product?.discount?.value,
    isAside : cartline?.isSetAside,
    quantity: cartline?.quantity ?? 1,
    imageSrc: product?.images?.[0]?.imageUrl ?? Placeholder,
    addedAt: cartline?.creationTime ?? "00/00/0000",
  });


  return (
    <div className="bg-[#EEE7C7]/75 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 shadow-lg max-w-3xl mx-auto w-full">
      {/* Image du produit */}
      <button
        onClick={goToProduct}
        className="w-24 h-32 md:w-32 md:h-40 cursor-pointer"
      >
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
        <QuantityButtons
          productId={product?.productId}
          quantity={itemData.quantity}
        />

        {/* Bouton "Mettre de côté" */}
<SetAsideButton productId={product?.productId} isAside={itemData?.isAside} />

        {/* Date ajout panier */}
        <p className="text-xs text-gray-500 mt-2">
          Ajouté au panier le {itemData.addedAt}
        </p>
      </div>
      {isLoadingRemove ? <ItemStateLoader /> : null}
    </div>
  );
};

export default CartItem;
