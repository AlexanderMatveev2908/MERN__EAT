/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../useGlobal";
import { useEffect } from "react";
import { useHandleErr } from "../useHandleErr";
import { getUserInfoAPI } from "../../api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useApp = () => {
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
        if (!data?.success) return;
        const { user = {} as any } = data ?? ({} as any);
        setCurrUser({ user });
      }
    };

    handleSideEffects();
  }, [isError, isSuccess, handleErrAPI, error, setCurrUser, data, isLogged]);
};
