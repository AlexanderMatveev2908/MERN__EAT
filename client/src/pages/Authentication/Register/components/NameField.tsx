/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { REG_NAME } from "../../../../constants/regex";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CircleUser } from "lucide-react";
import { RegisterFormType } from "../useRegisterCustom";

type PropsType = {
  errors: FieldErrors;
  register: UseFormRegister<RegisterFormType>;
  field: {
    id: string;
    label: string;
    field: string;
  };
};

const NameField: FC<PropsType> = ({ register, errors, field }) => {
  return (
    <label className="grid grid-cols-1 gap-y-3">
      <span className="txt__02">{field.label}</span>
      <div className="w-full relative">
        <input
          type="email"
          className="input_with_icon "
          placeholder={`Your ${field.label}...`}
          {...(register(field.field as keyof RegisterFormType, {
            required: `${field.label} is required`,
            validate: (val: string) => {
              console.log(val);
              if (!val || !REG_NAME.test(val))
                return `${field.label} can contain only letters and must start with uppercase char`;
            },
          }) as any)}
        />
        <CircleUser className="icon_input" />
      </div>
      {errors?.[field.field]?.message && (
        <span className="txt__00 text-red-600">
          {errors?.[field.field]?.message as string}
        </span>
      )}
    </label>
  );
};
export default NameField;
