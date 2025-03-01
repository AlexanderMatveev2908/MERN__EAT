/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { REG_PWD } from "../../../../constants/regex";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch?: UseFormWatch<any>;
  isVisible: boolean;
  handleChangeVisibility: () => void;
  field: {
    id: string;
    label: string;
    field: string;
    place: string;
  };
};

const PwdAuthField: FC<PropsType> = ({
  register,
  errors,
  watch,
  isVisible,
  handleChangeVisibility,
  field,
}) => {
  const defOpt = {
    required: "Password is required",
    pattern: {
      value: REG_PWD,
      message:
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    },
    validate: (val: string) => {
      if (watch) {
        if (watch("email") === val)
          return "Password and email can't be the same";
      }
      return true;
    },
  };

  const confirmOpt = {
    required: "You need to confirm password",
    validate: (val: string) => {
      if (watch) {
        if (watch("password") !== val) return "Passwords do not match";
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
          className="input_with_icon "
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
            <Eye className="icon_input" />
          ) : (
            <EyeOff className="icon_input" />
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
export default PwdAuthField;
