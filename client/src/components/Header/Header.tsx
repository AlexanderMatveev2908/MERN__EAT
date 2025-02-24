import { Menu, X } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sideOpen: boolean;
};

const Header: FC<PropsType> = ({ setSideOpen, sideOpen }) => {
  return (
    <div className="sticky top-0 left-0 h-[75px] w-full border-b-3 border-orange-500 bg-[#111] pad_page flex items-center header__i">
      <div className="w-full grid grid-cols-2">
        <Link className="txt__05 text-orange-500 max-w-fit" to="/">
          MERN__EAT
        </Link>

        {sideOpen ? (
          <div
            onClick={() => setSideOpen(false)}
            className="max-w-fit justify-self-end group flex items-center"
          >
            <X className="text-orange-500 h-[40px] w-[40px] group-hover:scale-110 btn__pseudo " />
          </div>
        ) : (
          <div
            onClick={() => setSideOpen(true)}
            className="max-w-fit justify-self-end group flex items-center"
          >
            <Menu className="text-orange-500 h-[40px] w-[40px] group-hover:scale-110 btn__pseudo " />
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
