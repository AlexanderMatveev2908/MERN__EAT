import { FC, useRef } from "react";
import { useSidebar } from "./useSidebar";

type PropsType = {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sideOpen, setSideOpen }) => {
  const sideRef = useRef<HTMLDivElement | null>(null);

  const { handleLogin, handleLogout } = useSidebar({ sideRef, setSideOpen });

  return (
    <>
      <div
        className={`${
          sideOpen ? "fixed" : "hidden"
        } inset-0 bg-black/50 sidebar__i_bg transition-none`}
      ></div>

      <div
        ref={sideRef}
        className={`${
          sideOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-[75px] right-0 h-[calc(100vh-75px)] w-3/4 sm:w-1/2 border-l-2 border-orange-500 flex flex-col items-center bg-[#111] sidebar__i_content transition-all duration-500`}
      >
        <div className="w-full grid grid-cols-1 justify-items-start gap-5 p-5">
          <span className="txt__02">Welcome to MERN__EAT</span>

          <button
            onClick={handleLogin}
            className="txt__03 btn__pseudo el_with_after hover:text-orange-500"
          >
            Login
          </button>

          <button
            onClick={handleLogout}
            className="txt__03 btn__pseudo el_with_after hover:text-orange-500"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
