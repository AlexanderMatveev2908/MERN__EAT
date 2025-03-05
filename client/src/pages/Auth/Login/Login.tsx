import { FC, useState } from "react";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated/ButtonAnimated";
import BasicAuthField from "../../../components/commonCompForms/BasicAuthField/BasicAuthField";
import PwdAuthField from "../../../components/commonCompForms/PwdAuthField/PwdAuthField";
import { PulseLoader } from "react-spinners";
import SwitchForm from "../SwitchForm/SwitchForm";
import { useLoginCustom } from "./hooks/useLoginCustom";
import { emailField } from "../../../components/commonCompForms/BasicAuthField/utils/basicAuthFieldsArr";
import { pwdField } from "../../../components/commonCompForms/PwdAuthField/utils/pwdAuthFieldsArr";

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
            {/* <EmailField {...{ register, errors }} /> */}
            <BasicAuthField {...{ register, errors, field: emailField }} />

            <PwdAuthField
              {...{
                register,
                errors,
                isVisible: isPwdVisible,
                handleChangeVisibility: () => setIsPwdVisible(!isPwdVisible),
                field: pwdField,
              }}
            />

            {isPending ? (
              <div className="w-full flex justify-center mt-2">
                <PulseLoader color="#f97316" size={40} />
                {/* <SpinnerBtn /> */}
              </div>
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
