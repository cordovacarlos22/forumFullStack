import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { autenticated } = useAuthContext();

  // If user is authenticated, redirect to the home page
  if (autenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the requested page (e.g., Login or Register)
  return children;
};

export default ProtectedRoute;