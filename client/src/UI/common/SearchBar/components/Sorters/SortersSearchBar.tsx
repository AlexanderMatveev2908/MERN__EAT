import { FC, useState } from "react";
import { FaSort } from "react-icons/fa";
import DropHandler from "../DropHandler";
import { UseFormReturn } from "react-hook-form";
import SorterField from "./components/SorterField";
import { SorterFieldType } from "../../../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";

type PropsType = {
  formContext: UseFormReturn;
  sortersObj: { [key: string]: SorterFieldType };
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
        className={`w-full items-start grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-300 gap-4 ${
          isOpen
            ? "max-h-[2000px] opacity-100 pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <SorterField {...{ formContext, sorter: sortersObj.rating }} />
        <SorterField {...{ formContext, sorter: sortersObj.reviews }} />
        <SorterField {...{ formContext, sorter: sortersObj.delivery }} />
        <SorterField {...{ formContext, sorter: sortersObj.dishes }} />
        <SorterField {...{ formContext, sorter: sortersObj.orders }} />
        <SorterField {...{ formContext, sorter: sortersObj.price }} />
      </div>
    </div>
  );
};
export default SortersSearchBar;
