import { ChevronDown } from "lucide-react";
import { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  txt: string;
  Icon: IconType;
  customStyle?: string;
  customIconStyle?: string;
};

const DropHandlerIcon: FC<PropsType> = ({
  isOpen,
  setIsOpen,
  txt,
  Icon,
  customStyle,
  customIconStyle,
}) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full grid grid-cols-[1fr_75px] items-center group cursor-pointer ${
        customStyle ?? ""
      }`}
    >
      <div className="w-fit flex gap-5 items-center">
        <Icon
          className={`${
            customIconStyle ?? "min-w-[30px] min-h-[30px]"
          } group-hover:text-orange-500 el__flow`}
        />
        <span className="txt__02 group-hover:text-orange-500 el__flow">
          {txt}
        </span>
      </div>

      <ChevronDown
        className={`w-[35px] h-[35px] justify-self-end group-hover:text-orange-500 el__flow ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};
export default DropHandlerIcon;
