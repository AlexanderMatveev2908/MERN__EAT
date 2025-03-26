import { useQuery } from "@tanstack/react-query";
import { getRestaurantIdsAPI } from "../../api/APICalls/myDishes";
import { useCallback, useEffect } from "react";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useHandleErr } from "../useHandleErr";

export const useGetRestaurantsIds = () => {
  const { handleErrAPI } = useHandleErr();
  const {
    data: dataIds,
    isPending: isPendingIds,
    isSuccess: isSuccessIds,
    isError: isErrorIds,
    error: errorIds,
  } = useQuery({
    queryKey: ["restaurantIds"],
    queryFn: getRestaurantIdsAPI,
  });

  const handleSideEffectsGetIds = useCallback(() => {
    if (isErrorIds) {
      handleErrAPI({ err: errorIds as ErrFoodApp });
    }
  }, [isErrorIds, errorIds, handleErrAPI]);

  useEffect(() => {
    handleSideEffectsGetIds();
  }, [handleSideEffectsGetIds]);

  return {
    isPendingIds,
    restInfo: dataIds?.infoRestaurants,
    isSuccessIds: isSuccessIds && dataIds?.infoRestaurants?.length,
    isErrorIds,
    errorIds,
  };
};
