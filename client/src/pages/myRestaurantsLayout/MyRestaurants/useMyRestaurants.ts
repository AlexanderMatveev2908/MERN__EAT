import { useQuery } from "@tanstack/react-query";
import { getMyRestaurantsAPI } from "../../../api/myRestaurants";
import { useEffect } from "react";
import { useHandleErr } from "../../../hooks/useHandleErr";

export const useMyRestaurants = () => {
  const { handleErrAPI } = useHandleErr();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myRestaurants"],
    queryFn: getMyRestaurantsAPI,
  });

  useEffect(() => {
    if (isError) {
      handleErrAPI({ err: error });
    }
    if (isSuccess) {
      console.log(data);
    }
  }, [handleErrAPI, isError, error, isSuccess, data]);

  const { restaurants, totRestaurants } = data ?? {};

  return {
    isPending,
    restaurants,
    totRestaurants,
  };
};
