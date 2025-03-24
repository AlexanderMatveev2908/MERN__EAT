/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RadioInput from "../../../../../forms/inputFields/RadioInput";
import { SorterFieldType } from "../../../../../../core/config/fieldsArr/typesFields";
import DropHandlerIcon from "../../../../../components/DropHandlerIcon";

type PropsType = {
  sorter: SorterFieldType;
  formContext: UseFormReturn<any>;
  closeAllDrop?: boolean;
};

const SorterField: FC<PropsType> = ({ formContext, sorter, closeAllDrop }) => {
  const { register, watch, setValue } = formContext;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (val: string) =>
    setValue(
      sorter.field,
      (watch(sorter.field) || []).includes(val)
        ? watch(sorter.field).filter((el: string) => el !== val)
        : [val],
      { shouldValidate: true }
    );

  return (
    <div className="w-full grid grid-cols-1 gap-y-3">
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: sorter.label,
          Icon: sorter.icon,
          closeAllDrop,
        }}
      />

      <div
        className={`w-full grid grid-cols-2 el__flow ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {sorter.subFields.map((el, i) => (
          <RadioInput
            key={el.id}
            {...{
              el,
              register,
              currSorter: sorter.field,
              currVals: watch(sorter.field),
              handleChange,
              customStyle: i === 0 ? "" : "",
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default SorterField;
