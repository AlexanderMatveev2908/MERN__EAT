import { CircleCheckBig } from "lucide-react";
import { FC } from "react";
import { useNoticeUnSubscribe } from "./useNoticeUnSubscribe";
import ButtonAnimated from "../../../components/buttons/ButtonAnimated/ButtonAnimated";
import SpinnerBtnReact from "../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import BasicAuthField from "../../../components/commonCompForms/BasicAuthField/BasicAuthField";
import { emailField } from "../../../config/fieldsArr/userFormFields";
import { Navigate } from "react-router-dom";

const NoticeUnSubscribe: FC = () => {
  const { canStay, success, register, errors, handleSubmitEmail, isPending } =
    useNoticeUnSubscribe();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : success ? (
    <div className="w-full grid grid-cols-1 gap-y-10 items-center">
      <div className="w-full flex justify-center">
        <span className="txt__04">Send unsubscribe link</span>
      </div>

      <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl p-10">
        <div className="w-full grid grid-cols-1">
          <form
            onSubmit={handleSubmitEmail}
            className="grid grid-cols-1 w-full gap-y-8"
          >
            <BasicAuthField {...{ register, errors, field: emailField }} />

            {isPending ? (
              <SpinnerBtnReact />
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
  ) : (
    <div className="w-full flex flex-col items-center gap-y-14">
      <div className="w-full flex justify-center">
        <span className="txt__04 leading-10 lg:leading-16">
          Your subscription has deleted successfully, if you unsubscribe by
          mistake don&apos;t worry, you can subscribe again anytime ✌🏼
        </span>
      </div>

      <div className="w-full flex justify-center items-center">
        <CircleCheckBig className="w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600" />
      </div>
    </div>
  );
};
export default NoticeUnSubscribe;
