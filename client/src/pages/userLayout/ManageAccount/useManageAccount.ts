import { useToast, useUser } from "./../../../core/hooks/useGlobal";
import { useHandleErr } from "./../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";

export type handleErrManageUserType = ({ err }: { err: ErrFoodApp }) => void;

export const useManageAccount = () => {
  const { showToastMsg, closeToast } = useToast();
  const { handleErrAPI } = useHandleErr();

  const { setCanManageAccount, canManageAccount, currUser, logoutUser } =
    useUser();

  const handleErrManageUser = ({ err }: { err: ErrFoodApp }) => {
    const status = err?.response?.status;
    const url = err?.response?.config?.url;
    const msg = err?.response?.data?.msg || err.message;

    if (url === "/user/manage-account") {
      if (status === 401) {
        showToastMsg(msg, "ERROR");
      } else if (status === 429) {
        logoutUser();
        handleErrAPI({ err });
      }
    } else {
      if ([401, 429].includes(status ?? 400)) {
        setCanManageAccount(false);
      }

      handleErrAPI({ err });
    }
  };
  return {
    showToastMsg,
    canManageAccount,
    setCanManageAccount,
    currUser,
    handleErrManageUser,
    closeToast,
  };
};
