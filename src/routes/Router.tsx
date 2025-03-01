import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DefaultLayout from "../components/layout/pages_layout/DefaultLayout";
import Error404 from "../pages/Error404";
import Register from "../pages/Register";
import RegisterConfirmation from "../pages/RegisterConfirmation";
import Login from "../pages/Login";
import { useAuth } from "../hooks/AuthContext";
const Router = () => {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/confirm-registration/:email/:guid"
          element={<RegisterConfirmation />}
        />
        {!isLoggedIn ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : null}

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
