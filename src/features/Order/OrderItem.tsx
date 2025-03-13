import React, { useEffect } from "react";
import placeholder from "../../assets/images/placeholder.png";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../../models/orderModel";

const OrderItem = ({ orderLine }: { orderLine: IOrder }) => {
  const navigate = useNavigate();
  const [total, setTotal] = React.useState<number>(0);
  const [nItems, setNItems] = React.useState<number>(0);

  useEffect(() => {
    const determinateTotal = () => {
      let total = 0;
      orderLine.lines.forEach((item) => {
        let unitPrice = item.product.unitPrice
          ? item.product.unitPrice
          : item.product.boxPrice
          ? item.product.boxPrice
          : 0;

        // Appliquer la promotion si disponible
        if (item.product.discount) {
          const discountValue = item.product.discount.value;
          unitPrice = unitPrice - (unitPrice * discountValue) / 100;
        }

        // Calculer le total avec la quantité
        total += unitPrice * item.quantity;
      });
      setTotal(total);
      setNItems(orderLine.lines.length - 1);
    };
    determinateTotal();
  }, [orderLine]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div
          onClick={() => navigate(`/order-details/${orderLine.orderId}`)}
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-md"
        >
          <img
            src={orderLine.lines[0].product.images[0].imageUrl ?? placeholder}
            alt="Commande"
            className="w-full h-full object-cover rounded-md"
          />
          {nItems === 0 ? null : (
            <div className="bg-gray-500/50 absolute z-10 bottom-0 left-0 right-0 p-2 text-white text-sm text-center h-full w-full rounded-sm flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold">+{nItems}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="text-lg md:text-xl font-bold">Total : {total.toFixed(2)}€</div>
          <div className="text-sm md:text-base text-gray-600">
            Status : {orderLine.status.name}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="bg-[#6A1B1A] text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
          Contacter le fournisseur
        </button>
        <button className="bg-[#6A1B1A] text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
          Suivre votre colis
        </button>
        <button
          onClick={() => navigate(`/order-details/${orderLine.orderId}`)}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition"
        >
          Détails de la commande
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
