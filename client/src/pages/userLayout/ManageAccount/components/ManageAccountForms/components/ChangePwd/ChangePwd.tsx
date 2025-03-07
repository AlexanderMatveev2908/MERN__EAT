import { FC } from "react";
import SpinnerBtnReact from "../../../../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import ButtonBasic from "../../../../../../../components/buttons/ButtonBasic/ButtonBasic";
import BasePwdField from "../../../../../../../components/commonCompForms/BasePwdField/BasePwdField";
import { useChangePwd } from "./hooks/useChangePwd";
import {
  confirmPwdField,
  pwdFieldToChangeOldPwd,
} from "../../../../../../../config/fieldsArr/authFieldsUser";
import PasswordChecker from "../../../../../../../components/commonCompForms/PasswordChecker/PasswordChecker";
import PasswordLength from "../../../../../../../components/commonCompForms/PasswordLength/PasswordLength";
import { PropsForChildren } from "../../ManageAccountForms";

const ChangePwd: FC<PropsForChildren> = ({
  showToastMsg,
  handleErrAPI,
  setIsChildLoading,
  currUser,
}) => {
  const {
    register,
    errors,
    watch,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    isConfirmPwdVisible,
    isPwdVisible,
  } = useChangePwd();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10">
      <span className="txt__03">Change Password</span>

      <form className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <div className="w-full">
          <BasePwdField
            {...{
              field: pwdFieldToChangeOldPwd,
              register,
              errors,
              isVisible: isPwdVisible,
              handleChangeVisibility: handleChangePwdVisibility,
              customWatch: {
                val: currUser?.email,
                msg: "You can't change your password with your current email 🥸",
              },
            }}
          />
        </div>

        {!!Object.keys(errors ?? {})?.length && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
            <PasswordChecker {...{ watch }} />

            <PasswordLength {...{ watch }} />
          </div>
        )}

        <div className="w-full">
          <BasePwdField
            {...{
              field: confirmPwdField,
              register,
              errors,
              isVisible: isConfirmPwdVisible,
              handleChangeVisibility: handleChangeConfirmPwdVisibility,
              watch,
            }}
          />
        </div>

        {false ? (
          <SpinnerBtnReact />
        ) : (
          <div className="w-full flex justify-center max-w-[250px] mt-5">
            <ButtonBasic
              {...{ styleTxt: "txt__02", label: "Submit", type: "submit" }}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default ChangePwd;
