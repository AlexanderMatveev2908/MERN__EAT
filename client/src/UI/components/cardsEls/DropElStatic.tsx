import { FC, ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import DropHandlerIcon from "./DropHandlerIcon";

type PropsType = {
  el: {
    icon: IconType;
    label: string;
  };
  children: ReactNode;
};

const DropElStatic: FC<PropsType> = ({ el, children }) => {
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
      <div
        className={`w-full el__flow grid grid-cols-1 gap-1 px-3 gap-2 ${
          isOpen
            ? "opacity-100 max-h-[500px] pointer-events-auto pt-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default DropElStatic;
