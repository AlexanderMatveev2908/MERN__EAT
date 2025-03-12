/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";

type PropsType = {
  label: string;
  obj: any;
  isFirst?: boolean;
  isLast: boolean;
};

const DropEl: FC<PropsType> = ({
  label,
  obj,
  isFirst = false,
  isLast = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 transition-all duration-300 relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border-t-2 border-b-2 ${
          isOpen && isFirst ? "border-b-orange-500" : "border-b-transparent"
        } border-orange-500 flex justify-between items-center px-3 group cursor-pointer transition-all duration-300`}
      >
        <span className="txt__02 transition-all duration-300 group-hover:text-orange-500 ">
          {label}
        </span>
        <ChevronDown
          className={`w-[35px] h-[35px] transition-all duration-300 group-hover:text-orange-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <ul
        className={`w-full flex flex-col gap-1 py-1 transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : " -translate-y-[100px] pointer-events-none opacity-0 absolute"
        }`}
      >
        {Object.values(obj).map((val: string | number, i) => (
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
