/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { REG_EMAIL } from "../../../constants/regex";
import { Mail } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type PropsType = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
};

const EmailField: FC<PropsType> = ({ errors, register }) => {
  return (
    <label className="grid grid-cols-1 gap-y-3">
      <span className="txt__02">Email</span>
      <div className="w-full relative">
        <input
          type="email"
          className="input_with_icon "
          placeholder="Your email..."
          {...(register("email", {
            required: "Email is required",
            pattern: {
              value: REG_EMAIL,
              message: "Invalid email address",
            },
          }) as any)}
        />
        <Mail className="icon_input" />
      </div>
      {errors?.email?.message && (
        <span className="txt__00 text-red-600">
          {errors.email.message as string}
        </span>
      )}
    </label>
  );
};
export default EmailField;
