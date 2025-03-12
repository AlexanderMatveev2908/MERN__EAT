/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../useGlobal";
import { useEffect } from "react";
import { useHandleErr } from "../useHandleErr";
import { getUserInfoAPI } from "../../api/user";
import { refreshTokenAPI } from "../../api/auth";

export const useApp = () => {
  const { setCurrUser, isLogged, setUserLogged, logoutUser } = useUser();
  const { handleErrAPI } = useHandleErr();

  const { mutate } = useMutation({
    mutationFn: refreshTokenAPI,
    onSuccess: (data) => {
      setUserLogged(data?.accessToken);
    },
    onError: () => {
      if (isLogged) logoutUser();
    },
  });

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["currUser", isLogged],
    queryFn: getUserInfoAPI,
    enabled: isLogged,
  });

  useEffect(() => {
    const handleSideEffects = () => {
      if (isError) {
        handleErrAPI({ err: error });
      } else if (isSuccess) {
        const { user = {} as any } = data ?? ({} as any);
        setCurrUser({ user });
      }
    };

    handleSideEffects();
  }, [isError, isSuccess, handleErrAPI, error, setCurrUser, data, logoutUser]);

  useEffect(() => {
    if (!isLogged) mutate();
  }, [isLogged, mutate]);
};
