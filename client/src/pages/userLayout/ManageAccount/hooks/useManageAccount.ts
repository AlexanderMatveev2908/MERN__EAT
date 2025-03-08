/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useToast, useUser } from "../../../../hooks/useGlobal";
import { useHandleErr } from "../../../../hooks/useHandleErr";

export const useManageAccount = () => {
  useScrollTop();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const { setCanManageAccount, canManageAccount, currUser, logoutUser } =
    useUser();

  const handleErrManageUser = (err: any) => {
    const status = err?.response?.status;
    const url = err?.response?.config?.url;
    const msg = err?.response?.data?.msg || err.message;

    if (url === "/user/manage-account") {
      if (status === 401) {
        showToastMsg(msg, "ERROR");
      }
    } else {
      if (status === 429) {
        logoutUser();
      } else if (status === 401) {
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
  };
};
