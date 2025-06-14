/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AuthFieldUserTypeNoSvg } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isVisible: boolean;
  handleChangeVisibility: () => void;
  field: AuthFieldUserTypeNoSvg;
  custom?: (val: string) => string | boolean;
};

const BasePwdField: FC<PropsType> = ({
  register,
  errors,
  isVisible,
  handleChangeVisibility,
  field,
  custom,
}) => {
  const defOpt = {
    required: "Password is required",
    pattern: {
      value: field.reg,
      message: field.msg,
    },
    validate: (val: string) => {
      return custom ? custom(val) : true;
    },
  };

  return (
    <label className="grid grid-cols-1 gap-y-3 relative">
      <span className="txt__01">{field.label}</span>
      <div className="w-full relative">
        <input
          type={isVisible ? "text" : "password"}
          className="input__auth_field "
          placeholder={field.place}
          {...register(field.field, defOpt)}
        />
        <span
          onClick={() => handleChangeVisibility()}
          className="w-fit flex justify-center items-center"
        >
          {isVisible ? (
            <Eye className="svg__auth_field" />
          ) : (
            <EyeOff className="svg__auth_field" />
          )}
        </span>
      </div>
      {errors?.[field.field]?.message && (
        <span className="txt__00 text-red-600">
          {errors?.[field.field]?.message as string}
        </span>
      )}
    </label>
  );
};
export default BasePwdField;
