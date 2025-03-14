import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FieldQuerySortType,
  IconFormType,
} from "../../../../config/fieldsArr/MyRestaurants/filterSort";
import MoreSearch from "./components/MoreSearch";
import CatQuery from "./components/CatQuery";
import DropHandler from "../DropHandler";
import IconsQuery from "./components/IconsQuery";

type PropsType = {
  searchFields: FieldQuerySortType[];
  catFields: FieldQuerySortType[];
  priceFields: IconFormType[];
  formContext: UseFormReturn;
};

const MoreQueries: FC<PropsType> = ({
  searchFields,
  formContext,
  catFields,
  priceFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <DropHandler
        {...{
          txt: "More queries 🤔?",
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
      >
        <MoreSearch {...{ formContext, searchFields }} />

        <CatQuery {...{ formContext, catFields }} />

        <IconsQuery {...{ formContext, priceFields }} />
      </div>
    </div>
  );
};
export default MoreQueries;
