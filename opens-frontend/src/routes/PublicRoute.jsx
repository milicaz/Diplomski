import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PublicRoute = ({ element, restricted }) => {
  const { currentUser } = useContext(AuthContext);
  
  return currentUser && restricted ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
