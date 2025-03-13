import { RouteConfig } from "../../models/routingModel";
import ForgotPassword from "../../pages/Authentification/ForgotPassword";
import ForgotPasswordConfirmation from "../../pages/Authentification/ForgotPasswordConfirmation";
import Login from "../../pages/Authentification/Login";
import Register from "../../pages/Authentification/Register";
import RegisterConfirmation from "../../pages/Authentification/RegisterConfirmation";

export const authRoutes: RouteConfig[] = [
  { name: "login", path: "/login", layout: null, component: <Login /> },
  {
    name: "register",
    path: "/register",
    layout: null,
    component: <Register />,
  },
  {
    name: "confirm-registration",
    path: "/confirm-registration/:email/:guid",
    layout: null,
    component: <RegisterConfirmation />,
  },
  {
    name: "forgot-password",
    path: "/forgot-password/",
    layout: null,
    component: <ForgotPassword />,
  },
  {
    name: "forgot-password-confirmation",
    path: "/forgot-password/confirmation/:guid",
    layout: null,
    component: <ForgotPasswordConfirmation />,
  },
];
