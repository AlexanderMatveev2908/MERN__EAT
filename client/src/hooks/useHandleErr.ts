/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "./useGlobal";
import { useCallback } from "react";

export type HandleErrType = ({
  err,
  push,
  toast,
}: {
  err: any;
  push?: boolean;
  toast?: boolean;
}) => void;

export const useHandleErr = () => {
  const { showToastMsg } = useToast();
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const handleErrAPI = useCallback(
    ({
      err,
      push = false,
      toast = true,
    }: {
      err: any;
      push?: boolean;
      toast?: boolean;
    }) => {
      console.log(err);

      if ([401, 403, 429].includes(err?.response?.status)) {
        if (err?.response?.status === 401) {
          if (err?.response?.config?.url === "/auth/refresh") {
            logoutUser();
            showToastMsg("SESSION EXPIRED", "ERROR");
          } else if (
            ["/auth/register", "/auth/login", "/auth/send-email"].includes(
              err?.response?.config?.url
            )
          ) {
            showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
          }
        } else {
          navigate("/", { replace: true });
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
        }
      } else {
        if (push) navigate("/", { replace: true });
        if (toast)
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      }
    },
    [navigate, showToastMsg, logoutUser]
  );

  return { handleErrAPI };
};
