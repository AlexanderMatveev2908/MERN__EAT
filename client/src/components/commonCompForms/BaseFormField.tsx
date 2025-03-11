/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AuthFieldUserType } from "../../config/fieldsArr/authFieldsUser";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  field: AuthFieldUserType;
  custom?: (val: any) => any;
};

const BaseFormField: FC<PropsType> = ({ register, errors, field, custom }) => {
  return (
    <label className="grid grid-cols-1 gap-y-3">
      <span className="txt__02">{field.label}</span>
      <div className="w-full relative">
        <input
          type={field.type}
          className="input__auth_field "
          placeholder={`Your ${field.label}...`}
          {...(register(field.field, {
            required: `${field.label} is required`,
            validate: (val: string) => {
              if (!val || !field.reg.test(val)) return field.msg;
              return custom ? custom?.(val) : true;
            },
          }) as any)}
        />
        <field.svg className="svg__auth_field" />
      </div>
      {errors?.[field.field]?.message && (
        <span className="txt__00 text-red-600">
          {errors?.[field.field]?.message as string}
        </span>
      )}
    </label>
  );
};
export default BaseFormField;
