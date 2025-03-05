/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useHandleErr } from "../../../../hooks/useHandleErr";
import { AccessResAPIType, VerifyAPI } from "../../../../types/authTypes";

export const useCreateTanVerify = ({ callAPI, successCB }) => {
  const { handleErrAPI } = useHandleErr();

  const { mutate } = useMutation({
    mutationFn: ({ userId, token }: VerifyAPI) => callAPI({ userId, token }),
    onSuccess: (data: AccessResAPIType) => {
      successCB(data);
    },
    onError: (err: any) => {
      handleErrAPI({ err, push: true });
    },
  });

  return { mutate };
};
