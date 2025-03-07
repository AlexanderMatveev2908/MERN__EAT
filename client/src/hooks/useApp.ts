/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "./useGlobal";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "./useHandleErr";
import { getUserInfoAPI } from "../api/user";
import { refreshTokenAPI } from "../api/auth";

export const useApp = () => {
  const { setCurrUser, isLogged, setUserLogged, logoutUser } = useUser();
  const { handleErrAPI } = useHandleErr();

  const memoGetInfoAPI = useCallback(async () => await getUserInfoAPI(), []);
  const memoRefresh = useCallback(async () => await refreshTokenAPI(), []);

  const { mutate } = useMutation({
    mutationFn: memoRefresh,
    onSuccess: (data) => {
      setUserLogged(data.accessToken);
    },
    onError: () => {
      logoutUser();
    },
  });

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["user", isLogged],
    queryFn: memoGetInfoAPI,
    enabled: isLogged,
  });

  useEffect(() => {
    const handleSIdeEffects = () => {
      if (isError) {
        handleErrAPI({ err: error, toast: false });
      } else if (isSuccess) {
        const { user = {} as any } = data ?? ({} as any);
        setCurrUser({ user });
      }
    };

    handleSIdeEffects();
  }, [isError, isSuccess, handleErrAPI, error, setCurrUser, data]);

  useEffect(() => {
    if (!isLogged) mutate();
  }, [isLogged, mutate]);
};
