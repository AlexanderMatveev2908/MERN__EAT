import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { createDishesAPI } from "../../../core/api/APICalls/myDishes";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { useFieldArray } from "react-hook-form";
import { prepareFormDataMyDishes } from "../../../utils/allUtils/prepareFormData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRestaurantsIds } from "../../../core/hooks/myRestaurants/useGetRestaurantsIds";
import { useLazyDev } from "./useLazyDev";
import { isDev } from "../../../core/config/constants/environment";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { REG_MONGO } from "../../../core/config/constants/regex";

export const useAddDish = () => {
  const { formContextMyDishesAddItem: formContext, formContextMyDishesSearch } =
    useFormsCustom();
  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restIdSent = searchParams.get("restId");

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

  useEffect(() => {
    if (REG_MONGO.test(restIdSent ?? ""))
      formContext.setValue("restaurant", restIdSent ?? "");
  }, [formContext, restIdSent]);

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
