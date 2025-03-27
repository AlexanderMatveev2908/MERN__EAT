import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/allTypes/restAdmin";
import { useEffect } from "react";
import { prepareFormDataMyRest } from "../../../utils/allUtils/prepareFormData";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { defaultValuesMyRest } from "../../../core/config/onlyDev/defVals";
import { createRestaurantAPI } from "../../../core/api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { isDev } from "../../../core/config/constants/environment";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";

export const useAddRestaurant = () => {
  const navigate = useNavigate();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues: isDev ? { ...defaultValuesMyRest } : {},
  });

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createRestaurantAPI(formData),
    onSuccess: (data) => {
      showToastMsg("Restaurant created successfully", "SUCCESS");
      navigate(`/my-restaurants/${data?.restId}`);
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = formContext.handleSubmit(
    (data: MyRestaurantsAddUpdateFormType) => {
      const formData = prepareFormDataMyRest(data);

      mutate(formData);
    }
  );

  return { formContext, handleSave, isPending };
};
