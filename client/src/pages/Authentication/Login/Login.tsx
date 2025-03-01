import { FC, useState } from "react";
import { useLoginCustom } from "./useLoginCustom";
import EmailField from "../AuthenticateFields/EmailField";
import PasswordField from "../AuthenticateFields/PasswordField";
import ButtonAnimated from "../../../components/ButtonAnimated/ButtonAnimated";
import SwitchForm from "../AuthenticateFields/SwitchForm";

const Login: FC = () => {
  const { register, errors } = useLoginCustom();
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Login</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form className="grid grid-cols-1 w-full gap-y-8">
            <EmailField {...{ register, errors }} />

            <PasswordField
              {...{
                register,
                errors,
                isPwdVisible,
                handleChangePwdVisibility: () => setIsPwdVisible(!isPwdVisible),
              }}
            />

            <div className="w-full mt-2 max-w-[225px] md:max-w-[250px] justify-self-center flex justify-center">
              <ButtonAnimated
                {...{ styleTxt: "txt__02 z-40 relative", label: "Login" }}
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
