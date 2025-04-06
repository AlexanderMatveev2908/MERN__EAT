import { FC } from "react";
import { useUser } from "../../core/hooks/useGlobal";
import { Navigate, Outlet } from "react-router-dom";

const LayoutManageOrders: FC = () => {
  const { isLogged } = useUser();

  return isLogged ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
export default LayoutManageOrders;
