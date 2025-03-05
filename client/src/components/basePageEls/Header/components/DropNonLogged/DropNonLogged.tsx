import { FC } from "react";
import { useDropNonLogged } from "./hooks/useDropNonLogged";
import { User } from "lucide-react";
import { nonLoggedUserFields } from "../../../../../config/fieldsArr/userDropDownFields";

const DropNonLogged: FC = () => {
  const {
    toggleDrop,
    dropOpen,
    dropRef,
    handleSideClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropNonLogged();

  return (
    <div
      ref={dropRef}
      className="flex items-center justify-center cursor-pointer relative"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleDrop}
        className="txt__01"
      >
        <User className="w-[37.5px] h-[37.5px] transition-all duration-300 hover:text-orange-500 hover:scale-120" />
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute border-2 border-orange-500 bg-[#111] -top-full -right-full h-fit w-fit rounded-xl z-10 transition-all duration-300  ${
          dropOpen
            ? "translate-y-[40%] opacity-100"
            : "opacity-0 translate-y-0 pointer-events-none"
        }`}
      >
        <div className="w-full flex flex-col items-start">
          {nonLoggedUserFields.map((el) => (
            <button
              onClick={() => handleSideClick(el.path, el?.from)}
              key={el.id}
              className="min-w-[300px] w-full flex gap-3 border-b-orange-500 border-b-2 pl-3 pr-10 py-3 justify-start group cursor-pointer"
            >
              <el.svg className="icon__header" />
              <span className="txt__02 transition-all duration-300 group-hover:text-orange-500">
                {el.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DropNonLogged;
