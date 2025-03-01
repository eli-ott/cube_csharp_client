import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/output.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer position="bottom-right" autoClose={2500} />
    </AuthProvider>
  </React.StrictMode>
);
