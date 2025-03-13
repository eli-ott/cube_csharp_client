import React, { ReactNode } from "react";
import { AuthProvider } from "../hooks/AuthContext";
import { UserProvider } from "../hooks/CustomerContext";
import { CartProvider } from "../hooks/CartContext";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "../hooks/HomeCarouselContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            {children}
            <ToastContainer position="bottom-right" autoClose={2500} />
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default Provider;
