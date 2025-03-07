/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { AuthPwdFieldType } from "../../../config/fieldsArr/authFieldsUser";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isVisible: boolean;
  handleChangeVisibility: () => void;
  field: AuthPwdFieldType;
  watch?: UseFormWatch<any>;
  customWatch?: {
    val: string | undefined;
    msg: string;
  };
  lookEmail?: boolean;
};

const BasePwdField: FC<PropsType> = ({
  register,
  errors,
  watch,
  isVisible,
  customWatch,
  handleChangeVisibility,
  field,
  lookEmail = false,
}) => {
  const defOpt = {
    required: "Password is required",
    pattern: {
      value: field.reg,
      message: field.msg,
    },
    validate: (val: string) => {
      if (watch && lookEmail) {
        if (watch("email") === val)
          return "Password and email can't be the same 🥸";
      }

      if (customWatch?.val === val) return customWatch.msg;

      return true;
    },
  };

  const confirmOpt = {
    required: "You need to confirm password",
    validate: (val: string) => {
      if (watch) {
        if (watch("password") !== val) return "Passwords do not match 🤔";
      }
      return true;
    },
  };

  return (
    <label className="grid grid-cols-1 gap-y-3 relative">
      <span className="txt__02">{field.label}</span>
      <div className="w-full relative">
        <input
          type={isVisible ? "text" : "password"}
          className="input__auth_field "
          placeholder={field.place}
          {...register(
            field.field,
            field.field === "password" ? defOpt : confirmOpt
          )}
        />
        <span
          onClick={() => handleChangeVisibility()}
          className="w-fit flex justify-center items-center"
        >
          {isVisible ? (
            <Eye className="icon__auth_field" />
          ) : (
            <EyeOff className="icon__auth_field" />
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
