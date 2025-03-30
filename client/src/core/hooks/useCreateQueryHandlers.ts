/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { defaultValuesMyRestSearch } from "../config/fieldsArr/allFields/MyRestaurants/filterSort";
import { defaultValuesMyDishesSearch } from "../config/fieldsArr/allFields/MyDishes/filterSort";
import {
  defaultValsSearchAllUsers,
  defaultValuesSearchDishesAsUser,
} from "../config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { createURLParams } from "../../utils/utils";
import { useHandleErr } from "./useHandleErr";
import { ErrFoodApp } from "../../types/allTypes/API";
import {
  REG_P_DISHES,
  REG_P_MY_REST,
  REG_P_SEARCH,
  REG_P_DISHES_USER,
} from "../config/constants/regex";
import { useUpdateCardsLimit } from "./UI/useUpdateCardsLimit";

type ReturnTypeCreateQueryHandler = {
  formVals: any;
  handleSave: () => void;
  handleClear: () => void;
  limit: number;
  propsBlock: {
    currPage: number;
    setCurrPage: (val: number) => void;
  };
  closeAllDrop: boolean;
  setCloseAllDrop: React.Dispatch<SetStateAction<boolean>>;
  data: any;
  isSuccess: boolean;
  isPending: boolean;
  isError: boolean;
  error: ErrFoodApp;
};

export const useCreateQueryHandlers = ({
  formCtx,
  key,
  cbAPI,
  cbProcessForm,
}: {
  formCtx: UseFormReturn<any>;
  key: string;
  cbAPI: (params: URLSearchParams, extra?: string) => Promise<any>;
  cbProcessForm?: (formVals: any) => URLSearchParams;
}): ReturnTypeCreateQueryHandler => {
  const [currPage, setCurrPageBeforeCb] = useState<number>(1);
  const [limit, setLimit] = useState(5);
  const [closeAllDrop, setCloseAllDrop] = useState(false);
  const path = useLocation().pathname;

  const queryClient = useQueryClient();

  useUpdateCardsLimit(limit, setLimit);
  const { handleSubmit, reset, trigger } = formCtx;

  const defaultValues = REG_P_MY_REST.test(path)
    ? defaultValuesMyRestSearch
    : REG_P_DISHES.test(path)
    ? defaultValuesMyDishesSearch
    : REG_P_SEARCH.test(path)
    ? defaultValsSearchAllUsers
    : REG_P_DISHES_USER.test(path)
    ? defaultValuesSearchDishesAsUser
    : {};

  const handleSave = handleSubmit((formDatHook) => {
    formDatHook.page = currPage + "";
    sessionStorage.setItem(key, JSON.stringify(formDatHook));
    queryClient.resetQueries({ queryKey: [key] });
  });

  const handleClear = () => {
    sessionStorage.removeItem(key);
    reset(defaultValues);
    setCurrPageBeforeCb(1);
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
      if (data?.nHits < limit) setCurrPageBeforeCb(1);
    }
  }, [
    isError,
    isSuccess,
    error,
    handleErrAPI,
    data,
    limit,
    setCurrPageBeforeCb,
  ]);

  useEffect(() => {
    handleSideEffects();
  }, [handleSideEffects]);

  const setCurrPage = (val: number) => {
    setCloseAllDrop(true);
    setCurrPageBeforeCb(val);

    const summary = document.getElementById("summaryRestPage");
    const h = summary?.getBoundingClientRect()?.height;

    window.scrollTo({
      top: REG_P_DISHES_USER.test(path) ? (h ?? 0) + 800 : 200,
      behavior: "smooth",
    });
  };

  return {
    formVals,
    handleSave,
    handleClear,
    limit,
    propsBlock: {
      currPage,
      setCurrPage,
    },
    closeAllDrop,
    setCloseAllDrop,

    data,
    isSuccess,
    isPending,
    isError,
    error: error as ErrFoodApp,
  };
};
