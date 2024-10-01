import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? element : <Navigate to="/logovanje" />;
};

export default ProtectedRoute;
