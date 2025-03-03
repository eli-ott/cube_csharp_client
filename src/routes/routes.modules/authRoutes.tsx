import { RouteConfig } from "../../models/routingModel";
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
];
