import { FC } from "react";
import { ShowToastType } from "../../../../../../../types/allTypes/toastTypes";
import { SetChildLoadingType } from "../../ManageAccountForms";
import { handleErrManageUserType } from "../../../../useManageAccount";
import DeleteButton from "../../../../../../../UI/components/buttons/DeleteButton";
import { useDeleteAccount } from "./useDeleteAccount";

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
  const { handleSubmitDeleteAccount } = useDeleteAccount({
    showToastMsg,
    setIsChildLoading,
    handleErrManageUser,
  });
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

      <div className="w-full flex justify-center mt-14">
        <DeleteButton
          {...{
            handleDelete: handleSubmitDeleteAccount,
            txt: "Delete account",
          }}
        />
      </div>
    </div>
  );
};
export default DeleteAccount;
