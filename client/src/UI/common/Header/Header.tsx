import { Menu, X } from "lucide-react";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import DropLogged from "./components/DropLogged";
import DropNonLogged from "./components/DropNonLogged";
import { useSidebar, useUser } from "../../../core/hooks/useGlobal";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Header: FC = () => {
  const { isLogged } = useUser();
  const { isOpenSide, setIsOpenSide } = useSidebar();

  const location = useLocation();
  const needSideBar = location.pathname !== "/notice-email-sent";

  return (
    <div className="sticky top-0 left-0 h-fit min-h-[75px] w-full border-b-3 border-orange-500 bg-[#111] pad__page flex items-center header__i">
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-2 py-2 gap-2">
        <Link className="txt__05 text-orange-500 max-w-fit" to="/">
          MERN__EAT
        </Link>

        {needSideBar && (
          <div className="flex w-full gap-5 items-center justify-end">
            <Link
              to={`/search/`}
              className="group relative el__flow hover:scale-110"
            >
              <span className="absolute border-2 px-1 border-orange-500 text-orange-500 rounded-full bg-[#000] -top-3 -right-2">
                10
              </span>
              <MdOutlineShoppingCartCheckout className="min-w-[35px] min-h-[35px] group-hover:text-orange-500 el__flow" />
            </Link>

            {isLogged ? <DropLogged /> : <DropNonLogged />}

            {isOpenSide ? (
              <div
                onClick={() => setIsOpenSide?.(false)}
                className="max-w-fit justify-self-end group flex items-center"
              >
                <X className="svg__header" />
              </div>
            ) : (
              <div
                onClick={() => setIsOpenSide?.(true)}
                className="max-w-fit justify-self-end group flex items-center"
              >
                <Menu className="svg__header" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
