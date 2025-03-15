/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { FaSort } from "react-icons/fa";
import DropHandler from "../DropHandler";
import { UseFormReturn } from "react-hook-form";
import SorterField from "./components/SorterField";

type PropsType = {
  formContext: UseFormReturn;
  sorters: any;
};

const SortersSearchBar: FC<PropsType> = ({ formContext, sorters }) => {
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
        className={`w-full items-start grid sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] transition-all duration-300 gap-4 ${
          isOpen
            ? "max-h-[2000px] opacity-100 pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {sorters.map((el) => (
          <SorterField key={el.id} {...{ formContext, sorter: el }} />
        ))}
      </div>
    </div>
  );
};
export default SortersSearchBar;
