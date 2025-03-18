/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldNoIconType } from "../../../../core/config/fieldsArr/typesFields";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  field: FieldNoIconType;
  customValidate?: (val: string | number) => string | boolean;
  indexForm: number;
};

const FieldMultipleForms: FC<PropsType> = ({
  register,
  errors,
  field,
  customValidate,
  indexForm,
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

      {errors?.items?.[indexForm]?.[field.field.split(".").pop()]?.message && (
        <span className="txt__01 text-red-600">
          {
            errors?.items?.[indexForm]?.[field.field.split(".").pop()]
              ?.message as string
          }
        </span>
      )}
    </div>
  );
};
export default FieldMultipleForms;
