import React, { FunctionComponent } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth, Home, Page404, } from "../pages";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../modules/auth/context";
import Protected from "./protected";

const AppRoutes: FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />

      <Routes>
        <Route path="/" element={<Protected allow={user} navigate="/auth/login" />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="auth" element={<Protected allow={!user} navigate="/home" />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Auth.Login />} />
          <Route path="register" element={<Auth.Register />} />
          <Route path="*" index element={<Navigate to="login" />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;