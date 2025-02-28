import { FC, useState } from "react";
import { useRegisterCustom } from "./useRegisterCustom";
import EmailField from "../AuthenticateFields/EmailField";
import ButtonAnimated from "../../../components/ButtonAnimated/ButtonAnimated";
import PasswordField from "../AuthenticateFields/PasswordField";
import SwitchForm from "../AuthenticateFields/SwitchForm";
import PasswordChecker from "./components/PasswordChecker";
import PasswordLength from "./components/PasswordLength";
import ConfirmPassword from "./components/ConfirmPassword";
import {
  isValidPiecePwd,
  loginNameFieldsArr,
  registerRegArr,
} from "./registerFieldsArr";
import NameField from "./components/NameField";

const Register: FC = () => {
  const { register, errors, watch } = useRegisterCustom();

  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Register</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form className="grid grid-cols-1 w-full gap-y-8">
            {loginNameFieldsArr.map((field) => (
              <NameField key={field.id} {...{ register, errors, field }} />
            ))}

            <EmailField {...{ register, errors }} />

            <PasswordField
              {...{
                register,
                errors,
                watch,
                isPwdVisible,
                setIsPwdVisible,
                isConfirmPwdVisible,
              }}
            />

            {!!Object.keys(errors ?? {})?.length && (
              <div className="w-full grid grid-cols-2 gap-5 sm:grid-cols-4">
                {registerRegArr.map((field) => (
                  <PasswordChecker
                    key={field.id}
                    {...{
                      isValid: isValidPiecePwd(watch("password"), field.reg),
                      field,
                    }}
                  />
                ))}
                <PasswordLength {...{ watch }} />
              </div>
            )}

            <ConfirmPassword
              {...{
                errors,
                watch,
                register,
                isConfirmPwdVisible,
                setIsConfirmPwdVisible,
                setIsPwdVisible,
                isPwdVisible,
              }}
            />

            <div className="w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center">
              <ButtonAnimated
                {...{ styleTxt: "txt__02 z-40 relative", label: "Login" }}
              />
            </div>

            <div className="w-full">
              <SwitchForm {...{ type: "register" }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
