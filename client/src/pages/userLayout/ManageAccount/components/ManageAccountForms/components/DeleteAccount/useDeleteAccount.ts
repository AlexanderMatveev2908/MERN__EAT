import { useMutation } from "@tanstack/react-query";
import { ShowToastType } from "../../../../../../../types/allTypes/toastTypes";
import { SetChildLoadingType } from "../../ManageAccountForms";
import { useNavigate } from "react-router-dom";
import { handleErrManageUserType } from "../../../../useManageAccount";
import { PopupPayloadSetter } from "../../../../../../../types/allTypes/popup";
import { usePopup, useUser } from "../../../../../../../core/hooks/useGlobal";
import { deleteAccountAPI } from "../../../../../../../core/api/api";
import { ErrFoodApp } from "../../../../../../../types/allTypes/API";

export const useDeleteAccount = ({
  showToastMsg,
  setIsChildLoading,
  handleErrManageUser,
}: {
  showToastMsg: ShowToastType;
  setIsChildLoading: SetChildLoadingType;
  handleErrManageUser: handleErrManageUserType;
}) => {
  const navigate = useNavigate();
  const { logoutUser } = useUser();
  const { setPopup, popup } = usePopup();

  const { mutate, isPending } = useMutation({
    mutationFn: (manageAccountToken: string) => {
      setIsChildLoading(true);
      setPopup({ ...(popup as PopupPayloadSetter), isPending: true });

      return deleteAccountAPI(manageAccountToken);
    },
    onSuccess: () => {
      navigate("/", { replace: true });
      logoutUser();
      showToastMsg("Account deleted successfully", "SUCCESS");
    },
    onError: (err: ErrFoodApp) => {
      handleErrManageUser({ err });
    },
    onSettled: () => {
      setPopup(null);
      setIsChildLoading(false);
    },
  });

  const handleDeleteAccount = () => {
    mutate(sessionStorage.getItem("manageAccountToken") ?? "");
  };

  const handleSubmitDeleteAccount = () => {
    setPopup({
      txt: "delete your account?",
      redLabel: "Delete account",
      isPending,
      confirmAction: handleDeleteAccount,
    });
  };

  return { handleSubmitDeleteAccount, isPending, handleDeleteAccount };
};
