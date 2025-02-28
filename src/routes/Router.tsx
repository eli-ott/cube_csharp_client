import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DefaultLayout from "../components/layout/pages_layout/DefaultLayout";
import Error404 from "../pages/Error404";
import Register from "../pages/Register";
import RegisterConfirmation from "../pages/RegisterConfirmation";
const Router = () => {
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
        <Route path="/confirm-registration/:email/:guid" element={<RegisterConfirmation/>} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
