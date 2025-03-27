import { useNavigate, useSearchParams } from "react-router-dom";

import { useEffect, useRef } from "react";
import { isValidStr } from "../../../utils/allUtils/validateData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyNewEmailAPI } from "./../../../core/api/api";
import { REG_MONGO, REG_TOKEN } from "../../../core/config/constants/regex";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";

export const useVerifyUser = () => {
  const isVerifyingRef = useRef<boolean>(false);
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = isValidStr(userId ?? "", REG_MONGO);
  const isTokenValid = isValidStr(token ?? "", REG_TOKEN);

  const canStay = isUserIdValid && isTokenValid;

  const { mutate } = useMutation({
    mutationFn: (params: { userId: string; token: string }) =>
      verifyNewEmailAPI(params),
    onSuccess: () => {
      showToastMsg("New Email successfully verified!", "SUCCESS");

      queryClient.resetQueries({ queryKey: ["currUser"] });
      navigate("/", { replace: true });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err, push: true });
    },
  });

  useEffect(() => {
    if (canStay) {
      if (isVerifyingRef.current) {
        return;
      } else {
        isVerifyingRef.current = true;
        mutate({ token: token ?? "", userId: userId ?? "" });
      }
    }
  }, [canStay, mutate, token, userId]);

  return { canStay };
};
