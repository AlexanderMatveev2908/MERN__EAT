import { useQuery } from "@tanstack/react-query";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { getRestaurantIdsAPI } from "../../../core/api/APICalls/myDishes";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { useFieldArray } from "react-hook-form";

export const useAddDish = () => {
  useScrollTop();
  const { handleErrAPI } = useHandleErr();
  const { formContextMyDishesAddItem } = useFormsCustom();

  const {
    data: dataIds,
    isPending: isPendingIds,
    isSuccess: isSuccessIds,
    isError: isErrorIds,
    error: errorIds,
  } = useQuery({
    queryKey: ["restaurantIds"],
    queryFn: getRestaurantIdsAPI,
  });

  const handleSideEffectsGetIds = useCallback(() => {
    if (isErrorIds) handleErrAPI({ err: errorIds as ErrFoodApp });
  }, [isErrorIds, errorIds, handleErrAPI]);

  useEffect(() => {
    handleSideEffectsGetIds();
  }, [handleSideEffectsGetIds]);

  const { fields } = useFieldArray({
    control: formContextMyDishesAddItem.control,
    name: "items",
  });

  useEffect(() => {
    if (formContextMyDishesAddItem?.setFocus)
      setTimeout(() => {
        formContextMyDishesAddItem.setFocus(`items.${fields.length - 1}`);
      }, 500);
  }, [formContextMyDishesAddItem, fields.length]);

  const handleSave = formContextMyDishesAddItem.handleSubmit((formData) =>
    console.log(formData)
  );

  return {
    isPendingIds,
    formContextMyDishesAddItem,
    dataIds,
    isSuccessIds,
    handleSave,
  };
};
