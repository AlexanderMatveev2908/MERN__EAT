import { FC } from "react";
import { Outlet } from "react-router-dom";

const LayoutNonLoggedUserRoute: FC = () => {
  return <Outlet />;
};
export default LayoutNonLoggedUserRoute;
