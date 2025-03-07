import { FC } from "react";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated/ButtonAnimated";
import AcceptTerms from "./AcceptTerms/AcceptTerms";
import BaseFormField from "../../../components/commonCompForms/BaseFormField/BaseFormField";
import BasePwdField from "../../../components/commonCompForms/BasePwdField/BasePwdField";
import SwitchForm from "../../../components/commonCompForms/SwitchForm/SwitchForm";
import PasswordChecker from "../../../components/commonCompForms/PasswordChecker/PasswordChecker";
import GeneratePwd from "../../../components/commonCompForms/GeneratePwd/GeneratePwd";
import { useRegisterCustom } from "./hooks/useRegisterCustom";
import PasswordLength from "../../../components/commonCompForms/PasswordLength/PasswordLength";
import {
  confirmPwdField,
  emailField,
  nameFieldsArr,
  pwdFieldToAccess,
} from "../../../config/fieldsArr/authFieldsUser";
import SpinnerBtnReact from "../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

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
    customPwd,
    customConfirmPwd,
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
              <BaseFormField key={field.id} {...{ register, errors, field }} />
            ))}

            <BasePwdField
              {...{
                register,
                errors,
                custom: customPwd,
                isVisible: isPwdVisible,
                handleChangeVisibility: handleChangePwdVisibility,
                field: pwdFieldToAccess,
              }}
            />

            {!!Object.keys(errors?.password ?? {})?.length && (
              <div className="w-full grid grid-cols-2 gap-5 sm:grid-cols-4">
                <PasswordChecker {...{ watch }} />
                <PasswordLength {...{ watch }} />
              </div>
            )}

            <BasePwdField
              {...{
                register,
                errors,
                custom: customConfirmPwd,
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
              <SpinnerBtnReact />
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
