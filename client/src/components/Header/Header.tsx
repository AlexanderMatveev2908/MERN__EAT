import { Menu, User, X } from "lucide-react";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

type PropsType = {
  setSideOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  sideOpen?: boolean;
};

const Header: FC<PropsType> = ({ setSideOpen, sideOpen }) => {
  const location = useLocation();
  const needSideBar = location.pathname !== "/notice-email-sent";

  return (
    <div className="sticky top-0 left-0 h-[75px] w-full border-b-3 border-orange-500 bg-[#111] pad_page flex items-center header__i">
      <div className="w-full grid grid-cols-2">
        <Link className="txt__05 text-orange-500 max-w-fit" to="/">
          MERN__EAT
        </Link>

        {needSideBar && (
          <div className="flex w-full gap-5 items-center justify-end">
            <Link to="/login" className="group flex items-center">
              <User className="icon " />
            </Link>
            {sideOpen ? (
              <div
                onClick={() => setSideOpen?.(false)}
                className="max-w-fit justify-self-end group flex items-center"
              >
                <X className="icon" />
              </div>
            ) : (
              <div
                onClick={() => setSideOpen?.(true)}
                className="max-w-fit justify-self-end group flex items-center"
              >
                <Menu className="icon" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
