/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useToast, useUser } from "./useGlobal";
import { useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../api/auth";
import { useHandleErr } from "./useHandleErr";

export const useLogout = () => {
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();
  const { logoutUser } = useUser();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutUserAPI(),
    onSuccess: () => {
      showToastMsg("Logout successful", "SUCCESS");
    },
    onError: (err: any) => {
      handleErrAPI(err);
    },
    onSettled: () => {
      logoutUser();
      navigate("/", { replace: true });
    },
  });

  return {
    isPending,
    mutate,
  };
};
