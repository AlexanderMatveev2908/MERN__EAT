/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldNoIconType } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  field: FieldNoIconType;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  customValidate?: (val: string) => string | boolean;
  indexForm?: number;
};

const FormFieldNoIcon: FC<PropsType> = ({
  field,
  register,
  errors,
  customValidate,
  indexForm,
}) => {
  const errToShow =
    indexForm || indexForm === 0
      ? errors?.items?.[indexForm]?.[field.field.split(".").pop()]?.message
      : errors?.[field.field]?.message;

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

      {errToShow && (
        <span className="txt__01 text-red-600">{errToShow as string}</span>
      )}
    </div>
  );
};
export default FormFieldNoIcon;
