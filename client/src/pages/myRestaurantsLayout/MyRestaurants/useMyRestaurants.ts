/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useForm } from "react-hook-form";
import { getMyRestaurantsAPI } from "../../../core/api/api";
import { createURLParams } from "../../../utils/utils";

const valsMyRest = [
  "search",
  "searchVals",
  "categories",
  "priceRange",
  "ratingRange",
  "ratingSort",
  "reviewsSort",
  "priceSort",
  "deliveryTimeSort",
  "deliveryPriceSort",
  "dishesSort",
  "ordersSort",
];

type FormSearchType = {
  search: string;
  searchVals: string[]; // the vals we decide to use to search a rest, like a text will be looked not only by name but also country
  categories: string[];
  priceRange: string[];
  ratingRange: string[];

  ratingSort: string[];
  reviewsSort: string[];
  priceSort: string[];
  deliveryTimeSort: string[];
  deliveryPriceSort: string[];
  dishesSort: string[];
  ordersSort: string[];
};

export const useMyRestaurants = () => {
  const [currPage, setCurrPage] = useState<number>(1);

  const { handleErrAPI } = useHandleErr();

  useScrollTop();

  const savedForm = sessionStorage.getItem("myRestaurantsForm");

  const formContext = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: savedForm
      ? { ...JSON.parse(savedForm) }
      : { searchVals: ["name"] },
  });

  const formVals = formContext.getValues();

  const handleSave = formContext.handleSubmit((formDataHook) => {
    const params = createURLParams(formDataHook);
    console.log(params);
    sessionStorage.setItem("myRestaurantsForm", JSON.stringify(formDataHook));
  });

  const handleClear = () => {
    sessionStorage.removeItem("myRestaurantsForm");

    for (const key of valsMyRest) {
      formContext.setValue(
        key as any,
        Array.isArray(savedForm?.[key])
          ? []
          : key === "searchVals"
          ? ["name"]
          : ""
      );
    }
  };

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myRestaurants", formVals],
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
    handleSave,
    handleClear,
  };
};
