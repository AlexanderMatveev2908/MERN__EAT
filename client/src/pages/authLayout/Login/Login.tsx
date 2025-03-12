import { FC, useState } from "react";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated";
import BaseFormField from "../../../components/InputFields/BaseFormField";
import { useLoginCustom } from "./useLoginCustom";
import SwitchForm from "../../../components/auth/SwitchForm";
import BasePwdField from "./../../../components/auth/BasePwdField";
import {
  emailField,
  pwdFieldToAccess,
} from "../../../config/fieldsArr/authFieldsUser";

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

            <div className="w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center">
              <ButtonAnimated
                {...{
                  styleTxt: "txt__02",
                  label: "Login",
                  type: "submit",
                  isPending,
                }}
              />
            </div>

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
