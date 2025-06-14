/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ErrFoodApp } from "../../types/allTypes/API";
import { useHandleErr } from "./useHandleErr";

export const useQueryCustom = ({
  key,
  enabled,
  cbAPI,
  cbSuccess,
  alias,
}: {
  key: string;
  cbAPI: () => Promise<any>;
  cbSuccess: (params: any) => void;
  enabled?: boolean;
  alias?: string;
}): any => {
  const { handleErrAPI } = useHandleErr();

  const { isPending, isError, error, isSuccess, data } = useQuery({
    queryKey: [key],
    enabled: enabled ?? true,
    queryFn: cbAPI,
  });

  useEffect(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
    if (isSuccess) cbSuccess(data);
  }, [isPending, isError, error, isSuccess, data, handleErrAPI, cbSuccess]);

  const makeAlias = (str) =>
    alias ? str + alias?.at(0)?.toUpperCase() + alias?.slice(1) : str;

  return {
    [makeAlias("data")]: data,
    [makeAlias("isPending")]: isPending,
    [makeAlias("isError")]: isError,
    [makeAlias("error")]: error,
    [makeAlias("isSuccess")]: isSuccess,
  };
};
