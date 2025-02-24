import { FC, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Hero from "../../components/Hero/Hero";
import { useLocation } from "react-router-dom";

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

      {location.pathname === "/" && <Hero />}
      <div className="flex flex-col items-center w-full pad_page py-10 pb-[3000px]">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainLayoutUI;
