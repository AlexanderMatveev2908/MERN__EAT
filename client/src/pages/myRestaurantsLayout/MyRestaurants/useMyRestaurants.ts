import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
  deliverySort: string[];
  reviewsSort: string[];
  dishesSort: string[];
  ordersSort: string[];
};

export const useMyRestaurants = () => {
  const { handleErrAPI } = useHandleErr();

  useScrollTop();

  const formContext = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: { searchVals: ["name"] },
  });

  // console.log(formContext.watch("searchVals"));
  // console.log(formContext.watch("search"));
  // console.log(formContext.watch("categories"));
  // console.log(formContext.watch("priceRange"));
  // console.log(formContext.watch("ratingRange"));
  // console.log(formContext.watch("ratingSort"));
  // console.log(formContext.watch("ordersSort"));
  // console.log(formContext.watch("dishesSort"));
  // console.log(formContext.watch("reviewsSort"));

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
  };
};
