import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from "../MainContainer";
import SpecificPlans from "../Plans/SpecificPlans";
import HeroPage from "../Hero/HeroPage";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../Cart/Cart";
import PurchaseHistory from "../Account/PurchaseHistory";
import OrderDetailsById from "../Account/OrderDetailsById";
import LogIn from "../Auth/LogIn";
import Registration from "../Auth/Registration";
import ForgetPassword from "../Auth/ForgetPassword";
import ChangePassword from "../Auth/ChangePassword";
import Profile from "../Account/Profile";

const AppRoutes = () => {
  return (
    // <Router>
    <Routes>
      <Route exact path="/" element={<MainContainer />}>
        <Route path="/" element={<HeroPage />} />
        <Route path="/plans/:type" element={<SpecificPlans />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />

          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route
            path="/purchase-history/:orderId"
            element={<OrderDetailsById />}
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ChangePassword />} />
    </Routes>
    // {/* </Router> */}
  );
};

export default AppRoutes;
