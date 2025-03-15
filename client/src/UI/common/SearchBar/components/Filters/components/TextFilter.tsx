import { FC, useState } from "react";
import CheckBoxSwitcher from "../../../../../forms/inputFields/CheckBoxSwitcher";
import { UseFormReturn } from "react-hook-form";
import DropHandler from "../../DropHandler";
import { CiTextAlignCenter } from "react-icons/ci";
import { CheckBoxFieldType } from "../../../../../../core/config/fieldsArr/typesFields";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn;
};

const TextFilter: FC<PropsType> = ({ searchFields, formContext }) => {
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
      <DropHandler
        {...{
          isOpen,
          setIsOpen,
          txt: "Text",
          Icon: CiTextAlignCenter,
        }}
      />

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {searchFields.map((el) => (
          <CheckBoxSwitcher
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
export default TextFilter;
