/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { SendEmailFormType } from "./useSendEmail";
import { useNavigate } from "react-router-dom";
import { UseFormReset } from "react-hook-form";
import { useHandleErr } from "../../../../core/hooks/useHandleErr";
import { useToast } from "../../../../core/hooks/useGlobal";
import { ErrFoodApp } from "../../../../types/allTypes/API";

export const useCreateTanStackSendEmail = ({
  reset,
  callAPI,
  type,
  from,
}: {
  reset: UseFormReset<SendEmailFormType>;
  callAPI: any;
  from: string;
  type: string | null;
}) => {
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }: { email: SendEmailFormType["email"] }) =>
      callAPI({ email, type }),
    onSuccess: () => {
      reset();
      showToastMsg("Verification Email sent successfully", "SUCCESS");
      navigate(`/notice-email?type=${type ?? ""}`, {
        state: { from },
      });
    },
    onError: (err: ErrFoodApp) => {
      if (err?.response?.status === 403)
        showToastMsg(err?.response?.data?.msg, "ERROR");
      else handleErrAPI({ err });
    },
  });

  return {
    mutate,
    isPending,
  };
};
