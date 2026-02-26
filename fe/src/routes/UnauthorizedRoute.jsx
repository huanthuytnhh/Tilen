import { Navigate } from "react-router-dom"; // Sử dụng Navigate thay cho Redirect
import { useAuth } from "@clerk/clerk-react";

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
  const { isSignedIn } = useAuth();

  // Nếu người dùng đã đăng nhập, điều hướng đến trang "/friends"
  return !isSignedIn ? <Component {...rest} /> : <Navigate to="/friends" />;
};

export default UnauthorizedRoute;
