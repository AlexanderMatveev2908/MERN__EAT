/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";

type PropsType = {
  el: {
    label: string;
    vals: string[];
    icon: any;
  };
};

const DropEl: FC<PropsType> = ({ el }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 transition-all duration-300 relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border-t-2 border-b-2 ${
          isOpen ? "border-b-orange-500" : "border-b-transparent"
        } border-orange-500 flex justify-between items-center px-3 py-1 group cursor-pointer transition-all duration-300`}
      >
        <div className=" transition-all duration-300 group-hover:text-orange-500 flex gap-3 items-center">
          <el.icon className="w-[25px] h-[25px]" />
          <span className="txt__02">{el.label}</span>
        </div>
        <ChevronDown
          className={`w-[35px] h-[35px] transition-all duration-300 group-hover:text-orange-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <ul
        className={`w-full grid py-1 transition-all duration-300 ${
          el.label === "Categories" ? "grid-cols-2" : " grid-cols-1 gap-1"
        } ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "-translate-y-[100px] pointer-events-none opacity-0 absolute top-0 left-0"
        }`}
      >
        {el.vals.map((val: string | number, i) => (
          <li
            key={i}
            className={`px-3 transition-all duration-300 truncate max-w-full ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="txt__01">{val}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DropEl;
