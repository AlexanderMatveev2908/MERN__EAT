/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useHandleErr } from "../../../../hooks/useHandleErr";

export const useCreateTanVerify = ({ callAPI, successCB }) => {
  const { handleErrAPI } = useHandleErr();

  const { mutate } = useMutation({
    mutationFn: ({ userId, token }: { userId: string; token: string }) =>
      callAPI({ userId, token }),
    onSuccess: (data) => {
      successCB(data);
    },
    onError: (err: any) => {
      handleErrAPI({ err, push: true });
    },
  });

  return { mutate };
};
