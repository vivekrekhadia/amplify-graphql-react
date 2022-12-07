import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Verification from "../Verification";

const AuthPage = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verification" element={<Verification />} />
      <Route index element={<Login />} />
    </Routes>
  );
};

export default AuthPage;
