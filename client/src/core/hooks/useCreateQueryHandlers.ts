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
  REG_P_MY_ORD,
  REG_P_MANAGE_ORD,
} from "../config/constants/regex";
import { useUpdateCardsLimit } from "./UI/useUpdateCardsLimit";
import { defaultValsSearchMyOrders } from "../config/fieldsArr/allFields/myOrders/filterSort";
import { defaultValuesManageOrdersSearch } from "../config/fieldsArr/allFields/manageOrders/filterSort";

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
  id: string;
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

  let defaultValues: any = null;
  let id: string | null = null;

  if (REG_P_MY_REST.test(path)) {
    defaultValues = defaultValuesMyRestSearch;
    id = "searchBarMyRest";
  } else if (REG_P_DISHES.test(path)) {
    defaultValues = defaultValuesMyDishesSearch;
    id = "searchBarMyDishes";
  } else if (REG_P_SEARCH.test(path)) {
    defaultValues = defaultValsSearchAllUsers;
    id = "searchBarAllUsers";
  } else if (REG_P_DISHES_USER.test(path)) {
    defaultValues = defaultValuesSearchDishesAsUser;
    id = "searchBarDishesAsUser";
  } else if (REG_P_MY_ORD.test(path)) {
    defaultValues = defaultValsSearchMyOrders;
    id = "searchBarMyOrders";
  } else if (REG_P_MANAGE_ORD.test(path)) {
    defaultValues = defaultValuesManageOrdersSearch;
    id = "searchBarManageOrders";
  } else {
    throw new Error("Invalid path");
  }

  const handleSave = handleSubmit((formDatHook) => {
    formDatHook.page = currPage + "";
    sessionStorage.setItem(key, JSON.stringify(formDatHook));
    queryClient.removeQueries({ queryKey: [key] });
  });

  const handleClear = () => {
    sessionStorage.removeItem(key);
    reset(defaultValues);
    setCurrPageBeforeCb(1);
    trigger();
    queryClient.removeQueries({ queryKey: [key] });
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

    setTimeout(() => {
      const el = document.getElementById(id!);
      const h = el?.offsetTop;

      window.scrollTo({
        top: (h ?? 0) + (el?.getBoundingClientRect()?.height ?? 0),
        behavior: "smooth",
      });
    }, 100);
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
    id: id as string,
  };
};
