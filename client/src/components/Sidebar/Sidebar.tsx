import { FC, useRef } from "react";
import { useSidebar } from "./useSidebar";
import { useUser } from "../../hooks/useGlobal";
import { LogOut } from "lucide-react";

type PropsType = {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sideOpen, setSideOpen }) => {
  const sideRef = useRef<HTMLDivElement | null>(null);

  useSidebar({ sideRef, setSideOpen });

  const { currUser, isLogged } = useUser();

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
        <div className="w-full grid grid-cols-1 justify-items-start gap-3 p-5">
          {isLogged && (
            <>
              <span className="txt__03 max-w-full truncate">{currUser}</span>

              <button className="w-full flex gap-3 group max-w-fit items-center el_with_after">
                <LogOut className="icon__with_el" />

                <span className="cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
