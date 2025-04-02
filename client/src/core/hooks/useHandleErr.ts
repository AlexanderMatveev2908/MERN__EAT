import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "./useGlobal";
import { useCallback } from "react";
import { ErrFoodApp } from "../../types/allTypes/API";
import { useQueryClient } from "@tanstack/react-query";
import { useRefreshToken } from "./useRefreshToken";

export type HandleErrType = ({
  err,
  push,
  toast,
}: {
  err: ErrFoodApp;
  push?: boolean;
  toast?: boolean;
}) => void;

// ipotetically i do not think would be wrong in reality organize with coworkers in backend with some messages on which we behave differently, of course not uppercase and clear as mine but maybe a little encrypted or just signed, so for exception we can behave differently
const msgHelpersFrontBack = [
  "ACCESS TOKEN EXPIRED",
  "ACCESS TOKEN INVALID",
  "ACCESS TOKEN NOT PROVIDED",
];

export const useHandleErr = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { showToastMsg } = useToast();
  const { setUserLogged } = useUser();
  const { refreshTokenAndUI } = useRefreshToken();

  const handleErrAPI = useCallback(
    ({
      err,
      push = false,
      toast = true,
    }: {
      err: ErrFoodApp;
      push?: boolean;
      toast?: boolean;
    }) => {
      console.log(err);

      if (!err) return;

      const msg = err?.response?.data?.msg || err?.message;
      const status = err?.response?.status;

      if ([401, 403, 429].includes(status ?? 400)) {
        if (msgHelpersFrontBack.includes(msg)) {
          refreshTokenAndUI();
        } else {
          if (["USER DOES NOT EXIST", "USER NOT VERIFIED"].includes(msg)) {
            setUserLogged(false);
            queryClient.resetQueries({ queryKey: ["myCart"] });
          }

          navigate("/", { replace: true });
          showToastMsg(msg, "ERROR");
        }
      } else {
        if (push) navigate("/", { replace: true });
        if (toast) showToastMsg(msg, "ERROR");
      }
    },
    [navigate, showToastMsg, setUserLogged, queryClient]
  );

  return { handleErrAPI };
};
