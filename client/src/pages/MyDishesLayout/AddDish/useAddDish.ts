import { useQuery } from "@tanstack/react-query";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { getRestaurantIdsAPI } from "../../../core/api/APICalls/myDishes";
import { useFormsCustom } from "../../../core/hooks/useGlobal";

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

  useEffect(() => {
    if (formContextMyDishesAddItem?.setFocus)
      setTimeout(() => {
        formContextMyDishesAddItem.setFocus("name");
      }, 500);
  }, [formContextMyDishesAddItem]);

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
