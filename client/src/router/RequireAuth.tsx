import { ReactNode, FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
