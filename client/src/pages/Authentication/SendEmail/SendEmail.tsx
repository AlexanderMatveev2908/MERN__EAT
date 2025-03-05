import { FC } from "react";
import { Navigate } from "react-router-dom";
import { emailField } from "../AuthenticateFields/BasicAuthField/basicAuthFieldsArr";
import { useSendEmail } from "./hooks/useSendEmail";
import BasicAuthField from "../AuthenticateFields/BasicAuthField/BasicAuthField";
import ButtonAnimated from "../../../components/ButtonAnimated/ButtonAnimated";
import { PulseLoader } from "react-spinners";
// import SpinnerBtn from "../../../components/SpinnerBtn/SpinnerBtn";

const SendEmail: FC = () => {
  const { register, errors, canStay, type, isPending, handleSubmitEmail } =
    useSendEmail();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">
          {type === "recover-pwd" ? "Recover Password" : "Verify Account"}
        </span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form
            onSubmit={handleSubmitEmail}
            className="grid grid-cols-1 w-full gap-y-8"
          >
            <BasicAuthField {...{ register, errors, field: emailField }} />

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
                    label: "Send Email",
                    type: "submit",
                  }}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default SendEmail;
