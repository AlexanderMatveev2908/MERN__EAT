/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useQuery } from "@tanstack/react-query";
import { getMySingleRestAPI } from "../../../core/api/APICalls/myRestaurants";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useMySingleRestaurant = () => {
  const { handleErrAPI } = useHandleErr();

  const { restId } = useParams();
  const canStay = REG_MONGO.test(restId ?? "");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["mySingleRestaurant", restId],
    queryFn: () => getMySingleRestAPI(restId ?? ""),
    enabled: canStay,
  });

  const handleSideEffects = useCallback(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
  }, [isError, handleErrAPI, error]);

  useEffect(() => {
    handleSideEffects();
  }, [handleSideEffects]);

  const { restaurant, success } = data ?? ({} as any);

  return { canStay, isPending, restaurant, success, restId };
};
