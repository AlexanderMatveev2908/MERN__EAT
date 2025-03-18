import { FC, ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import DropHandlerIcon from "./DropHandlerIcon";

type PropsType = {
  el: {
    id: string;
    icon: IconType;
    label: string;
    vals?: string[] | number[];
  };
  children?: ReactNode;
  cols?: boolean;
  pad?: boolean;
};

const DropElStatic: FC<PropsType> = ({ el, children, cols, pad }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
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
        className={`w-full el__flow grid gap-1 gap-2 ${
          cols ? "grid-cols-2" : "grid-cols-1"
        } ${pad ? "px-3" : ""} ${
          isOpen
            ? "opacity-100 max-h-[500px] pointer-events-auto pt-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {children
          ? children
          : el?.vals?.length
          ? el?.vals.map((val, i) => (
              <li
                key={i}
                className="px-3 el__flow hide_scrollbar overflow-x-auto"
              >
                <span className="txt__01">{val}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
export default DropElStatic;
