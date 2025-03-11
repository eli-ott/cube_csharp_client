// routes/publicRoutes.ts
import Home from "../../pages/Public/Home";
import Error404 from "../../pages/Error404";
import { RouteConfig } from "../../models/routingModel";
import Cart from "../../pages/Public/Cart";
import Search from "../../pages/Public/Search";

export const publicRoutes: RouteConfig[] = [
  { name: "home", path: "/", layout: "default", component: <Home /> },
  { name: "error", path: "/cart", layout: "default", component: <Cart /> },
  { name: "error", path: "*", layout: null, component: <Error404 /> },
  { name: "search", path: "/search", layout: "default", component: <Search /> },
];