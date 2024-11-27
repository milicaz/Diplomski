import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        if (!auth?.accessToken) {
          await refreshToken();
        }
      } catch (error) {
        console.error(error);
      }
    };
    verifyAccessToken();
  }, [auth.accessToken, refreshToken]);

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const roles = decoded?.roles || [];

  if (!auth.accessToken) {
    return <Navigate to="/logovanje" state={{ from: location }} replace />;
  }

  if (roles.find((role) => allowedRoles.includes(role))) {
    return element;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
