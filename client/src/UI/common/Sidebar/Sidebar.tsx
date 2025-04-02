import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar, useUser } from "../../../core/hooks/useGlobal";
import {
  allUsersFields,
  loggedUserFields,
} from "./../../../core/config/fieldsArr/fields";
import UserEmail from "./components/UserEmail";
import SideEL from "./components/SideEL";
import LogoutBtn from "./components/LogoutBtn";
import {
  fieldAccountDrop,
  fieldAdminDrop,
  fieldsAdmin,
  nonLoggedUserFields,
} from "../../../core/config/fieldsArr/allFields/dropSideFields";
import DropInsideSide from "./components/DropInsideSide";
import { useLogout } from "../../../core/hooks/auth/useLogout";

const Sidebar: FC = () => {
  const { isOpenSide, setIsOpenSide } = useSidebar();

  const sideRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const { isLogged, currUser } = useUser();

  useEffect(() => {
    const closeSide = (e: MouseEvent) => {
      if (!sideRef.current?.contains(e.target as Node)) {
        setIsOpenSide(false);
      }
    };

    document.addEventListener("mousedown", closeSide);

    return () => {
      document.removeEventListener("mousedown", closeSide);
    };
  }, [setIsOpenSide, sideRef]);

  const { mutate, isPending } = useLogout();
  const handleLogout = () => mutate();

  const handleSideClick = (path: string, from?: string) => {
    navigate(path, from ? { state: { from } } : undefined);
    setIsOpenSide(false);
  };

  return (
    <>
      <div
        className={`${
          isOpenSide ? "fixed" : "hidden"
        } inset-0 bg-black/50 sidebar__i_bg transition-none`}
      ></div>

      <div
        ref={sideRef}
        className={`${
          isOpenSide
            ? "translate-x-0 overflow-y-auto hide_scrollbar pb-[50px]"
            : "translate-x-full"
        } sidebar__content sidebar__i_content ${isLogged ? "" : "pt-6"}`}
      >
        <div className="w-full grid grid-cols-1 justify-items-start gap-5 px-3">
          {currUser?.email && <UserEmail {...{ email: currUser.email }} />}

          {allUsersFields.map((el) => (
            <SideEL key={el.id} {...{ handleSideClick, el }} />
          ))}

          {isLogged ? (
            loggedUserFields.map((el) => (
              <SideEL key={el.id} {...{ handleSideClick, el }} />
            ))
          ) : (
            <DropInsideSide
              {...{
                handleSideClick,
                el: fieldAccountDrop,
                fields: nonLoggedUserFields,
              }}
            />
          )}

          {isLogged && (
            <DropInsideSide
              {...{ handleSideClick, el: fieldAdminDrop, fields: fieldsAdmin }}
            />
          )}

          {isLogged && <LogoutBtn {...{ isPending, handleLogout }} />}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
