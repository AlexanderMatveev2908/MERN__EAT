import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useForm } from "react-hook-form";
import { getMyRestaurantsAPI } from "../../../core/api/api";

type FormSearchType = {
  search: string;
  searchVals: string[];
  categories: string[];
  priceRange: string[];
  ratingRange: string[];
  ratingSort: string[];
  deliveryTimeSort: string[];
  deliveryPriceSort: string[];
  reviewsSort: string[];
  dishesSort: string[];
  ordersSort: string[];
  priceSort: string[];
};

export const useMyRestaurants = () => {
  const [currPage, setCurrPage] = useState<number>(1);

  const { handleErrAPI } = useHandleErr();

  useScrollTop();

  const formContext = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: { searchVals: ["name"] },
  });

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myRestaurants"],
    queryFn: getMyRestaurantsAPI,
  });

  useEffect(() => {
    if (isError) {
      handleErrAPI({ err: error });
    }
    if (isSuccess) {
      //
    }
  }, [handleErrAPI, isError, error, isSuccess, data]);

  const { restaurants, totRestaurants } = data ?? {};

  return {
    isPending,
    restaurants,
    totRestaurants,
    formContext,
    currPage,
    setCurrPage,
  };
};
