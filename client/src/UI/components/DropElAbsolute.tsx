import { FC, ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import DropHandlerIcon from "./DropHandlerIcon";

type PropsType = {
  el: {
    id: string;
    label: string;
    icon: IconType;
    vals?: string[] | number[];
  };
  children?: ReactNode;
  customStyle?: string;
};

const DropElAbsolute: FC<PropsType> = ({ el, children, customStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 el__flow relative">
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: el.label,
          Icon: el.icon,
          customIconStyle: `min-w-[25px] min-h-[25px]`,
          customStyle,
        }}
      />

      <ul
        className={`w-[80%] px-3 right-0 z-60 max-h-fit grid py-1 border-2 border-orange-500 rounded-xl bg-[#111] transition-all duration-500 absolute ${
          ["Categories", "Open Hours"].includes(el.label)
            ? "grid-cols-2"
            : " grid-cols-1 gap-1"
        } ${
          isOpen
            ? "opacity-100 -translate-y-full pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {children ??
          el?.vals?.map((val: string | number, i) => (
            <li key={i} className="el__flow hide_scrollbar overflow-x-auto">
              <span className="txt__01">{val}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default DropElAbsolute;
