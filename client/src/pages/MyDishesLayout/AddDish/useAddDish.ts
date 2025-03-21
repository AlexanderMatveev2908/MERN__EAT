import { useMutation } from "@tanstack/react-query";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { createDishesAPI } from "../../../core/api/APICalls/myDishes";
import { useFormsCustom, useToast } from "../../../core/hooks/useGlobal";
import { useFieldArray } from "react-hook-form";
import { prepareFormDataMyDishes } from "../../../utils/allUtils/prepareFormData";
import { useLazyDev } from "./useLazyDev";
import { useNavigate } from "react-router-dom";
import { useGetRestaurantsIds } from "../../../core/hooks/useGetRestaurantsIds";

export const useAddDish = () => {
  useScrollTop();
  const { handleErrAPI } = useHandleErr();
  const { formContextMyDishesAddItem: formContext, formContextMyDishesSearch } =
    useFormsCustom();
  const { showToastMsg } = useToast();

  const navigate = useNavigate();

  const { isPending: isDevPending } = useLazyDev({
    setValue: formContext.setValue,
  });

  const { isPendingIds, restInfo, isSuccessIds } = useGetRestaurantsIds();

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
    isPendingIds:
      isPendingIds ||
      (import.meta.env.VITE_NODE_ENV === "development" ? isDevPending : false),
    formContext,
    restInfo,
    isSuccessIds,
    handleSave,
    isPending,
  };
};
