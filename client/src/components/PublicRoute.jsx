import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner/>; // show spinner or loading UI
  }

  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
