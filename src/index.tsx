import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/output.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/AuthContext";
import { CartProvider } from "./hooks/CartContext";
import { UserProvider } from "./hooks/CustomerContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <App />
          <ToastContainer position="bottom-right" autoClose={2500} />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
