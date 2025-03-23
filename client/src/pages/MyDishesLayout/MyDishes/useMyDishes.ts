import { useFormsCustom, usePopup } from "../../../core/hooks/useGlobal";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import {
  bulkDeleteMyDishesAPI,
  bulkDeleteQueryAPI,
  getMyDishesAPI,
} from "../../../core/api/APICalls/myDishes";
import { useState } from "react";
import { DishType } from "../../../types/types";
import { useCreateTanMyDishes } from "./useCreateTanMyDishes";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";

export const useMyDishes = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const { formContextMyDishesSearch: formContext } = useFormsCustom();
  const { setPopup } = usePopup();

  const {
    formVals,
    handleSave,
    handleClear,
    propsBlock,
    data,
    ...statesAsyncCB
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "myDishesSearch",
    cbAPI: getMyDishesAPI,
  });

  const toggleSelected = (val: string) =>
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((el) => el !== val) : [...prev, val]
    );
  const clearSelected = () => setSelected([]);

  const { handleDelete: handleDeletePopup, isPending: isPendingSelected } =
    useCreateTanMyDishes({
      cbMutation: () => bulkDeleteMyDishesAPI(selected),
      setSelected,
    });

  const handleOpenPopup = () =>
    setPopup({
      txt: `delete ${selected.length} dish${selected.length > 1 ? "es" : ""} ?`,
      greenLabel: "I changes idea",
      redLabel: "Delete dishes",
      confirmAction: handleDeletePopup,
      isPending: isPendingSelected,
    });

  const { handleDelete: handleDeleteBulkQuery, isPending: isPendingBulkQuery } =
    useCreateTanMyDishes({
      cbMutation: () => bulkDeleteQueryAPI(createURLParamsMyDishes(formVals)),
      setSelected,
    });

  const handleOpenPopupBulkQuery = () => {
    if (data?.dishes?.length)
      setSelected(data.dishes.map((el: DishType) => el._id));
    setPopup({
      txt: `delete all dishes that match query (${data?.nHits}) ?`,
      redLabel: "Delete dishes",
      confirmAction: handleDeleteBulkQuery,
      isPending: isPendingBulkQuery,
    });
  };

  return {
    propsForm: {
      handleSave,
      handleClear,
      formContext,
      isPending: statesAsyncCB.isPending,
    },
    propsBlock,
    data,

    toggleSelected,
    selected,
    clearSelected,

    handleOpenPopup,
    handleOpenPopupBulkQuery,

    ...statesAsyncCB,
  };
};
