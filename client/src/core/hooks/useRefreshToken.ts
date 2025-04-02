import { useRef } from "react";
import { refreshTokenAPI } from "../api/api";
import { useToast, useUser } from "./useGlobal";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useRefreshToken = () => {
  const retryRef = useRef(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { logoutUser, setUserLogged } = useUser();
  const { showToastMsg } = useToast();

  const refreshTokenAndUI = async () => {
    if (retryRef.current) return;
    retryRef.current = true;

    try {
      const { accessToken } = await refreshTokenAPI();
      setUserLogged(accessToken);
    } catch {
      logoutUser();
      queryClient.resetQueries({ queryKey: ["myCart"] });
      navigate("/auth/login");
      showToastMsg("Session Expired", "ERROR");
    }
  };

  return {
    refreshTokenAndUI,
  };
};
