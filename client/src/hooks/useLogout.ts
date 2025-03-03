/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { logoutUserAPI } from "../api/auth/authAPI";
import { useToast, useUser } from "./useGlobal";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { showToastMsg } = useToast();
  const { setUserLogged } = useUser();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutUserAPI(),
    onSuccess: () => {
      showToastMsg("Logout successful", "SUCCESS");
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
    onSettled: () => {
      setUserLogged(false);
      navigate("/", { replace: true });
    },
  });

  return {
    isPending,
    mutate,
  };
};
