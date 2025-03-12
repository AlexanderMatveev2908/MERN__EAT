import { FC } from "react";
import { useChangePwd } from "./useChangePwd";
import {
  confirmPwdField,
  pwdFieldToChangeOldPwd,
} from "../../../../../../../config/fieldsArr/authFieldsUser";
import PasswordLength from "../../../../../../../components/auth/PasswordLength";
import { PropsForChildren } from "../../ManageAccountForms";
import ButtonAnimated from "../../../../../../../components/buttons/ButtonAnimated";
import PasswordChecker from "../../../../../../../components/auth/PasswordChecker";
import BasePwdField from "../../../../../../../components/auth/BasePwdField";
import GeneratePwd from "../../../../../../../components/auth/GeneratePwd/GeneratePwd";

const ChangePwd: FC<PropsForChildren> = ({
  showToastMsg,
  handleErrManageUser,
  setIsChildLoading,
  currUser,
  setCanManageAccount,
}) => {
  const {
    register,
    errors,
    watch,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    isConfirmPwdVisible,
    isPwdVisible,
    customPwd,
    customConfirmPwd,
    isPending,
    handleSubmitChangePwd,
  } = useChangePwd({
    showToastMsg,
    handleErrManageUser,
    setIsChildLoading,
    setCanManageAccount,
  });

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10">
      <span className="txt__03">Change Password</span>

      <form
        onSubmit={handleSubmitChangePwd}
        className="w-full grid grid-cols-1 justify-items-center gap-y-5"
      >
        <div className="w-full">
          <BasePwdField
            {...{
              field: pwdFieldToChangeOldPwd,
              register,
              errors,
              isVisible: isPwdVisible,
              handleChangeVisibility: handleChangePwdVisibility,
              custom: (val: string) => customPwd(val, currUser?.email),
            }}
          />
        </div>

        {!!Object.keys(errors?.newPassword ?? {}).length && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
            <PasswordChecker {...{ watch }} />

            <PasswordLength {...{ watch }} />
          </div>
        )}

        <GeneratePwd />

        <div className="w-full">
          <BasePwdField
            {...{
              field: confirmPwdField,
              register,
              errors,
              isVisible: isConfirmPwdVisible,
              handleChangeVisibility: handleChangeConfirmPwdVisibility,
              custom: customConfirmPwd,
            }}
          />
        </div>

        <div className="w-full flex justify-center max-w-[250px] mt-5">
          <ButtonAnimated
            {...{
              styleTxt: "txt__02",
              label: "Submit",
              type: "submit",
              isPending,
            }}
          />
        </div>
      </form>
    </div>
  );
};
export default ChangePwd;
