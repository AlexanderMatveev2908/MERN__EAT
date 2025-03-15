import { FC } from "react";
import MainLayoutUI from "./MainLayoutUI";
import { Outlet } from "react-router-dom";

const MainLayoutRoute: FC = () => {
  return (
    <MainLayoutUI>
      <Outlet />
    </MainLayoutUI>
  );
};
export default MainLayoutRoute;
