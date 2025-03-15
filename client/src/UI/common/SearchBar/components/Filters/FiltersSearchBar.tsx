import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import DropHandler from "../DropHandler";
import { IoFilter } from "react-icons/io5";
import { CheckBoxFieldType } from "../../../../../core/config/fieldsArr/allFields/MyRestaurants/makeUpdate";
import FilterField from "./components/FilterField";
import { SorterFieldType } from "../../../../../core/config/fieldsArr/fields";
import TextFilter from "./components/TextFilter";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn;
  filters: SorterFieldType[];
};

const FiltersSearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  filters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-3 mt-5">
      <DropHandler
        {...{
          txt: "Filter by",
          Icon: IoFilter,
          isOpen,
          setIsOpen,
          customStyle: "pb-1 border-b-[3px] border-orange-500",
        }}
      />

      <div
        className={`w-full grid grid-cols-1 pb-3 transition-all duration-300 gap-2 ${
          isOpen
            ? "max-h-[2000px] opacity-100 pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <TextFilter {...{ formContext, searchFields }} />

        {filters.map((el) => (
          <FilterField key={el.id} {...{ field: el, formContext }} />
        ))}
      </div>
    </div>
  );
};
export default FiltersSearchBar;
