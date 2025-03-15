import { FC, useRef } from "react";
import { useSidebar } from "./useSidebar";
import { useLocation, useSearchParams } from "react-router-dom";
import SideEL from "./components/SideEL/SideEL";
import LogoutBtn from "./components/LogoutBtn/LogoutBtn";
import { useUser } from "../../../core/hooks/useGlobal";
import {
  allUsersFields,
  loggedUserFields,
  nonLoggedUserFields,
} from "./../../../core/config/fieldsArr/fields";
import UserEmail from "./components/UserEmail/UserEmail";

type PropsType = {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sideOpen, setSideOpen }) => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const { isLogged, currUser } = useUser();

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
        <div className="w-full grid grid-cols-1 justify-items-start gap-5 pt-4">
          {currUser && <UserEmail {...{ currUser }} />}

          {allUsersFields.map((el) => (
            <SideEL key={el.id} {...{ handleSideClick, type, location, el }} />
          ))}

          {isLogged
            ? loggedUserFields.map((el) => (
                <SideEL
                  key={el.id}
                  {...{ handleSideClick, type, location, el }}
                />
              ))
            : nonLoggedUserFields.map((el) => (
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
