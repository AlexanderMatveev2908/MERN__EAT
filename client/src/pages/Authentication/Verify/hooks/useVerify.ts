/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { REG_MONGO, REG_TOKEN } from "../../../../constants/regex";
import { useMutation } from "@tanstack/react-query";
import {
  BaseRes,
  recoverPwdAPI,
  verifyAccountAPI,
  VerifyAPI,
} from "../../../../api/auth/authAPI";
import { useToast } from "../../../../hooks/useGlobal";
import { useCallback, useEffect } from "react";

export const useVerify = () => {
  const { showToastMsg } = useToast();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = REG_MONGO.test(userId ?? "");
  const isTokenValid = REG_TOKEN.test(token ?? "");
  const isValidType = ["verify-account", "recover-pwd"].includes(type ?? "");
  const isLogged = sessionStorage.getItem("accessToken");

  const canStay =
    [isTokenValid, isUserIdValid, isValidType].every((el) => !!el) && !isLogged;

  const { mutate: mutateVerify } = useMutation({
    mutationFn: ({ userId, type, token }: VerifyAPI) =>
      verifyAccountAPI({ userId, type, token }),
    onSuccess: (data: BaseRes & { accessToken: string }) => {
      sessionStorage.removeItem("emailSent");
      sessionStorage.setItem("accessToken", data.accessToken);

      showToastMsg("Account Verified Successfully", "SUCCESS");
      navigate("/");
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      navigate("/");
    },
  });

  const { mutate: mutateRecover } = useMutation({
    mutationFn: ({ userId, type, token }: VerifyAPI) =>
      recoverPwdAPI({ userId, type, token }),
    onSuccess: () => {
      sessionStorage.removeItem("emailSent");

      showToastMsg("Email verified Successfully", "SUCCESS");

      navigate("/auth/recover-pwd", { state: { from: location.pathname } });
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      navigate("/");
    },
  });

  const handleGuest = useCallback(() => {
    if (!canStay) {
      navigate("/");
    } else if (type === "verify-account") {
      mutateVerify({ userId: userId as string, type, token: token as string });
    } else if (type === "recover-pwd") {
      mutateRecover({ userId: userId as string, type, token: token as string });
    }
  }, [canStay, navigate, mutateVerify, mutateRecover, type, token, userId]);

  useEffect(() => {
    handleGuest();
  }, [handleGuest]);
};
