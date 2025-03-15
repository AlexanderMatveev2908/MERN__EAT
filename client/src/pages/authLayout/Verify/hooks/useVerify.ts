import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useToast, useUser } from "../../../../hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../../config/constants/regex";
import { isValidStr, validateStrWithArr } from "../../../../utils/validateStr";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useCreateTanVerify } from "./useCreateTanVerify";
import { recoverPwdAPI, verifyAccountAPI } from "../../../../api/auth";

export const useVerify = () => {
  const { isLogged, setUserLogged } = useUser();
  const { showToastMsg } = useToast();

  useScrollTop();

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
      state: { from: location.pathname },
      replace: true,
    });
  };

  const { mutate: mutateRecover } = useCreateTanVerify({
    callAPI: ({ userId, token }) => recoverPwdAPI({ userId, token }),
    successCB: () => handleSuccessVerifyRecoverPwd(),
  });

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
