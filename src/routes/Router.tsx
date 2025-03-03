import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DefaultLayout from "../components/layout/pages_layout/DefaultLayout";
import Error404 from "../pages/Error404";
import { useAuth } from "../hooks/AuthContext";
import AfterSalesService from "../pages/AfterSalesService";
import Login from "../pages/Authentification/Login";
import Register from "../pages/Authentification/Register";
import RegisterConfirmation from "../pages/Authentification/RegisterConfirmation";

// Définition du type pour une route
interface RouteConfig {
  name: string;
  path: string;
  layout?: "default" | null;
  component: React.ReactNode;
}

// Définition des routes publiques et privées
const routes: RouteConfig[] = [
  { name: "home", path: "/", layout: "default", component: <Home /> },
  { name: "error", path: "*", layout: null, component: <Error404 /> },
];

const appendedPages: RouteConfig[] = [
  {
    name: "afterSalesService",
    path: "/after-sales-service",
    layout: "default",
    component: <AfterSalesService />,
  },
];

const authRoutes: RouteConfig[] = [
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

const Router = () => {
  const { isLoggedIn } = useAuth();

  // Fonction pour générer les routes avec la gestion du layout
  const renderRoutes = (routesList: RouteConfig[]) =>
    routesList.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.layout === "default" ? (
            <DefaultLayout>{route.component}</DefaultLayout>
          ) : (
            route.component
          )
        }
      />
    ));

  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
        {renderRoutes(appendedPages)}
        {!isLoggedIn && renderRoutes(authRoutes)}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
