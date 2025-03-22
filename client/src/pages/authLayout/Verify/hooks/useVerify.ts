import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import {
  isValidStr,
  validateStrWithArr,
} from "../../../../utils/allUtils/validateStr";
import { useCreateTanVerify } from "./useCreateTanVerify";
import { useToast, useUser } from "../../../../core/hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../../core/config/constants/regex";
import { recoverPwdAPI, verifyAccountAPI } from "../../../../core/api/api";

export const useVerify = () => {
  const isVerifyingRef = useRef(false);

  const { isLogged, setUserLogged } = useUser();
  const { showToastMsg } = useToast();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const handleSuccessVerifyAccount = (data) => {
    setUserLogged(data.accessToken);
    showToastMsg("Account Verified Successfully", "SUCCESS");
    navigate("/", { replace: true });
  };
  const { mutate: mutateVerify } = useCreateTanVerify({
    callAPI: ({ userId, token }) => verifyAccountAPI({ userId, token }),
    successCB: (data) => handleSuccessVerifyAccount(data),
  });

  const handleSuccessVerifyRecoverPwd = () => {
    showToastMsg("Email verified Successfully", "SUCCESS");
    navigate(`/auth/recover-pwd?userId=${userId}&token=${token}`, {
      state: { from: "/auth/verify" },
      replace: true,
    });
  };
  const { mutate: mutateRecover } = useCreateTanVerify({
    callAPI: ({ userId, token }) => recoverPwdAPI({ userId, token }),
    successCB: () => handleSuccessVerifyRecoverPwd(),
  });

  const handleGuest = useCallback(() => {
    if (isVerifyingRef.current) {
      return;
    } else {
      isVerifyingRef.current = true;
      if (type === "verify-account") {
        mutateVerify({
          userId: userId as string,
          token: token as string,
        });
        console.log("run");
      } else if (type === "recover-pwd") {
        mutateRecover({
          userId: userId as string,
          token: token as string,
        });
      }
    }
  }, [mutateVerify, mutateRecover, type, token, userId]);

  useEffect(() => {
    handleGuest();
  }, [handleGuest]);

  return { canStay };
};
