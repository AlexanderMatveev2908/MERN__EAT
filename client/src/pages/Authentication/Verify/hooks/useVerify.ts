/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { REG_MONGO, REG_TOKEN } from "../../../../constants/regex";
import { useMutation } from "@tanstack/react-query";
import { recoverPwdAPI, verifyAccountAPI } from "../../../../api/auth/authAPI";
import { useToast, useUser } from "../../../../hooks/useGlobal";
import { useCallback, useEffect } from "react";
import { AccessResAPIType, VerifyAPI } from "../../../../types/authTypes";
import { useHandleErr } from "../../../../hooks/useHandleErr";

export const useVerify = () => {
  const { showToastMsg } = useToast();
  const { setCurrUser, isLogged } = useUser();
  const { handleErrAPI } = useHandleErr();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = REG_MONGO.test(userId ?? "");
  const isTokenValid = REG_TOKEN.test(token ?? "");
  const isValidType = ["verify-account", "recover-pwd"].includes(type ?? "");

  const canStay =
    [isTokenValid, isUserIdValid, isValidType].every((el) => !!el) && !isLogged;

  const { mutate: mutateVerify } = useMutation({
    mutationFn: ({ userId, type, token }: VerifyAPI) =>
      verifyAccountAPI({ userId, type, token }),
    onSuccess: (data: AccessResAPIType) => {
      sessionStorage.removeItem("sentEmail");

      setCurrUser(data.userEmail, data.accessToken);

      showToastMsg("Account Verified Successfully", "SUCCESS");
      navigate("/", { replace: true });
    },
    onError: (err: any) => {
      handleErrAPI({ err, push: true });
    },
  });

  const { mutate: mutateRecover } = useMutation({
    mutationFn: ({ userId, type, token }: VerifyAPI) =>
      recoverPwdAPI({ userId, type, token }),
    onSuccess: () => {
      sessionStorage.removeItem("sentEmail");

      showToastMsg("Email verified Successfully", "SUCCESS");

      navigate(`/auth/recover-pwd?userId=${userId}&token=${token}`, {
        state: { from: location.pathname },
        replace: true,
      });
    },
    onError: (err: any) => {
      handleErrAPI({ err, push: true });
    },
  });

  const handleGuest = useCallback(() => {
    if (!canStay) {
      return;
    } else if (type === "verify-account") {
      mutateVerify({ userId: userId as string, type, token: token as string });
    } else if (type === "recover-pwd") {
      mutateRecover({ userId: userId as string, type, token: token as string });
    }
  }, [canStay, mutateVerify, mutateRecover, type, token, userId]);

  useEffect(() => {
    handleGuest();
  }, [handleGuest]);

  return { canStay };
};
