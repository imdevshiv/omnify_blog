import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreateBlog from "../pages/CreateBlog";
import Me from "../pages/Me";
import BlogDetail from "../pages/BlogDetail";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

const AppRoutes = () => (
  <Routes>
    {/* Public Home */}
    <Route path="/" element={<Home />} />

    {/* Login and Signup only for NOT logged in users */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      }
    />

    {/* Protected Routes for logged in users */}
    <Route
      path="/profile/createBlog"
      element={
        <ProtectedRoute>
          <CreateBlog />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/me"
      element={
        <ProtectedRoute>
          <Me />
        </ProtectedRoute>
      }
    />

    {/* Public blog details */}
    <Route path="/blogs/:id" element={<BlogDetail />} />

    {/* Catch all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
