import { LogOut, User } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useDropLogged } from "./hooks/useDropLogged";
import SpinnerBtnReact from "../../../../loaders/SpinnerBtnReact/SpinnerBtnReact";

const DropLogged: FC = () => {
  const {
    dropOpen,
    dropRef,
    setDropOpen,
    toggleDrop,
    isPending,
    handleDropLogout,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropLogged();

  return (
    <div
      ref={dropRef}
      className="flex items-center justify-center cursor-pointer relative"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleDrop}
        className="txt__01 transition-all duration-300 hover:text-orange-500 hover:scale-120 border-2 py-1 px-2 rounded-xl"
      >
        {sessionStorage.getItem("initName") ?? ""}
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute border-2 border-orange-500 bg-[#111] -top-full right-1/2 h-fit w-fit rounded-xl z-10 transition-all duration-300 ${
          dropOpen
            ? "translate-y-[50%] opacity-100"
            : "opacity-0 translate-y-0 pointer-events-none"
        }`}
      >
        <div className="w-full flex flex-col items-start">
          <Link
            onClick={() => setDropOpen(false)}
            to="/user/profile"
            className="w-full flex gap-3 border-b-orange-500 border-b-2 pl-3 pr-10 py-3 justify-start group"
          >
            <User className="icon__header" />
            <span className="txt__02 transition-all duration-300 group-hover:text-orange-500">
              Profile
            </span>
          </Link>

          {isPending ? (
            <div className="h-[50px] w-full flex items-center justify-center">
              <SpinnerBtnReact {...{ sizeGiven: 25 }} />
            </div>
          ) : (
            <button
              onClick={handleDropLogout}
              className="w-full cursor-pointer flex gap-3 pl-3 pr-10 py-3 justify-start group"
            >
              <LogOut className="icon__header" />
              <span className="txt__02 group-hover:text-orange-500 duration-300 transition-all">
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DropLogged;
