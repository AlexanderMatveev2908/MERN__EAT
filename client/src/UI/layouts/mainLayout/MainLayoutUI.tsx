import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../common/Header/Header";
import Popup from "../../common/Popup";
import Toast from "../../common/Toast/Toast";
import Footer from "../../common/Footer/Footer";
import Sidebar from "../../common/Sidebar/Sidebar";
import Hero from "../../common/Hero";

type PropsType = {
  children: React.ReactNode;
};

const MainLayoutUI: FC<PropsType> = ({ children }) => {
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header {...{ setSideOpen, sideOpen }} />
      <Sidebar {...{ sideOpen, setSideOpen }} />

      <Popup />

      <Toast />

      {location.pathname === "/" && <Hero />}
      <div className="flex flex-col items-center w-full pad__page py-5 pb-[150px] sm:pb-[200px] lg:pb-[300px] relative">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainLayoutUI;
