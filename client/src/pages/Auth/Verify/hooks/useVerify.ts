/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useGetTansCreated } from "./useGetTanVerify";
import { useUser } from "../../../../hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../../constants/regex";

export const useVerify = () => {
  const { isLogged } = useUser();

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = REG_MONGO.test(userId ?? "");
  const isTokenValid = REG_TOKEN.test(token ?? "");
  const isValidType = ["verify-account", "recover-pwd"].includes(type ?? "");

  const canStay =
    [isTokenValid, isUserIdValid, isValidType].every((el) => !!el) && !isLogged;

  const { mutateVerify, mutateRecover } = useGetTansCreated(
    userId as string,
    token as string
  );

  const handleGuest = useCallback(() => {
    if (!canStay) {
      return;
    } else if (type === "verify-account") {
      mutateVerify({
        userId: userId as string,
        token: token as string,
      });
    } else if (type === "recover-pwd") {
      mutateRecover({
        userId: userId as string,
        token: token as string,
      });
    }
  }, [canStay, mutateVerify, mutateRecover, type, token, userId]);

  useEffect(() => {
    handleGuest();
  }, [handleGuest]);

  return { canStay };
};
