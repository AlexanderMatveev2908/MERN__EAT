import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./../hooks/useGlobal";

const LayoutNonLoggedUserRoute: FC = () => {
  const { isLogged } = useUser();

  return isLogged ? <Navigate to="/" replace /> : <Outlet />;
};
export default LayoutNonLoggedUserRoute;
