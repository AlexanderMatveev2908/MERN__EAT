/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from "react-router-dom";

import { useEffect } from "react";
import { useToast } from "./../../../hooks/useGlobal";
import { useHandleErr } from "./../../../hooks/useHandleErr";
import { isValidStr } from "./../../../utils/validateStr";
import { useMutation } from "@tanstack/react-query";
import { verifyNewEmailAPI } from "./../../../api/user";
import { REG_MONGO, REG_TOKEN } from "../../../config/constants/regex";

export const useVerifyUser = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

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
      navigate("/", { replace: true });
    },
    onError: (err: any) => {
      handleErrAPI({ err, push: true });
    },
  });

  useEffect(() => {
    if (canStay) mutate({ token: token ?? "", userId: userId ?? "" });
  }, [canStay, mutate, token, userId]);

  return { canStay };
};
