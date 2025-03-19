import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IoFilter } from "react-icons/io5";
import FilterField from "./components/FilterField";
import TextFilter from "./components/TextFilter";
import {
  CheckBoxFieldType,
  SearchFilterType,
} from "../../../../../core/config/fieldsArr/typesFields";
import DropHandlerIcon from "../../../../components/DropHandlerIcon";
import CardToSearchStats from "./components/CardToSearchStats";
import { useLocation } from "react-router-dom";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn;
  filters: SearchFilterType[];
};

const FiltersSearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  filters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  return (
    <div className="w-full grid grid-cols-1 gap-3 mt-5">
      <DropHandlerIcon
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

        {/^\/(my-dishes).*/.test(location.pathname) && (
          <CardToSearchStats {...{ formContext }} />
        )}

        {!!filters?.length &&
          filters.map((el) => (
            <FilterField key={el.id} {...{ field: el, formContext }} />
          ))}
      </div>
    </div>
  );
};
export default FiltersSearchBar;
