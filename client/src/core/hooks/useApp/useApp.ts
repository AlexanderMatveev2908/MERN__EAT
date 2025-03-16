/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../useGlobal";
import { useEffect, useRef } from "react";
import { useHandleErr } from "../useHandleErr";
import { getUserInfoAPI, refreshTokenAPI } from "../../api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useApp = () => {
  const { setCurrUser, isLogged, setUserLogged, logoutUser } = useUser();
  const { handleErrAPI } = useHandleErr();
  const attemptRef = useRef(0);

  // at first glance it may seem i do an useless thing and in some way it is, i already manage flow of access refresh token with axios interceptors for request 401 relative to protected routes, and the getCurrUSer API would detect error and show an expired session toast, the mutation API call is made temporarily just to handle more gently situations where user accidentally or intentionally delete his access token from session storage to prevent him being pushed out of session with no chance of recover it, cause protected routes push away user with no token so would be no chance of trying a refresh, this func try to handle that situation but need to be optimized to not run as much as it does now

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
        handleErrAPI({ err: error as ErrFoodApp });
      } else if (isSuccess) {
        const { user = {} as any } = data ?? ({} as any);
        setCurrUser({ user });
      }
    };

    handleSideEffects();
  }, [isError, isSuccess, handleErrAPI, error, setCurrUser, data, logoutUser]);

  useEffect(() => {
    if (!isLogged && attemptRef?.current < 3) {
      attemptRef.current += 1;
      mutate();
    }
  }, [isLogged, mutate]);
};
