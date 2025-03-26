import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "./useGlobal";
import { useCallback } from "react";
import { ErrFoodApp } from "../../types/allTypes/API";
import { useQueryClient } from "@tanstack/react-query";

export type HandleErrType = ({
  err,
  push,
  toast,
}: {
  err: ErrFoodApp;
  push?: boolean;
  toast?: boolean;
}) => void;

export const useHandleErr = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { showToastMsg } = useToast();
  const { setUserLogged } = useUser();

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

      const msg = err?.response?.data?.msg || err.message;
      const url = err?.response?.config?.url || "";
      const status = err?.response?.status;

      if (url === "/auth/refresh") {
        setUserLogged(false);
        queryClient.resetQueries({ queryKey: ["myCart"] });
        navigate("/", { replace: true });
        showToastMsg("SESSION EXPIRED", "ERROR");
      } else if ([401, 403, 429].includes(status ?? 400)) {
        if (["USER DOES NOT EXIST", "USER NOT VERIFIED"].includes(msg)) {
          setUserLogged(false);
          queryClient.resetQueries({ queryKey: ["myCart"] });
        }
        navigate("/", { replace: true });
        showToastMsg(msg, "ERROR");
      } else {
        if (push) navigate("/", { replace: true });
        if (toast) showToastMsg(msg, "ERROR");
      }
    },
    [navigate, showToastMsg, setUserLogged, queryClient]
  );

  return { handleErrAPI };
};
