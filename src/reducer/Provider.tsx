import React, { ReactNode } from "react";
import { AuthProvider } from "../hooks/AuthContext";
import { UserProvider } from "../hooks/CustomerContext";
import { CartProvider } from "../hooks/CartContext";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "../hooks/HomeCarouselContext";
import { OrderProvider } from "../hooks/OrderContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            <OrderProvider>
              {children}
              <ToastContainer position="bottom-right" autoClose={2500} />
            </OrderProvider>
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default Provider;
