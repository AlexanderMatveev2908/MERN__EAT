import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FieldQuerySortType } from "../../../../config/fieldsArr/MyRestaurants/filterSort";
import MoreSearch from "./components/MoreSearch";
import CatQuery from "./components/CatQuery";
import DropHandler from "../DropHandler";
import RangePrice from "./components/RangePrice";
import { CatFormType } from "../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import RangeRating from "./components/RangeRating";
import { IoFilter } from "react-icons/io5";

type PropsType = {
  searchFields: FieldQuerySortType[];
  catFields: FieldQuerySortType[];
  priceFields: CatFormType[];
  formContext: UseFormReturn;
};

const FiltersSearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  catFields,
  priceFields,
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
        <MoreSearch {...{ formContext, searchFields }} />

        <CatQuery {...{ formContext, catFields }} />

        <RangePrice {...{ formContext, priceFields }} />

        <RangeRating {...{ formContext }} />
      </div>
    </div>
  );
};
export default FiltersSearchBar;
