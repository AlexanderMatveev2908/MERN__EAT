import { FC } from "react";
import { useRecoverPwd } from "./useRecoverPwd";
import ButtonAnimated from "./../../../components/ButtonAnimated/ButtonAnimated";
import PwdAuthField from "../AuthenticateFields/PwdAuthField/PwdAuthField";
import {
  confirmPwdField,
  pwdField,
} from "../AuthenticateFields/PwdAuthField/pwdAuthFieldsArr";
import PasswordChecker from "../AuthenticateFields/PasswordChecker/PasswordChecker";
import PasswordLength from "../AuthenticateFields/PasswordLength";
import GeneratePwd from "../AuthenticateFields/GeneratePwd/GeneratePwd";

const RecoverPwd: FC = () => {
  const {
    register,
    errors,
    watch,
    isPwdVisible,
    isConfirmPwdVisible,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
  } = useRecoverPwd();

  return (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Recover Password</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form className="grid grid-cols-1 w-full gap-y-8">
            <PwdAuthField
              {...{
                register,
                errors,
                isVisible: isPwdVisible,
                handleChangeVisibility: handleChangePwdVisibility,
                field: pwdField,
              }}
            />
            {!!Object.keys(errors?.password ?? {})?.length && (
              <div className="w-full grid grid-cols-2 gap-5 sm:grid-cols-4">
                <PasswordChecker {...{ watch }} />
                <PasswordLength {...{ watch }} />
              </div>
            )}

            <GeneratePwd />

            <PwdAuthField
              {...{
                register,
                errors,
                watch,
                isVisible: isConfirmPwdVisible,
                handleChangeVisibility: handleChangeConfirmPwdVisibility,
                field: confirmPwdField,
              }}
            />

            <div className="w-full mt-2 max-w-[250px] md:max-w-[300px] justify-self-center flex justify-center">
              <ButtonAnimated
                {...{
                  styleTxt: "txt__02 z-40 relative",
                  label: "Change Password",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RecoverPwd;
