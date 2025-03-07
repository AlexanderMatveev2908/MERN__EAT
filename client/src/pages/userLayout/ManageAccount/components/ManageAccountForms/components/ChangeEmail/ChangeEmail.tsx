/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useChangeEmail } from "./hooks/useChangeEmail";
import BaseFormField from "../../../../../../../components/commonCompForms/BaseFormField/BaseFormField";
import { changeEmailField } from "../../../../../../../config/fieldsArr/authFieldsUser";
import ButtonBasic from "./../../../../../../../components/buttons/ButtonBasic/ButtonBasic";
import SpinnerBtnReact from "../../../../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import { PropsForChildren } from "../../ManageAccountForms";

const ChangeEmail: FC<PropsForChildren> = ({
  currUser,
  showToastMsg,
  handleErrAPI,
  setIsChildLoading,
}) => {
  const { register, errors, handleSubmitChangeEmail, isPending, custom } =
    useChangeEmail({ showToastMsg, handleErrAPI, setIsChildLoading });

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10">
      <span className="txt__03">Change Email</span>

      <form
        onSubmit={handleSubmitChangeEmail}
        className="w-full grid grid-cols-1 justify-items-center gap-y-10"
      >
        <div className="w-full">
          <BaseFormField
            {...{
              register,
              errors,
              field: changeEmailField,
              custom: (newEmail: string) => custom(newEmail, currUser?.email),
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
