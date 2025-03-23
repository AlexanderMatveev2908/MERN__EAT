/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useUpdateCardsLimit } from "./useUpdateCardsLimit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { defaultValuesMyRestSearch } from "../config/fieldsArr/allFields/MyRestaurants/filterSort";
import { defaultValuesMyDishesSearch } from "../config/fieldsArr/allFields/MyDishes/filterSort";
import { defaultValsSearchAllUsers } from "../config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { createURLParams } from "../../utils/utils";
import { useHandleErr } from "./useHandleErr";
import { ErrFoodApp } from "../../types/allTypes/API";

export const useCreateQueryHandlers = ({
  formCtx,
  key,
  cbAPI,
  cbProcessForm,
}: {
  formCtx: UseFormReturn<any>;
  key: string;
  cbAPI: (params: URLSearchParams) => Promise<any>;
  cbProcessForm?: (formVals: any) => URLSearchParams;
}) => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);

  const path = useLocation().pathname;

  const queryClient = useQueryClient();
  useUpdateCardsLimit(limit, setLimit);

  const { handleSubmit, reset, trigger } = formCtx;

  const defaultValues =
    path === "/my-restaurants"
      ? defaultValuesMyRestSearch
      : path === "/my-dishes"
      ? defaultValuesMyDishesSearch
      : path === "/search"
      ? defaultValsSearchAllUsers
      : {};

  const handleSave = handleSubmit((formDatHook) => {
    formDatHook.page = currPage + "";
    sessionStorage.setItem(key, JSON.stringify(formDatHook));
    queryClient.resetQueries({ queryKey: [key] });
  });

  const handleClear = () => {
    sessionStorage.removeItem(key);
    reset(defaultValues);
    setCurrPage(1);
    trigger();
    queryClient.resetQueries({ queryKey: [key] });
  };

  const formVals = formCtx.watch();
  formVals.page = currPage + "";
  formVals.limit = limit + "";

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: [key, formVals],
    queryFn: () =>
      cbAPI(
        cbProcessForm ? cbProcessForm(formVals) : createURLParams(formVals)
      ),
  });

  const { handleErrAPI } = useHandleErr();

  const handleSideEffects = useCallback(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    }
    if (isSuccess) {
      // console.log(data);
      if (data?.nHits < limit) setCurrPage(1);
    }
  }, [isError, isSuccess, error, handleErrAPI, data, limit, setCurrPage]);

  useEffect(() => {
    handleSideEffects();
  }, [handleSideEffects]);

  return {
    formVals,
    handleSave,
    handleClear,
    limit,
    propsBlock: {
      currPage,
      setCurrPage,
    },

    data,
    isSuccess,
    isPending,
    isError,
    error,
  };
};
