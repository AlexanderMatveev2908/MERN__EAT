/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormsCustom, usePopup } from "../../../core/hooks/useGlobal";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import {
  bulkDeleteMyDishesAPI,
  bulkDeleteQueryAPI,
  getMyDishesAPI,
} from "../../../core/api/APICalls/myDishes";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useUpdateCardsLimit } from "../../../core/hooks/useUpdateCardsLimit";
import { defaultValuesMyDishesSearch } from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import { DishType } from "../../../types/types";
import { useCreateTanMyDishes } from "./useCreateTanMyDishes";

export const useMyDishes = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);
  const [selected, setSelected] = useState<string[]>([]);

  const queryClient = useQueryClient();

  useUpdateCardsLimit(limit, setLimit);
  const { formContextMyDishesSearch } = useFormsCustom();
  const { handleErrAPI } = useHandleErr();
  const { setPopup } = usePopup();

  const { reset, handleSubmit, watch, trigger } = formContextMyDishesSearch;

  const handleSave = handleSubmit((formDatHook) => {
    formDatHook.page = currPage + "";
    sessionStorage.setItem("myDishesForm", JSON.stringify(formDatHook));
    queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
  });
  const handleClear = () => {
    sessionStorage.removeItem("myDishesForm");
    reset(defaultValuesMyDishesSearch);
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

  const toggleSelected = (val: string) =>
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((el) => el !== val) : [...prev, val]
    );
  const clearSelected = () => setSelected([]);

  const { mutate: mutateSelected, isPending: isPendingSelected } =
    useCreateTanMyDishes({ cbMutation: bulkDeleteMyDishesAPI, setSelected });

  const handleDeletePopup = () => mutateSelected(selected);
  const handleOpenPopup = () =>
    setPopup({
      txt: `delete ${selected.length} dish${selected.length > 1 ? "es" : ""} ?`,
      greenLabel: "I changes idea",
      redLabel: "Delete dishes",
      confirmAction: handleDeletePopup,
      isPending: isPendingSelected,
    });

  const { mutate: mutateBulkQuery, isPending: isPendingBulkQuery } =
    useCreateTanMyDishes({
      cbMutation: bulkDeleteQueryAPI,
      setSelected,
    });

  const handleDeleteBulkQuery = () =>
    mutateBulkQuery(createURLParamsMyDishes(formDataSearch));
  const handleOpenPopupBulkQuery = () => {
    if (data?.dishes?.length)
      setSelected(data.dishes.map((el: DishType) => el._id));
    setPopup({
      txt: `delete all dishes that match query ?`,
      redLabel: "Delete dishes",
      confirmAction: handleDeleteBulkQuery,
      isPending: isPendingBulkQuery,
    });
  };

  return {
    formContextMyDishesSearch,
    propsForm: { handleSave, handleClear, isPending },
    propsBlockPages: { currPage, setCurrPage, totPages: data?.totPages },
    data,
    toggleSelected,
    selected,
    handleOpenPopup,
    clearSelected,
    handleOpenPopupBulkQuery,
  };
};
