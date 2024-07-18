/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = Cookies.get("token") !== undefined;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
