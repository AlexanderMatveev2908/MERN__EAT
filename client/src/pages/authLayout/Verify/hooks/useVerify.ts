/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useGetTansCreated } from "./useGetTanVerify";
import { useUser } from "../../../../hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../../constants/regex";
import { isValidStr, validateStrWithArr } from "../../../../utils/validateStr";
import { useScrollTop } from "../../../../hooks/useScrollTop";

export const useVerify = () => {
  const { isLogged } = useUser();

  useScrollTop();

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = isValidStr(userId ?? "", REG_MONGO);
  const isTokenValid = isValidStr(token ?? "", REG_TOKEN);
  const isValidType = validateStrWithArr(
    ["recover-pwd", "verify-account"],
    type ?? ""
  );

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
