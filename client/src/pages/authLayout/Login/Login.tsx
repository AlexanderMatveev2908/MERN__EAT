import { FC, useState } from "react";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated/ButtonAnimated";
import BaseFormField from "../../../components/commonCompForms/BaseFormField/BaseFormField";
import BasePwdField from "../../../components/commonCompForms/BasePwdField/BasePwdField";
import SwitchForm from "../../../components/commonCompForms/SwitchForm/SwitchForm";
import { useLoginCustom } from "./hooks/useLoginCustom";
import {
  emailField,
  pwdFieldToAccess,
} from "../../../config/fieldsArr/authFieldsUser";
import SpinnerBtnReact from "../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

const Login: FC = () => {
  const { register, errors, isPending, handleLoginUser } = useLoginCustom();
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Login</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form
            onSubmit={handleLoginUser}
            className="grid grid-cols-1 w-full gap-y-8"
          >
            <BaseFormField {...{ register, errors, field: emailField }} />

            <BasePwdField
              {...{
                register,
                errors,
                isVisible: isPwdVisible,
                handleChangeVisibility: () => setIsPwdVisible(!isPwdVisible),
                field: pwdFieldToAccess,
              }}
            />

            {isPending ? (
              <SpinnerBtnReact />
            ) : (
              <div className="w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center">
                <ButtonAnimated
                  {...{
                    styleTxt: "txt__02 z-40 relative",
                    label: "Login",
                    type: "submit",
                  }}
                />
              </div>
            )}

            <div className="w-full">
              <SwitchForm {...{ type: "login" }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
