import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import CheckBox from "../../../../../forms/inputFields/CheckBox";
import DropHandler from "../../DropHandler";
import { SearchFilterType } from "../../../../../../core/config/fieldsArr/typesFields";

type PropsType = {
  field: SearchFilterType;
  formContext: UseFormReturn;
};

const FilterField: FC<PropsType> = ({ formContext, field }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, watch } = formContext;

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandler
        {...{ isOpen, setIsOpen, txt: field.label, Icon: field.icon }}
      />

      <div
        className={`w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-3"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {field.subFields.map((el) => (
          <CheckBox
            key={el.id}
            {...{
              register,
              field: el,
              valsChosen: watch(field.field),
              currCategory: field.field,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default FilterField;
