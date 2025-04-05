import { ChevronDown } from "lucide-react";
import { FC, useEffect } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  txt: string;
  Icon: IconType;
  closeAllDrop?: boolean;
  customStyle?: string;
  customIconStyle?: string;
};

const DropHandlerIcon: FC<PropsType> = ({
  isOpen,
  setIsOpen,
  txt,
  Icon,
  closeAllDrop,
  customStyle,
  customIconStyle,
}) => {
  useEffect(() => {
    if (closeAllDrop) setIsOpen(false);
  }, [closeAllDrop, setIsOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full grid grid-cols-[1fr_65px] items-center group cursor-pointer ${
        customStyle ?? ""
      }`}
    >
      <div className="w-fit flex gap-5 items-center">
        <Icon
          className={`${
            customIconStyle ?? "icon__base"
          } group-hover:text-orange-500 el__flow`}
        />
        <span className="txt__01 group-hover:text-orange-500 el__flow">
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
