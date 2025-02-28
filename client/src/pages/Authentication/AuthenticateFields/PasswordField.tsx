import { Eye, EyeOff } from "lucide-react";
import { FC, useState } from "react";
import { REG_PWD } from "../../../constants/regex";
import { UseFormRegister } from "react-hook-form";
import { LoginFormType } from "../Login/useLoginCustom";

type PropsType = {
  register: UseFormRegister<LoginFormType>;
  children?: React.ReactNode;
};

const PasswordField: FC<PropsType> = ({ children, register }) => {
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);

  return (
    <label className="grid grid-cols-1 gap-y-3 relative">
      <span className="txt__02">Password</span>
      <div className="w-full relative">
        <input
          type={isPwdVisible ? "text" : "password"}
          className="input_with_icon "
          placeholder="Your Email"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: REG_PWD,
              message:
                "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.",
            },
          })}
        />
        <span
          onClick={() => setIsPwdVisible(!isPwdVisible)}
          className="w-fit flex justify-center items-center"
        >
          {isPwdVisible ? (
            <Eye className="icon_input" />
          ) : (
            <EyeOff className="icon_input" />
          )}
        </span>
      </div>
      {children}
    </label>
  );
};
export default PasswordField;
