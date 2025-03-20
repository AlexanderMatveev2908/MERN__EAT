/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fieldsMyDishesForm } from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import { getMyDishesAPI } from "../../../core/api/APICalls/myDishes";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useUpdateCardsLimit } from "../../../core/hooks/useUpdateCardsLimit";

export const useMyDishes = () => {
  const { formContextMyDishesSearch } = useFormsCustom();
  const { handleErrAPI } = useHandleErr();

  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);

  useUpdateCardsLimit(limit, setLimit);

  const queryClient = useQueryClient();

  const { setValue, getValues, handleSubmit, watch, trigger } =
    formContextMyDishesSearch;

  const handleSave = handleSubmit((formDatHook) => {
    sessionStorage.setItem("myDishesForm", JSON.stringify(formDatHook));

    queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
  });

  const handleClear = () => {
    sessionStorage.removeItem("myDishesForm");

    let i = 0;
    do {
      const currField = fieldsMyDishesForm[i];

      setValue(
        currField as keyof SearchMyDishesFormType,
        Array.isArray(getValues(currField as keyof SearchMyDishesFormType))
          ? []
          : currField === "searchVals"
          ? ["name"]
          : ""
      );
      i++;
    } while (i < fieldsMyDishesForm.length);

    trigger();
  };

  const formDataSearch = watch();
  formDataSearch.page = currPage + "";
  formDataSearch.limit = limit + "";

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myDishesSearch", formDataSearch],
    queryFn: () => getMyDishesAPI(createURLParamsMyDishes(formDataSearch)),
  });

  useEffect(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    }
  }, [isSuccess, isError, data, handleErrAPI, error]);

  const { totPages, totDocuments, nHits, dishes } = data ?? ({} as any);

  return {
    formContextMyDishesSearch,
    handleSave,
    handleClear,
    isPending,
    currPage,
    setCurrPage,
    totPages,
    totDocuments,
    nHits,
    dishes,
  };
};
