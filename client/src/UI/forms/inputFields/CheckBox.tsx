/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { CheckBoxFieldType } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  field: CheckBoxFieldType;
  register: UseFormRegister<any>;
  valsChosen: string[];
  customValidate?: (val: string[]) => boolean | string;
  currCategory: string;
};

const CheckBox: FC<PropsType> = ({
  field,
  register,
  valsChosen,
  customValidate,
  currCategory,
}) => {
  const isIn = valsChosen?.includes?.(field.field);

  return (
    <label
      className={`w-full flex items-center border-2 rounded-xl py-2 el__flow cursor-pointer ${
        isIn ? "scale-105 border-orange-500" : "border-[#222]"
      }`}
    >
      <input
        type="checkbox"
        value={field.field}
        {...register(currCategory as string, {
          validate: (val: string[]) =>
            customValidate ? customValidate(val) : true,
        })}
        className="opacity-0 w-0 h-0"
      />

      <span
        className={`txt__01 w-full flex justify-center break-all el__flow ${
          isIn ? "text-orange-500" : ""
        }`}
      >
        {field?.label ?? field.field.toUpperCase()}
      </span>
    </label>
  );
};
export default CheckBox;
