import { FC, useState } from "react";
import { FaSort } from "react-icons/fa";
import { UseFormReturn } from "react-hook-form";
import SorterField from "./components/SorterField";
import { SorterFieldType } from "../../../../../core/config/fieldsArr/typesFields";
import DropHandlerIcon from "../../../../components/DropHandlerIcon";

type PropsType = {
  formContext: UseFormReturn;
  sorters: SorterFieldType[];
  closeAllDrop?: boolean;
};

const SortersSearchBar: FC<PropsType> = ({
  formContext,
  sorters,
  closeAllDrop,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <DropHandlerIcon
        {...{
          txt: "Sort by",
          Icon: FaSort,
          isOpen,
          setIsOpen,
          closeAllDrop,
          customStyle: "pb-1 border-b-[3px] border-orange-500",
        }}
      />

      <div
        className={`w-full items-start grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] transition-all duration-300 gap-4 ${
          isOpen
            ? "max-h-[2000px] opacity-100 pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {!!sorters?.length &&
          sorters.map((el) => (
            <SorterField
              key={el.id}
              {...{ formContext, sorter: el, closeAllDrop }}
            />
          ))}
      </div>
    </div>
  );
};
export default SortersSearchBar;
