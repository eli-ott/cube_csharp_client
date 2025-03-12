// routes/publicRoutes.ts
import Home from "../../pages/Public/Home";
import Error404 from "../../pages/Error404";
import { RouteConfig } from "../../models/routingModel";
import Cart from "../../pages/Public/Cart";
import Search from "../../pages/Public/Search";
import Profile from "../../pages/Public/Profile";

export const publicRoutes: RouteConfig[] = [
  { name: "home", path: "/", layout: "default", component: <Home /> },
  { name: "cart", path: "/cart", layout: "default", component: <Cart /> },
  { name: "profile", path: "/profile", layout: "default", component: <Profile /> },
  { name: "search", path: "/search", layout: "default", component: <Search /> },
  { name: "error", path: "*", layout: null, component: <Error404 /> },
];