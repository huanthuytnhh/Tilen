import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react"; // Import useAuth từ Clerk

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
