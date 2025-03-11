import { FC } from "react";
import { useUser } from "./../hooks/useGlobal";
import { Navigate, Outlet } from "react-router-dom";

const LayoutUserRoute: FC = () => {
  const { isLogged } = useUser();
  return isLogged ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
export default LayoutUserRoute;
