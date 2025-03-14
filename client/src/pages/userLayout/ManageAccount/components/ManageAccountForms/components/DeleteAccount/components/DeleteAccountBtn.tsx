import { FC } from "react";
import { ShowToastType } from "../../../../../../../../types/toastTypes";
import { SetChildLoadingType } from "../../../ManageAccountForms";
import { handleErrManageUserType } from "../../../../../useManageAccount";
import { useDeleteAccountBtn } from "./useDeleteAccountBtn";
import DeleteButton from "../../../../../../../../components/buttons/DeleteButton";

type PropsType = {
  showToastMsg: ShowToastType;
  setIsChildLoading: SetChildLoadingType;
  handleErrManageUser: handleErrManageUserType;
};

const DeleteAccountBtn: FC<PropsType> = ({
  showToastMsg,
  setIsChildLoading,
  handleErrManageUser,
}) => {
  const { handleSubmitDeleteAccount } = useDeleteAccountBtn({
    showToastMsg,
    setIsChildLoading,
    handleErrManageUser,
  });

  return (
    <div className="w-full flex justify-center mt-14">
      <DeleteButton
        {...{ handleDelete: handleSubmitDeleteAccount, txt: "Account" }}
      />
    </div>
  );
};
export default DeleteAccountBtn;
