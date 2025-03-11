import { FC } from "react";
import { useChangeEmail } from "./hooks/useChangeEmail";
import BaseFormField from "../../../../../../../components/commonCompForms/BaseFormField";
import { changeEmailField } from "../../../../../../../config/fieldsArr/authFieldsUser";
import SpinnerBtnReact from "../../../../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import { PropsForChildren } from "../../ManageAccountForms";
import ButtonAnimated from "../../../../../../../components/buttons/ButtonAnimated";

const ChangeEmail: FC<Omit<PropsForChildren, "setCanManageAccount">> = ({
  currUser,
  showToastMsg,
  setIsChildLoading,
  handleErrManageUser,
}) => {
  const { register, errors, handleSubmitChangeEmail, isPending, custom } =
    useChangeEmail({
      showToastMsg,
      setIsChildLoading,
      handleErrManageUser,
    });

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 px-5 sm:px-10 h-[300px]">
      <span className="txt__03">Change Email</span>

      <form
        onSubmit={handleSubmitChangeEmail}
        className="w-full grid grid-cols-1 justify-items-center gap-y-6"
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
            <ButtonAnimated
              {...{ styleTxt: "txt__02", label: "Submit", type: "submit" }}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default ChangeEmail;
