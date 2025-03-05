/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { SendEmailFormType } from "./useSendEmail";
import { useNavigate } from "react-router-dom";
import { UseFormReset } from "react-hook-form";
import { BaseResAPIType } from "../../../../types/authTypes";
import { useToast } from "../../../../hooks/useGlobal";
import { useHandleErr } from "../../../../hooks/useHandleErr";

export const useCreateTanStackSendEmail = ({
  reset,
  callAPI,
  type,
  from,
}: {
  reset: UseFormReset<SendEmailFormType>;
  callAPI: ({
    email,
    type,
  }: {
    email: SendEmailFormType["email"];
    type: string | null;
  }) => Promise<BaseResAPIType>;
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
      sessionStorage.setItem("sentEmail", "true");
      showToastMsg("Email sent successfully", "SUCCESS");
      navigate(`/notice-email?type=${type ?? ""}`, {
        state: { from },
      });
    },
    onError: (err: any) => {
      handleErrAPI({ err });
    },
  });

  return {
    mutate,
    isPending,
  };
};
