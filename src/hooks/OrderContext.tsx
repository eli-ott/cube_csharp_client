import { createContext, useContext, useEffect, useState } from "react";
import { getOrder } from "../services/order"; // Suppose que cette fonction existe dans ton fichier order.js
import { toast } from "react-toastify";
import { IOrder } from "../models/orderModel"; // Supposons que IOrder est défini dans ton modèle
import { getTokenFromCookie } from "../services/authentification";
import { useAuth } from "./AuthContext";
import { IPagedResponse } from "../models/pagedModel";

interface OrderContextType {
  order: IPagedResponse<IOrder> | null;
  setOrder: React.Dispatch<React.SetStateAction<IPagedResponse<IOrder> | null>>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: React.PropsWithChildren) => {
  const [order, setOrder] = useState<IPagedResponse<IOrder> | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrder();
        setOrder(orderData); 
      } catch (error) {
        toast.error("Erreur lors de la récupération de la commande.");
      }
    };

    if (getTokenFromCookie()) {
      fetchOrder(); 
    }
  }, [isLoggedIn]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
