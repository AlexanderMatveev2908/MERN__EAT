import { FC, useRef } from "react";
import { useSidebar } from "./useSidebar";
import { useUser } from "../../hooks/useGlobal";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  sidebarFieldsArrAllUser,
  sidebarFieldsArrLoggedUser,
  sidebarFieldsArrNonLoggedUser,
} from "./sidebarArr";
import SideEL from "./SideEL/SideEL";
import LogoutBtn from "./LogoutBtn/LogoutBtn";

type PropsType = {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sideOpen, setSideOpen }) => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const { isLogged } = useUser();

  const { isPending, handleLogout, handleSideClick } = useSidebar({
    sideRef,
    setSideOpen,
  });

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
        } sidebar__content sidebar__i_content`}
      >
        <div className="w-full grid grid-cols-1 justify-items-start gap-5 p-5">
          {sidebarFieldsArrAllUser.map((el) => (
            <SideEL key={el.id} {...{ handleSideClick, type, location, el }} />
          ))}

          {isLogged
            ? sidebarFieldsArrLoggedUser.map((el) => (
                <SideEL
                  key={el.id}
                  {...{ handleSideClick, type, location, el }}
                />
              ))
            : sidebarFieldsArrNonLoggedUser.map((el) => (
                <SideEL
                  key={el.id}
                  {...{ handleSideClick, type, location, el }}
                />
              ))}

          {isLogged && <LogoutBtn {...{ isPending, handleLogout }} />}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
