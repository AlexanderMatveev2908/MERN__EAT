import { FC } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../common/Header/Header";
import Popup from "../../common/Popup";
import Toast from "../../common/Toast/Toast";
import Footer from "../../common/Footer/Footer";
import Sidebar from "../../common/Sidebar/Sidebar";
import Hero from "../../common/Hero";
import InfoPop from "../../common/InfoPop";

type PropsType = {
  children: React.ReactNode;
};

const MainLayoutUI: FC<PropsType> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <Sidebar />

      <Popup />
      <InfoPop />

      <Toast />

      {location.pathname === "/" && <Hero />}
      <div className="flex flex-col items-center w-full pad__page py-5 pb-[150px] sm:pb-[200px] relative">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainLayoutUI;
