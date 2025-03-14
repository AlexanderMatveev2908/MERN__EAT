import { FC, useState } from "react";
import Switcher from "../../../../../components/inputFields/Switcher";
import { FieldQuerySortType } from "../../../../../config/fieldsArr/MyRestaurants/filterSort";
import { UseFormReturn } from "react-hook-form";
import DropHandler from "../../DropHandler";

type PropsType = {
  searchFields: FieldQuerySortType[];
  formContext: UseFormReturn;
};

const MoreSearch: FC<PropsType> = ({ searchFields, formContext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, watch, setValue } = formContext;

  const customValidate = (val: string[]) =>
    val.includes("id") ? setValue("searchVals", ["id"]) : true;
  const handleClick = (el: string) =>
    watch("searchVals").includes("id") && watch("searchVals").length === 1
      ? setValue("searchVals", [el])
      : null;

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandler {...{ isOpen, setIsOpen, txt: "Search by text" }} />

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {searchFields.map((el) => (
          <Switcher
            key={el.id}
            {...{
              register,
              el,
              watch,
              customValidate,
              handleClick,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default MoreSearch;
