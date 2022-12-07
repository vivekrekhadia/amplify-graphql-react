import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/authContext";
import AuthPage from "./pages/Auth/AuthPage";
import Home from "./pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import { AuthSlice } from "./redux/Auth/AuthSlice";

const App = () => {
  const { getSession, setStatus, status, setAuthToken } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const { actions } = AuthSlice;
  const { authToken } = useSelector((state) => ({
    authToken: state.Auth.authToken,
  }));
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log(session);
        dispatch(actions.setAuthToken(true));
      })
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   const data = window.sessionStorage.getItem("MY_APP_STATE");
  //   if (data !== null) setAuthToken(JSON.parse(data));
  // }, [setAuthToken]);

  // useEffect(() => {
  //   window.sessionStorage.setItem("MY_APP_STATE", JSON.stringify(authToken));
  // }, [authToken]);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px",
        padding: "0px",
        overflow: "hidden",
      }}>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />

        {authToken ? (
          <>
            <Route path="/*" element={<PrivateRoutes />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="auth/*" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
