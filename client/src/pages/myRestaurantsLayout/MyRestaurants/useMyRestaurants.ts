import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { useForm } from "react-hook-form";
import { getMyRestaurantsAPI } from "../../../core/api/api";
import { createURLParams } from "../../../utils/utils";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useUpdateCardsLimit } from "../../../core/hooks/useUpdateCardsLimit";
import { fieldsFormMyRest } from "../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { FormSearchType } from "../../../types/allTypes/restAdmin";

export const useMyRestaurants = () => {
  useScrollTop();

  const queryClient = useQueryClient();

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);

  const { handleErrAPI } = useHandleErr();
  useUpdateCardsLimit(limit, setLimit);

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
      if (data?.nHits < limit) setCurrPage(1);
    }
  }, [handleErrAPI, isError, error, isSuccess, data, limit]);

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
