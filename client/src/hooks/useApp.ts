/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "./useGlobal";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "./useHandleErr";
import { getUserInfoAPI } from "../api/user";
import { getInitialsName } from "../utils/getInitialsName";
import { refreshTokenAPI } from "../api/auth";

export const useApp = () => {
  const { setCurrUser, isLogged, setUserLogged } = useUser();
  const { handleErrAPI } = useHandleErr();

  const memoGetInfoAPI = useCallback(async () => await getUserInfoAPI(), []);
  const memoRefresh = useCallback(async () => await refreshTokenAPI(), []);

  const { mutate } = useMutation({
    mutationFn: memoRefresh,
    onSuccess: (data) => {
      setUserLogged(data.accessToken);
    },
    onError: () => {
      setUserLogged(false);
      sessionStorage.removeItem("initName");
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
        setCurrUser({ user: null });
      } else if (isSuccess) {
        const { user = {} as any } = data ?? ({} as any);
        setCurrUser({ user });
        if (!sessionStorage.getItem("initName"))
          sessionStorage.setItem("initName", getInitialsName(user));
      }
    };

    handleSIdeEffects();
  }, [isError, isSuccess, handleErrAPI, error, setCurrUser, data]);

  useEffect(() => {
    if (!isLogged) mutate();
  }, [isLogged, mutate]);
};
