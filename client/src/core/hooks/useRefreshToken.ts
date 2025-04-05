import { useCallback, useRef } from "react";
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

  const refreshTokenAndUI = useCallback(async () => {
    if (retryRef.current) return;
    retryRef.current = true;

    try {
      const { accessToken } = await refreshTokenAPI();
      setUserLogged(accessToken);

      // cancel things that is running in this precise moment right now
      queryClient.cancelQueries();
      // clear is a tougher version of remove that remove ALL
      queryClient.clear();
    } catch {
      if (isLogged) showToastMsg("SESSION EXPIRED", "ERROR");
      else showToastMsg("UNAUTHORIZED", "ERROR");

      logoutUser();
      navigate("/auth/login", { replace: true });
    }
  }, [
    isLogged,
    logoutUser,
    navigate,
    queryClient,
    setUserLogged,
    showToastMsg,
  ]);

  return {
    refreshTokenAndUI,
  };
};
