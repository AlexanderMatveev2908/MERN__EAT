import { FC } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegisterFormType } from "../Register/useRegisterCustom";

type PropsType = {
  register: UseFormRegister<RegisterFormType>;
  errors: FieldErrors;
  watch: UseFormWatch<RegisterFormType>;
  isConfirmPwdVisible: boolean;
  handleChangeConfirmPwdVisibility: () => void;
};

const ConfirmPassword: FC<PropsType> = ({
  register,
  errors,
  watch,
  isConfirmPwdVisible,
  handleChangeConfirmPwdVisibility,
}) => {
  return (
    <label className="grid grid-cols-1 gap-y-3 relative">
      <span className="txt__02">Confirm Password</span>
      <div className="w-full relative">
        <input
          type={isConfirmPwdVisible ? "text" : "password"}
          className="input_with_icon "
          placeholder={`Your password...`}
          {...register("confirmPassword", {
            validate: (val: string) => {
              if (watch("password") !== val) return "Passwords do not match";
              return true;
            },
          })}
        />
        <span
          onClick={() => handleChangeConfirmPwdVisibility()}
          className="w-fit flex justify-center items-center"
        >
          {isConfirmPwdVisible ? (
            <Eye className="icon_input" />
          ) : (
            <EyeOff className="icon_input" />
          )}
        </span>
      </div>
      {errors?.confirmPassword?.message && (
        <span className="txt__00 text-red-600">
          {errors.confirmPassword.message as string}
        </span>
      )}
    </label>
  );
};
export default ConfirmPassword;
