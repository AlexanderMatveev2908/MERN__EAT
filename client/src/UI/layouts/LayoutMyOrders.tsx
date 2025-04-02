import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../core/hooks/useGlobal";

const LayoutMyOrders: FC = () => {
  const { isLogged } = useUser();

  return isLogged ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
export default LayoutMyOrders;
