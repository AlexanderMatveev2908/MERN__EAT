import { useMutation, useQuery } from "@tanstack/react-query";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import {
  createDishesAPI,
  getRestaurantIdsAPI,
} from "../../../core/api/APICalls/myDishes";
import { useFormsCustom, useToast } from "../../../core/hooks/useGlobal";
import { useFieldArray } from "react-hook-form";
import { prepareFormDataMyDishes } from "../../../utils/allUtils/prepareFormData";
import { useLazyDev } from "./useLazyDev";

export const useAddDish = () => {
  useScrollTop();
  const { handleErrAPI } = useHandleErr();
  const { formContextMyDishesAddItem } = useFormsCustom();
  const { showToastMsg } = useToast();

  const { isPending: isDevPending } = useLazyDev({
    setValue: formContextMyDishesAddItem.setValue,
  });

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

  const { fields, append } = useFieldArray({
    control: formContextMyDishesAddItem.control,
    name: "items",
  });

  const handleSideEffectsGetIds = useCallback(() => {
    if (isErrorIds) {
      handleErrAPI({ err: errorIds as ErrFoodApp });
    } else if (isSuccessIds) {
      if (!fields?.length)
        setTimeout(() => {
          append({
            name: "",
            price: "",
            quantity: "",
            images: [],
          });
        }, 0);
    }
  }, [
    isErrorIds,
    errorIds,
    handleErrAPI,
    isSuccessIds,
    append,
    fields?.length,
  ]);

  useEffect(() => {
    handleSideEffectsGetIds();
  }, [handleSideEffectsGetIds]);

  useEffect(() => {
    if (formContextMyDishesAddItem?.setFocus)
      setTimeout(() => {
        formContextMyDishesAddItem.setFocus(`items.${fields.length - 1}`);
      }, 500);
  }, [formContextMyDishesAddItem, fields.length]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ form, restId }: { form: FormData; restId: string }) =>
      createDishesAPI({ form, restId }),
    onSuccess: () =>
      showToastMsg(
        `Dish${fields.length > 1 ? "es" : ""} created successfully`,
        "SUCCESS"
      ),
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
  });

  const handleSave = formContextMyDishesAddItem.handleSubmit((formDataHook) => {
    const formData = prepareFormDataMyDishes(formDataHook);

    mutate({ form: formData, restId: formDataHook.restaurant });

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
  });

  return {
    isPendingIds:
      isPendingIds ||
      (import.meta.env.VITE_NODE_ENV === "development" ? isDevPending : false),
    formContextMyDishesAddItem,
    dataIds,
    isSuccessIds,
    handleSave,
    isPending,
  };
};
