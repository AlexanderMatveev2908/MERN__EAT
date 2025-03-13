/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronUp } from "lucide-react";
import { FC, useRef, useState } from "react";

type PropsType = {
  el: {
    label: string;
    vals?: string[];
    icon: any;
    subLabel?: string;
  };
  children?: any;
};

const DropEl: FC<PropsType> = ({ el, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  return (
    <div className="w-full grid grid-cols-1 transition-all duration-300 relative px-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-full flex justify-between items-center py-1 group cursor-pointer transition-all duration-300`}
      >
        <div className=" transition-all duration-300 group-hover:text-orange-500 flex gap-3 items-center">
          <el.icon className="w-[25px] h-[25px]" />
          <span className="txt__01">{el.label}</span>
        </div>
        <ChevronUp
          className={`w-[35px] h-[35px] transition-all duration-300 group-hover:text-orange-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <ul
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-[80%] right-0 max-h-fit grid py-1 border-2 border-orange-500 rounded-xl bg-[#111] transition-all duration-500 absolute  ${
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
            <li
              key={i}
              className="px-3 transition-all duration-300 truncate pointer-events-none cursor-pointer"
            >
              <span className="txt__01">{val}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default DropEl;
