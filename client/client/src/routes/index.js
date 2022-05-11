import React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import ProductCartPage from "../pages/ProductCartPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/detail/:productId" element={<DetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/productcart" element={<ProductCartPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
