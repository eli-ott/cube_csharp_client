import { useState } from "react";
import { changeQuantity } from "../../services/cart";

const QuantityButtons = ({
  productId,
  quantity,
}: {
  productId: number | undefined;
  quantity: number;
}) => {
  const [localQuantity, setLocalQuantity] = useState<number>(quantity);

  const updateQuantity = async (param: string) => {
    if (param === "minus") {
      if (await changeQuantity(productId ? productId : 1, localQuantity - 1))
        setLocalQuantity(localQuantity - 1);
    } else if (param === "plus") {
      if (await changeQuantity(productId ? productId : 1, localQuantity + 1))
        setLocalQuantity(localQuantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        className={`w-9 h-9 flex items-center justify-center border rounded-full text-gray-700 ${
          localQuantity === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 cursor-pointer"
        }`}
        disabled={localQuantity === 1}
        onClick={() => updateQuantity("minus")}
      >
        -
      </button>
      <span className="text-lg font-medium">{localQuantity}</span>
      <button
        className="w-9 h-9 flex items-center justify-center border rounded-full text-gray-700 hover:bg-gray-200 cursor-pointer"
        onClick={() => updateQuantity("plus")}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButtons;
