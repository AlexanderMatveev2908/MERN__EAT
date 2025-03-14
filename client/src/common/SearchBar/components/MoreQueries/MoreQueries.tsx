import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FieldQuerySortType } from "../../../../config/fieldsArr/MyRestaurants/filterSort";
import MoreSearch from "./components/MoreSearch";
import CatQuery from "./components/CatQuery";

type PropsType = {
  searchFields: FieldQuerySortType[];
  catFields: FieldQuerySortType[];
  formContext: UseFormReturn;
};

const MoreQueries: FC<PropsType> = ({
  searchFields,
  formContext,
  catFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-b-[3px] pb-1 flex justify-between border-orange-500 group cursor-pointer"
      >
        <span className="txt__02 group-hover:text-orange-500 el__flow">
          More queries 🤔 ?
        </span>

        <ChevronDown
          className={`w-[35px] h-[35px] group-hover:text-orange-500 el__flow ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`w-full grid grid-cols-1 transition-all duration-300 gap-2 ${
          isOpen
            ? "max-h-[2000px] opacity-100 pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <MoreSearch {...{ formContext, searchFields }} />

        <CatQuery {...{ formContext, catFields }} />
      </div>
    </div>
  );
};
export default MoreQueries;
