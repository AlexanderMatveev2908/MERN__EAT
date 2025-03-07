import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useToast, useUser } from "../../../../hooks/useGlobal";

export const useManageAccount = () => {
  useScrollTop();

  const { showToastMsg } = useToast();

  const { setCanManageAccount, canManageAccount, logoutUser, currUser } =
    useUser();

  return {
    showToastMsg,
    canManageAccount,
    setCanManageAccount,
    logoutUser,
    currUser,
  };
};
