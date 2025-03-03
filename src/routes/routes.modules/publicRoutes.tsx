// routes/publicRoutes.ts
import Home from "../../pages/Public/Home";
import Error404 from "../../pages/Error404";
import { RouteConfig } from "../../models/routingModel";

export const publicRoutes: RouteConfig[] = [
  { name: "home", path: "/", layout: "default", component: <Home /> },
  { name: "error", path: "*", layout: null, component: <Error404 /> },
];