import { FC, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Hero from "../../components/Hero/Hero";
import { Navigate, useLocation } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

type PropsType = {
  children: React.ReactNode;
};

const MainLayoutUI: FC<PropsType> = ({ children }) => {
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const location = useLocation();

  const emailSent = sessionStorage.getItem("emailSent");

  return emailSent ? (
    <Navigate to="/notice-email-sent" replace />
  ) : (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header {...{ setSideOpen, sideOpen }} />
      <Sidebar {...{ sideOpen, setSideOpen }} />

      <Toast />

      {location.pathname === "/" && <Hero />}
      <div className="flex flex-col items-center w-full pad_page py-5 sm:py-10 pb-[150px] sm:pb-[250px] lg:pb-[350px]">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainLayoutUI;
