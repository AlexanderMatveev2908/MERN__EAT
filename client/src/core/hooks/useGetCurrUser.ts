/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { getUserInfoAPI } from "../api/api";
import { useUser } from "./useGlobal";
import { useHandleErr } from "./useHandleErr";
import { ErrFoodApp } from "../../types/allTypes/API";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrUser = () => {
  const { setCurrUser, isLogged } = useUser();
  const { handleErrAPI } = useHandleErr();

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["currUser", isLogged],
    queryFn: getUserInfoAPI,
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
  }, [isError, isSuccess, handleErrAPI, error, setCurrUser, data, isLogged]);
};
