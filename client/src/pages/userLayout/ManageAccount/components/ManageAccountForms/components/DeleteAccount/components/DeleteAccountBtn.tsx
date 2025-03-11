import { Trash2 } from "lucide-react";
import { FC } from "react";
import { ShowToastType } from "../../../../../../../../types/toastTypes";
import { SetChildLoadingType } from "../../../ManageAccountForms";
import { handleErrManageUserType } from "../../../../../hooks/useManageAccount";
import SpinnerBtnReact from "../../../../../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import { useDeleteAccountBtn } from "./hooks/useDeleteAccountBtn";

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
  const { handleSubmitDeleteAccount, isPending } = useDeleteAccountBtn({
    showToastMsg,
    setIsChildLoading,
    handleErrManageUser,
  });

  return isPending ? (
    <div className="w-full flex justify-center mt-14">
      <SpinnerBtnReact />
    </div>
  ) : (
    <div className="w-full flex justify-center mt-14">
      <button
        onClick={handleSubmitDeleteAccount}
        className="max-w-fit group border-2 border-red-600 transition-all duration-300 hover:scale-120 rounded-xl gap-3 cursor-pointer"
      >
        <div className="px-5 py-2 w-full flex justify-start gap-3">
          <Trash2 className="w-[30px] h-[30px] transition-all duration-300 group-hover:text-red-600" />
          <span className="txt__02 transition-all duration-300 group-hover:text-red-600">
            Delete Account
          </span>
        </div>
      </button>
    </div>
  );
};
export default DeleteAccountBtn;
