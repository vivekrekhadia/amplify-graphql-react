import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "./components/Layout/MasterLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
