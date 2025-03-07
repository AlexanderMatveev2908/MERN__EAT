/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "./useGlobal";
import { useCallback } from "react";
import { URLsToNotPush } from "../config/URLsToHandle/URLsToHandle";

export const useHandleErr = () => {
  const { showToastMsg } = useToast();
  const navigate = useNavigate();
  const { setUserLogged } = useUser();

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

      if (err?.response?.status === 401) {
        if (err?.response?.config?.url === "/auth/refresh") {
          setUserLogged(false);
          showToastMsg("SESSION EXPIRED", "ERROR");
        } else if (URLsToNotPush.includes(err?.response?.config?.url)) {
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
        } else {
          navigate("/", { replace: true });
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
        }
      } else if ([403, 429].includes(err?.response?.status)) {
        navigate("/", { replace: true });
        showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      } else {
        if (push) navigate("/", { replace: true });
        if (toast)
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      }

      // else if (
      //   logUnauthorized &&
      //   err?.response?.status === 401 &&
      //   err?.response?.data?.msg !== "REFRESH TOKEN EXPIRED"
      // ) {
      //   showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      // }
    },
    [navigate, showToastMsg, setUserLogged]
  );

  return { handleErrAPI };
};
