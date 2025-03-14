import { ChevronDown } from "lucide-react";
import { FC } from "react";

type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  txt: string;
  customStyle?: string;
};

const DropHandler: FC<PropsType> = ({
  isOpen,
  setIsOpen,
  txt,
  customStyle,
}) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full flex justify-between items-center group cursor-pointer ${
        customStyle ?? ""
      }`}
    >
      <span className="txt__02 group-hover:text-orange-500 el__flow">
        {txt}
      </span>

      <ChevronDown
        className={`w-[35px] h-[35px] group-hover:text-orange-500 el__flow ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};
export default DropHandler;
