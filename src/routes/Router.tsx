import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/pages_layout/DefaultLayout";
import { useAuth } from "../hooks/AuthContext";
import { publicRoutes } from "./routes.modules/publicRoutes";
import { authRoutes } from "./routes.modules/authRoutes";
import { RouteConfig } from "../models/routingModel";
import { appendedRoutes } from "./routes.modules/appendedRoutes";
import StripeContext from "../hooks/StripeContext";
import Checkout from "../pages/Public/Checkout";

const renderRoute = (route: RouteConfig) => {
  const { layout, component, path } = route;
  const routeElement = layout === "default" 
    ? <DefaultLayout>{component}</DefaultLayout> 
    : component;

  return <Route key={path} path={path} element={routeElement} />;
};

const Router = () => {
  const { isLoggedIn } = useAuth();

  const allRoutes = [
    ...publicRoutes,
    ...appendedRoutes,
    ...(!isLoggedIn ? authRoutes : []),
  ];

  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map(renderRoute)}

        <Route element={<StripeContext />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
