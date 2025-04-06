import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { REG_MONGO, REG_TOKEN } from "../../../core/config/constants/regex";
import {
  isValidStr,
  validateStrWithArr,
} from "../../../utils/allUtils/validateData";
import {
  unSubScribeViaLinkLoggedAPI,
  unSubscribeViaLinkNonLoggedAPI,
} from "../../../core/api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";

export const useVerifyUnsubScribeNewsLetter = () => {
  const isVerifyingRef = useRef<boolean>(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

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
    onError: (err: ErrFoodApp) => {
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
      if (isVerifyingRef.current) {
        return;
      } else {
        isVerifyingRef.current = true;
        mutate();
      }
    }
  }, [canStay, mutate]);

  return { canStay };
};
