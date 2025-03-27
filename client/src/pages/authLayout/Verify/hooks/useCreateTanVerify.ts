import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ErrFoodApp } from "../../../../types/allTypes/API";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";

export const useCreateTanVerify = ({ callAPI, successCB }) => {
  const navigate = useNavigate();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const handleErrVerify = (err) => {
    if (
      err?.response?.status === 401 &&
      ["VERIFY TOKEN EXPIRED"].includes(err?.response?.data?.msg)
    ) {
      if (err?.response?.config?.url === "/auth/verify-account")
        navigate("/auth/send-email?type=verify-account", {
          replace: true,
          state: { from: "/auth/register" },
        });
      else
        navigate("/auth/send-email?type=recover-pwd", {
          replace: true,
          state: { from: "/auth/login" },
        });

      showToastMsg(err?.response?.data?.msg, "ERROR");
    } else {
      handleErrAPI({ err, push: true });
    }
  };

  const { mutate } = useMutation({
    mutationFn: ({ userId, token }: { userId: string; token: string }) =>
      callAPI({ userId, token }),

    onSuccess: (data) => {
      successCB(data);
    },

    onError: (err: ErrFoodApp) => {
      handleErrVerify(err);
    },
  });

  return { mutate };
};
