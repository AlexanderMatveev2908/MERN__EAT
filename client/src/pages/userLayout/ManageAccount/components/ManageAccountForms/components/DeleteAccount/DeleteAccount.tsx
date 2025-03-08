import { FC } from "react";
import DeleteAccountBtn from "./DeleteAccountBtn/DeleteAccountBtn";
import { ShowToastType } from "../../../../../../../types/toastTypes";
import { SetChildLoadingType } from "../../ManageAccountForms";
import { handleErrManageUserType } from "../../../../hooks/useManageAccount";

type PropsType = {
  showToastMsg: ShowToastType;
  setIsChildLoading: SetChildLoadingType;
  handleErrManageUser: handleErrManageUserType;
};

const DeleteAccount: FC<PropsType> = ({
  showToastMsg,
  setIsChildLoading,
  handleErrManageUser,
}) => {
  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5 py-5 pb-10 px-5 sm:px-10">
      <span className="txt__03">Delete Account</span>

      <div>
        <span className="txt__02">This action is&nbsp;</span>
        <span className="txt__03">irreversible&nbsp;</span>
        <span className="txt__02">
          , continuing you will delete your account and all associated data,
          without possibility of recovery.
        </span>
      </div>

      <DeleteAccountBtn
        {...{ showToastMsg, setIsChildLoading, handleErrManageUser }}
      />
    </div>
  );
};
export default DeleteAccount;
