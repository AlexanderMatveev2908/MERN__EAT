import { FC } from "react";
import { useRegisterCustom } from "./useRegisterCustom";
import ButtonAnimated from "../../../components/ButtonAnimated/ButtonAnimated";
import SwitchForm from "../AuthenticateFields/SwitchForm/SwitchForm";
import PasswordChecker from "../AuthenticateFields/PasswordChecker/PasswordChecker";
import PasswordLength from "../AuthenticateFields/PasswordLength";
import GeneratePwd from "../AuthenticateFields/GeneratePwd/GeneratePwd";
import AcceptTerms from "./AcceptTerms/AcceptTerms";
import BasicAuthField from "../AuthenticateFields/BasicAuthField/BasicAuthField";
import PwdAuthField from "../AuthenticateFields/PwdAuthField/PwdAuthField";
import {
  confirmPwdField,
  pwdField,
} from "../AuthenticateFields/PwdAuthField/pwdAuthFieldsArr";
import {
  emailField,
  nameFieldsArr,
} from "../AuthenticateFields/BasicAuthField/basicAuthFieldsArr";
// import SpinnerBtn from "../../../components/SpinnerBtn/SpinnerBtn";
import { PacmanLoader } from "react-spinners";

const Register: FC = () => {
  const {
    register,
    errors,
    watch,
    isPwdVisible,
    isConfirmPwdVisible,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    isPending,
    handleRegister,
  } = useRegisterCustom();

  return (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Register</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 w-full gap-y-8"
          >
            {[...nameFieldsArr, emailField].map((field) => (
              <BasicAuthField key={field.id} {...{ register, errors, field }} />
            ))}

            <PwdAuthField
              {...{
                register,
                errors,
                watch,
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

            <GeneratePwd />

            <AcceptTerms
              {...{ register, errors, valTerms: watch("acceptedTerms") }}
            />

            {isPending ? (
              <div className="w-full flex justify-center">
                {/* <SpinnerBtn /> */}
                <PacmanLoader color="#f97316" size={40} />
              </div>
            ) : (
              <div className="w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center">
                <ButtonAnimated
                  {...{
                    styleTxt: "txt__02 z-40 relative",
                    label: "Register",
                    type: "submit",
                  }}
                />
              </div>
            )}

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
