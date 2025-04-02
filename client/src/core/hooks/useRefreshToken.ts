import { useRef } from "react";
import { refreshTokenAPI } from "../api/api";
import { useToast, useUser } from "./useGlobal";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const useRefreshToken = () => {
  const retryRef = useRef(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { logoutUser, isLogged, setUserLogged } = useUser();
  const { showToastMsg } = useToast();

  const refreshTokenAndUI = async () => {
    if (retryRef.current) return;
    retryRef.current = true;

    try {
      const { accessToken } = await refreshTokenAPI();
      setUserLogged(accessToken);
    } catch {
      if (isLogged) showToastMsg("SESSION EXPIRED", "ERROR");
      else showToastMsg("UNAUTHORIZED", "ERROR");

      logoutUser();
      queryClient.resetQueries({ queryKey: ["myCart"] });
      navigate("/auth/login", { replace: true });
    }
  };

  return {
    refreshTokenAndUI,
  };
};
