/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useQuery } from "@tanstack/react-query";
import { getMySingleRestAPI } from "../../../core/api/APICalls/myRestaurants";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useMySingleRestaurant = () => {
  useScrollTop();
  const { handleErrAPI } = useHandleErr();

  const { restId } = useParams();
  const canStay = REG_MONGO.test(restId ?? "");

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["mySingleRestaurant", restId],
    queryFn: () => getMySingleRestAPI(restId ?? ""),
    enabled: canStay,
  });

  const handleSideEffects = useCallback(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
    else if (isSuccess) console.log(data);
  }, [isError, handleErrAPI, error, isSuccess, data]);

  useEffect(() => {
    handleSideEffects();
  }, [handleSideEffects]);

  const { restaurant, success } = data ?? ({} as any);

  return { canStay, isPending, restaurant, success, restId };
};
