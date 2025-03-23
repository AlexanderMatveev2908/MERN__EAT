import { useCallback, useEffect, useState } from "react";
import { useFormsCustom } from "../../core/hooks/useGlobal";
import { useUpdateCardsLimit } from "../../core/hooks/useUpdateCardsLimit";
import { defaultValsSearchAllUsers } from "../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRestAllUSersAPI } from "../../core/api/APICalls/searchAllUsers";
import { createURLParams } from "../../utils/utils";
import { useHandleErr } from "../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../types/allTypes/API";

export const useSearch = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);

  const queryClient = useQueryClient();

  const { handleErrAPI } = useHandleErr();

  useUpdateCardsLimit(limit, setLimit);

  const { formContextSearchRestAllUsers: formContext } = useFormsCustom();
  const { handleSubmit, reset, watch, trigger } = formContext;

  const formVals = watch();
  formVals.page = currPage + "";
  formVals.limit = limit + "";

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["searchAllUsersRest", formVals],
    queryFn: () => getRestAllUSersAPI(createURLParams(formVals)),
  });
  const handleSideEffects = useCallback(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    } else if (isSuccess) {
      console.log(data);
    }
  }, [isError, isSuccess, error, handleErrAPI, data]);
  useEffect(() => {
    handleSideEffects();
  }, [handleSideEffects]);

  const handleSave = handleSubmit((formDataHook) => {
    console.log(formDataHook);

    queryClient.resetQueries({ queryKey: ["searchAllUsersRest"] });
    sessionStorage.setItem("searchRest", JSON.stringify(formDataHook));
  });
  const handleClear = () => {
    sessionStorage.removeItem("searchRest");
    reset(defaultValsSearchAllUsers);
    setCurrPage(1);
    trigger("search");
  };

  return {
    formContext,
    propsBlock: {
      currPage,
      setCurrPage,
    },
    handleSave,
    handleClear,
    isPending,
    data,
    isError,
    error,
    isSuccess,
  };
};
