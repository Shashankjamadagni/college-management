import { Navigate } from "react-router-dom";
import { UserContext } from "../context/loginContext";
import { useContext } from "react";

export default function ProtectedRoute({ element }) {
  const { state } = useContext(UserContext);

  if (!state.isAuthenticated || !state.token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
