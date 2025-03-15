/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useToast, useUser } from "./useGlobal";
import { useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../api/APICalls/auth";

export const useLogout = () => {
  const { showToastMsg } = useToast();
  const { logoutUser } = useUser();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutUserAPI(),
    onSuccess: () => {
      showToastMsg("Logout successful", "SUCCESS");
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err?.message, "ERROR");
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
