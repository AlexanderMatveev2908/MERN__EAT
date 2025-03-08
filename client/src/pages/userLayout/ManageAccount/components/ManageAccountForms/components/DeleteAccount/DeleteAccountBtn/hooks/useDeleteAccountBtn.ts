/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { ShowToastType } from "../../../../../../../../../types/toastTypes";
import { SetChildLoadingType } from "../../../../ManageAccountForms";
import { deleteAccountAPI } from "../../../../../../../../../api/user";
import { useNavigate } from "react-router-dom";
import { handleErrManageUserType } from "../../../../../../hooks/useManageAccount";
import { useUser } from "../../../../../../../../../hooks/useGlobal";

export const useDeleteAccountBtn = ({
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

  const { mutate, isPending } = useMutation({
    mutationFn: (manageAccountToken: string) => {
      setIsChildLoading(true);

      return deleteAccountAPI(manageAccountToken);
    },
    onSuccess: () => {
      logoutUser();
      navigate("/", { replace: true });
      showToastMsg("Account deleted successfully", "SUCCESS");
    },
    onError: (err: any) => {
      handleErrManageUser(err);
    },
    onSettled: () => {
      setIsChildLoading(false);
    },
  });

  const handleSubmitDeleteAccount = () => {
    mutate(sessionStorage.getItem("manageAccountToken") ?? "");
  };

  return { handleSubmitDeleteAccount, isPending };
};
