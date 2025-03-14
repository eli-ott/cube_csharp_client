// routes/publicRoutes.ts
import Home from "../../pages/Public/Home";
import Error404 from "../../pages/Error404";
import { RouteConfig } from "../../models/routingModel";
import Cart from "../../pages/Public/Cart";
import Search from "../../pages/Public/Search";
import Profile from "../../pages/Public/Profile";
import Product from "../../pages/Public/Product";
import Order from "../../pages/Public/Order";
import OrderDetails from "../../pages/Public/OrderDetails";

export const publicRoutes: RouteConfig[] = [
  { name: "home", path: "/", layout: "default", component: <Home /> },
  { name: "cart", path: "/cart", layout: "default", component: <Cart /> },
  { name: "profile", path: "/profile", layout: "default", component: <Profile /> },
  { name: "search", path: "/search", layout: "default", component: <Search /> },
  { name: "error", path: "*", layout: null, component: <Error404 /> },
  { name: "product", path: "/product/:productId", layout: "default", component: <Product /> },
  { name: "orders", path: "/orders", layout: "default", component: <Order /> },
  { name: "order-details", path: "/order-details/:orderId", layout: "default", component: <OrderDetails /> },
];