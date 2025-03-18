import { FC } from "react";
import { useUser } from "../../core/hooks/useGlobal";
import { Navigate, Outlet } from "react-router-dom";

const LayoutMyDishes: FC = () => {
  const { isLogged } = useUser();
  return isLogged ? <Outlet /> : <Navigate to="/" replace />;
};
export default LayoutMyDishes;
