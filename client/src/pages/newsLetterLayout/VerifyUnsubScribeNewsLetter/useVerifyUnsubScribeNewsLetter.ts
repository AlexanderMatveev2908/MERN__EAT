/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../../../core/hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../core/config/constants/regex";
import {
  isValidStr,
  validateStrWithArr,
} from "../../../utils/allUtils/validateStr";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import {
  unSubScribeViaLinkLoggedAPI,
  unSubscribeViaLinkNonLoggedAPI,
} from "../../../core/api/api";

export const useVerifyUnsubScribeNewsLetter = () => {
  useScrollTop();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const typeUser = searchParams.get("typeUser");
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const canStay =
    validateStrWithArr(["non-logged", "logged"], typeUser ?? "") &&
    isValidStr(token ?? "", REG_TOKEN) &&
    isValidStr(userId ?? "", REG_MONGO);

  const params = {
    userId: userId ?? "",
    token: token ?? "",
  };

  const { mutate } = useMutation({
    mutationFn: () =>
      typeUser === "logged"
        ? unSubScribeViaLinkLoggedAPI({
            ...params,
          })
        : unSubscribeViaLinkNonLoggedAPI({
            ...params,
          }),
    onSuccess: () => {
      navigate("/newsletter/notice-unsubscribe-with-retry?success=true", {
        state: { from: location.pathname },
        replace: true,
      });
      showToastMsg("Subscription deleted successfully", "SUCCESS");
    },
    onError: (err: any) => {
      if (err?.response?.status === 401) {
        navigate(`/newsletter/notice-unsubscribe-with-retry?success=false`, {
          state: { from: location.pathname },
          replace: true,
        });

        showToastMsg(err?.response?.data?.msg, "ERROR");
      } else {
        handleErrAPI({ err, push: true });
      }
    },
  });

  useEffect(() => {
    if (canStay) {
      mutate();
    }
  }, [canStay, mutate]);

  return { canStay };
};
