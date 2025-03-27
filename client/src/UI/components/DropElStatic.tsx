import { FC, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import DropHandlerIcon from "./DropHandlerIcon";
import { useLocation } from "react-router-dom";
import { tailwindBreak } from "../../core/config/constants/breakpoints";

type PropsType = {
  el: {
    id: string;
    icon: IconType;
    label: string;
    vals?: string[] | number[];
  };
  children?: ReactNode;
};

const DropElStatic: FC<PropsType> = ({ el, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const updateSize = () =>
      /^\/(my-restaurants)\/[a-f0-9]{24}/.test(location.pathname) &&
      window.innerWidth > tailwindBreak.sm
        ? setIsOpen(true)
        : null;

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [location.pathname]);

  return (
    <div className="w-full grid grid-cols-1 items-start">
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: el.label,
          Icon: el.icon,
          customStyle: "py-1 border-b-2 border-orange-500 px-3",
        }}
      />
      <ul
        className={`w-full el__flow grid gap-1 gap-2 items-start px-3 ${
          isOpen
            ? "opacity-100 max-h-[500px] pointer-events-auto pt-2"
            : "opacity-0 max-h-0 pointer-events-none"
        } ${
          ["Categories", "Open Hours"].includes(el.label)
            ? "grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {children
          ? children
          : el?.vals?.length
          ? el?.vals.map((val, i) => (
              <li key={i} className="el__flow hide_scrollbar overflow-x-auto">
                <span className="txt__01">{val}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
export default DropElStatic;
