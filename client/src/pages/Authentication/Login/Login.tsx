import { FC } from "react";
import { useLoginCustom } from "./useLoginCustom";
import EmailField from "../AuthenticateFields/EmailField";
import PasswordField from "../AuthenticateFields/PasswordField";
import { loginRegArr } from "./regexLogin";
import PasswordChecker from "../AuthenticateFields/PasswordChecker";

const Login: FC = () => {
  const { register, errors, watch } = useLoginCustom();

  return (
    <div className="w-full grid grid-cols-1 px-6 py-10">
      <form className="grid grid-cols-1 w-full gap-y-8">
        <EmailField {...{ register, errors }} />

        <PasswordField {...{ register }}>
          <div className="w-full grid grid-cols-1">
            <PasswordChecker {...{ loginRegArr, watch }} />

            {/* <div className="w-full grid grid-cols-1">
              <div className="w-full grid grid-cols-2">
                <span>
                  {/^(?=.*[A-Z]).$/.test(watchPassword) ? (
                    <CircleCheckBig />
                  ) : (
                    <CircleX />
                  )}
                </span>
                <span>ABC...</span>
              </div>
              <div className="w-full grid grid-cols-2">
                <span>abc..</span>
                <span></span>
              </div>
            </div> */}

            {/* <div className="w-full grid grid-cols-1">
              <div className="w-full grid grid-cols-2">
                <span>123...</span>
                <span></span>
              </div>
              <div className="w-full grid grid-cols-2">
                <span>!@#...</span>
                <span></span>
              </div>
            </div> */}
          </div>
        </PasswordField>
      </form>
    </div>
  );
};
export default Login;
