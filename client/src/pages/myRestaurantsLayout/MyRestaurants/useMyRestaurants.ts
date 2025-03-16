import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useForm } from "react-hook-form";
import { getMyRestaurantsAPI } from "../../../core/api/api";
import { createURLParams } from "../../../utils/utils";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useUpdateCardsLimit } from "../../../core/hooks/useUpdateCardsLimit";
import { fieldsFormMyRest } from "../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";

type FormSearchType = {
  search: string;
  searchVals: string[]; // the vals we decide to use to search a rest, like a text will be looked not only by name but also country
  categories: string[];
  ordersStatus: string[];
  avgPriceRange: string[];
  avgRatingRange: string[];

  avgRatingSort: ["asc" | "desc"];
  reviewsCountSort: ["asc" | "desc"];
  avgPriceSort: ["asc" | "desc"];
  dishesCountSort: ["asc" | "desc"];
  ordersCountSort: ["asc" | "desc"];
  createdAtSort: ["asc" | "desc"];
  updatedAtSort: ["asc" | "desc"];
  pendingOrdersSort: ["asc" | "desc"];
  processingOrdersSort: ["asc" | "desc"];
  shippedOrdersSort: ["asc" | "desc"];
  deliveredOrdersSort: ["asc" | "desc"];
  cancelledOrdersSort: ["asc" | "desc"];

  page: number;
  limit: number;
};

export const useMyRestaurants = () => {
  const queryClient = useQueryClient();

  const [currPage, setCurrPage] = useState<number>(1);

  const { handleErrAPI } = useHandleErr();
  const { limit } = useUpdateCardsLimit();

  useScrollTop();

  const savedForm = sessionStorage.getItem("myRestaurantsForm");

  const formContext = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: savedForm
      ? { ...JSON.parse(savedForm) }
      : { searchVals: ["name"] },
  });

  const formVals = formContext.watch();
  formVals.page = currPage;
  formVals.limit = limit;

  const handleSave = formContext.handleSubmit((formDataHook) => {
    formDataHook.limit = limit;
    formDataHook.page = currPage;

    sessionStorage.setItem("myRestaurantsForm", JSON.stringify(formDataHook));

    queryClient.resetQueries({ queryKey: ["myRestaurants"] });
  });

  const handleClear = () => {
    sessionStorage.removeItem("myRestaurantsForm");

    for (const key of fieldsFormMyRest) {
      formContext.setValue(
        key as keyof FormSearchType,
        Array.isArray(savedForm?.[key])
          ? []
          : key === "searchVals"
          ? ["name"]
          : ""
      );
    }

    formContext.trigger("search");

    setCurrPage(1);
  };

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myRestaurants", formVals],
    queryFn: () => getMyRestaurantsAPI(createURLParams(formVals)),
  });

  useEffect(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    }
    if (isSuccess) {
      //
    }
  }, [handleErrAPI, isError, error, isSuccess, data]);

  const { restaurants, totDocuments, totPages, nHits } = data ?? {};

  return {
    isPending,
    restaurants,
    totDocuments,
    formContext,
    currPage,
    setCurrPage,
    handleSave,
    handleClear,
    totPages,
    nHits,
  };
};
