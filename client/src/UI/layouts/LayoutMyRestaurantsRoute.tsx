import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../core/hooks/useGlobal";

const LayoutMyRestaurantsRoute = () => {
  const { isLogged } = useUser();

  return isLogged ? <Outlet /> : <Navigate to="/" replace />;
};
export default LayoutMyRestaurantsRoute;
