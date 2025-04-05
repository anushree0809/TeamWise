import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  // const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("PrivateRoute - currentUser:", currentUser);
  // console.log("PrivateRoute - Redirecting to login from:", location.pathname);

  if (currentUser === undefined) {
    return <div>Loading...</div>; // Prevents unnecessary redirect before auth state is resolved
  }

  return currentUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
