import { FC, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../../core/hooks/useGlobal";
import {
  allUsersFields,
  loggedUserFields,
  nonLoggedUserFields,
} from "./../../../core/config/fieldsArr/fields";
import UserEmail from "./components/UserEmail";
import SideEL from "./components/SideEL";
import LogoutBtn from "./components/LogoutBtn";
import DropAdmin from "./components/DropAdmin";
import { useLogout } from "../../../core/hooks/useLogout";

type PropsType = {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: FC<PropsType> = ({ sideOpen, setSideOpen }) => {
  const sideRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const { isLogged, currUser } = useUser();

  useEffect(() => {
    const closeSide = (e: MouseEvent) => {
      if (!sideRef.current?.contains(e.target as Node)) {
        setSideOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSide);

    return () => {
      document.removeEventListener("mousedown", closeSide);
    };
  }, [setSideOpen, sideRef]);

  const { mutate, isPending } = useLogout();
  const handleLogout = () => mutate();

  const handleSideClick = (path: string, from?: string) => {
    navigate(path, from ? { state: { from } } : undefined);
    setSideOpen(false);
  };

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
          sideOpen
            ? "translate-x-0 overflow-y-auto hide_scrollbar pb-[50px]"
            : "translate-x-full"
        } sidebar__content sidebar__i_content`}
      >
        <div className="w-full grid grid-cols-1 justify-items-start gap-5 px-3">
          {currUser && <UserEmail {...{ currUser }} />}

          {allUsersFields.map((el) => (
            <SideEL key={el.id} {...{ handleSideClick, type, location, el }} />
          ))}

          {isLogged ? (
            <>
              {loggedUserFields.map((el) => (
                <SideEL
                  key={el.id}
                  {...{ handleSideClick, type, location, el }}
                />
              ))}

              <DropAdmin {...{ handleSideClick }} />
            </>
          ) : (
            nonLoggedUserFields.map((el) => (
              <SideEL
                key={el.id}
                {...{ handleSideClick, type, location, el }}
              />
            ))
          )}

          {isLogged && <LogoutBtn {...{ isPending, handleLogout }} />}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
