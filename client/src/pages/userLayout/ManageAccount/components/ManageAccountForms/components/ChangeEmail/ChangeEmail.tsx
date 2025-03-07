/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useChangeEmail } from "./hooks/useChangeEmail";
import BasicAuthField from "../../../../../../../components/commonCompForms/BasicAuthField/BasicAuthField";
import { changeEmailField } from "../../../../../../../config/fieldsArr/basicFieldsUser";
import { CurrUserType } from "../../../../../../../types/userTypes";
import ButtonBasic from "./../../../../../../../components/buttons/ButtonBasic/ButtonBasic";
import { ShowToastType } from "../../../../../../../types/toastTypes";
import SpinnerBtnReact from "../../../../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  currUser: CurrUserType | null;
  showToastMsg: ShowToastType;
  handleErrAPI: ({ err }: { err: any }) => void;
};

const ChangeEmail: FC<PropsType> = ({
  currUser,
  showToastMsg,
  handleErrAPI,
}) => {
  const { register, errors, handleSubmitChangeEmail, isPending } =
    useChangeEmail({ showToastMsg, handleErrAPI });

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10">
      <span className="txt__03">Change Email</span>

      <form
        onSubmit={handleSubmitChangeEmail}
        className="w-full grid grid-cols-1 justify-items-center gap-y-10"
      >
        <div className="w-full">
          <BasicAuthField
            {...{
              register,
              errors,
              field: changeEmailField,
              customWatch: {
                val: currUser?.email,
                msg: "New email can not be the same as the old one 🥸",
              },
            }}
          />
        </div>

        {isPending ? (
          <SpinnerBtnReact />
        ) : (
          <div className="w-full flex justify-center max-w-[250px]">
            <ButtonBasic
              {...{ styleTxt: "txt__02", label: "Submit", type: "submit" }}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default ChangeEmail;
