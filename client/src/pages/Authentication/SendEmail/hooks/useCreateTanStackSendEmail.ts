/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { SendEmailFormType } from "./useSendEmail";
import { useToast } from "../../../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import { UseFormReset } from "react-hook-form";

export const useCreateTanStackSendEmail = ({
  reset,
  callAPI,
  type,
  from,
}: {
  reset: UseFormReset<SendEmailFormType>;
  callAPI: (params: {
    email: SendEmailFormType["email"];
    type: string | null;
  }) => Promise<{ msg: string; success: boolean }>;
  from: string;
  type: string | null;
}) => {
  const { showToastMsg } = useToast();
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
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  return {
    mutate,
    isPending,
  };
};
