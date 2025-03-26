import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { createDishesAPI } from "../../../core/api/APICalls/myDishes";
import { useFormsCustom, useToast } from "../../../core/hooks/useGlobal";
import { useFieldArray } from "react-hook-form";
import { prepareFormDataMyDishes } from "../../../utils/allUtils/prepareFormData";
import { useNavigate } from "react-router-dom";
import { useGetRestaurantsIds } from "../../../core/hooks/myRestaurants/useGetRestaurantsIds";
import { useLazyDev } from "./useLazyDev";
import { isDev } from "../../../core/config/constants/environment";

export const useAddDish = () => {
  const { handleErrAPI } = useHandleErr();
  const { formContextMyDishesAddItem: formContext, formContextMyDishesSearch } =
    useFormsCustom();
  const { showToastMsg } = useToast();

  const navigate = useNavigate();

  const { isPending: isDevPending } = useLazyDev({
    setValue: formContext.setValue,
    reset: formContext.reset,
  });

  const { isPendingIds, restInfo, isSuccessIds, isErrorIds, errorIds } =
    useGetRestaurantsIds();

  const { fields } = useFieldArray({
    control: formContext.control,
    name: "items",
  });

  useEffect(() => {
    if (formContext?.setFocus)
      setTimeout(() => {
        formContext.setFocus(`items.${fields.length - 1}`);
      }, 500);
  }, [formContext, fields.length]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ form, restId }: { form: FormData; restId: string }) =>
      createDishesAPI({ form, restId }),
    onSuccess: (data) => {
      showToastMsg(
        `Dish${fields.length > 1 ? "es" : ""} created successfully`,
        "SUCCESS"
      );

      const { setValue } = formContextMyDishesSearch;

      setValue("searchVals", ["restaurantId"]);
      setValue("search", data.restId);
      setValue("createdAtSort", ["desc"]);

      navigate(`/my-dishes`);

      formContext.reset({
        restaurant: "",
        items: [
          {
            name: "",
            price: "",
            quantity: "",
            images: [],
          },
        ],
      });
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
  });

  const handleSave = formContext.handleSubmit((formDataHook) => {
    const formData = prepareFormDataMyDishes(formDataHook);

    mutate({ form: formData, restId: formDataHook.restaurant });
  });

  return {
    isPendingIds: isPendingIds || (isDev ? isDevPending : false),
    formContext,
    restInfo,
    isSuccessIds,
    handleSave,
    isPending,
    isErrorIds,
    errorIds,
  };
};
