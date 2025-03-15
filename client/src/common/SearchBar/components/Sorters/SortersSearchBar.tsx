import { FC, useState } from "react";
import { FaSort } from "react-icons/fa";
import DropHandler from "../DropHandler";
import { UseFormReturn } from "react-hook-form";
import { SortersFieldsType } from "../../../../config/fieldsArr/MyRestaurants/filterSort";

type PropsType = {
  formContext: UseFormReturn;
  sortersObj: SortersFieldsType;
};

const SortersSearchBar: FC<PropsType> = ({ formContext, sortersObj }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <DropHandler
        {...{
          txt: "Sort by",
          Icon: FaSort,
          isOpen,
          setIsOpen,
          customStyle: "pb-1 border-b-[3px] border-orange-500",
        }}
      />

      <div
        className={`w-full grid grid-cols-1 transition-all duration-300 gap-2 ${
          isOpen
            ? "max-h-[2000px] opacity-100 pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      ></div>
    </div>
  );
};
export default SortersSearchBar;
