import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/basePageEls/Header/Header";
import Sidebar from "./../../components/basePageEls/Sidebar/Sidebar";
import Hero from "../../components/basePageEls/Hero/Hero";
import Footer from "../../components/basePageEls/Footer/Footer";

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

      <Toast />

      {location.pathname === "/" && <Hero />}
      <div className="flex flex-col items-center w-full pad__page py-5 pb-[150px] sm:pb-[250px] lg:pb-[350px]">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainLayoutUI;
