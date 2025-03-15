/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldNoIconType } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  field: FieldNoIconType;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  customValidate?: (val: any) => any;
};

const FormFieldNoIcon: FC<PropsType> = ({
  field,
  register,
  errors,
  customValidate,
}) => {
  return (
    <div className="max-w-full w-full grid grid-cols-1 gap-y-3 justify-items-start">
      <label className="w-full flex flex-col gap-y-2 justify-start">
        <span className="txt__02">{field.label}</span>

        <input
          type={field?.type ?? "text"}
          {...register(field.field, {
            required: field?.required ? `${field.label} is required` : false,
            pattern: { value: field.reg, message: field.msg },
            validate: (val) => (customValidate ? customValidate(val) : true),
          })}
          className="input__base txt__02"
          placeholder={field?.place ?? `Your ${field.label}...`}
        />
      </label>

      {errors?.[field.field]?.message && (
        <span className="txt__01 text-red-600">
          {errors[field.field]?.message as string}
        </span>
      )}
    </div>
  );
};
export default FormFieldNoIcon;
