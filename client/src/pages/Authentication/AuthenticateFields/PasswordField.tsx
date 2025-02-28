/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { FC } from "react";
import { REG_PWD } from "../../../constants/regex";
import { FieldErrors, UseFormWatch } from "react-hook-form";

type PropsType = {
  errors: FieldErrors;
  register: any;
  watch?: UseFormWatch<any>;
  isPwdVisible?: boolean;
  setIsPwdVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmPwdVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmPwdVisible?: boolean;
};

const PasswordField: FC<PropsType> = ({
  register,
  errors,
  watch,
  isPwdVisible,
  setIsPwdVisible,
  setIsConfirmPwdVisible,
  isConfirmPwdVisible,
}) => {
  console.log(isPwdVisible);
  console.log(isConfirmPwdVisible);
  return (
    <label className="grid grid-cols-1 gap-y-3 relative">
      <span className="txt__02">Password</span>
      <div className="w-full relative">
        <input
          type={isPwdVisible ? "text" : "password"}
          className="input_with_icon "
          placeholder={`Your password...`}
          {...register("password", {
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
            },
          })}
        />
        <span
          onClick={() => {
            setIsConfirmPwdVisible?.(false);
            setIsPwdVisible(!isPwdVisible);
          }}
          className="w-fit flex justify-center items-center"
        >
          {isPwdVisible ? (
            <Eye className="icon_input" />
          ) : (
            <EyeOff className="icon_input" />
          )}
        </span>
      </div>
      {errors?.password?.message && (
        <span className="txt__00 text-red-600">
          {errors.password.message as string}
        </span>
      )}
    </label>
  );
};
export default PasswordField;
