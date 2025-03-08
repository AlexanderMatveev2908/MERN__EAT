import { useLocation, useNavigate } from "react-router-dom";
import { useToast, useUser } from "../../../../hooks/useGlobal";
import { useCreateTanVerify } from "./useCreateTanVerify";
import { recoverPwdAPI, verifyAccountAPI } from "../../../../api/auth";

export const useGetTansCreated = (userId: string, token: string) => {
  const { showToastMsg } = useToast();
  const { setUserLogged } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

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

  return {
    mutateVerify,
    mutateRecover,
  };
};
