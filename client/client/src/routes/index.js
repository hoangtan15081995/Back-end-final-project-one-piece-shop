import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
    </Routes>
  );
}

export default Router;
