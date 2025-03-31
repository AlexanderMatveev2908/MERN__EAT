import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../core/hooks/useGlobal";

const LayoutCheckout: FC = () => {
  const { isLogged } = useUser();

  return isLogged ? <Outlet /> : <Navigate to="/" replace />;
};
export default LayoutCheckout;
