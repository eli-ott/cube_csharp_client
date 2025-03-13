import React, { ReactNode } from "react";
import { AuthProvider } from "../hooks/AuthContext";
import { UserProvider } from "../hooks/CustomerContext";
import { CartProvider } from "../hooks/CartContext";
import { ToastContainer } from "react-toastify";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          {children}
          <ToastContainer position="bottom-right" autoClose={2500} />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Provider;
