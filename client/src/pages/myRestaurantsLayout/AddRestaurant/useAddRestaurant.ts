import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/allTypes/restAdmin";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { useEffect } from "react";
import { prepareFormDataMyRest } from "../../../utils/allUtils/prepareFormData";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../core/hooks/useGlobal";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { useNavigate } from "react-router-dom";
import { defaultValuesMyRest } from "../../../core/config/onlyDev/defVals";
import { createRestaurantAPI } from "../../../core/api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useAddRestaurant = () => {
  const navigate = useNavigate();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues:
      import.meta.env.VITE_NODE_ENV === "development"
        ? { ...defaultValuesMyRest }
        : {},
  });

  useScrollTop();

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createRestaurantAPI(formData),
    onSuccess: () => {
      showToastMsg("Restaurant created successfully", "SUCCESS");
      navigate("/my-restaurants");
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = formContext.handleSubmit(
    (data: MyRestaurantsAddUpdateFormType) => {
      // for (const [key, val] of prepareFormData(data).entries()) {
      //   console.log(key, val);
      // }

      const formData = prepareFormDataMyRest(data);

      mutate(formData);
    }
  );

  return { formContext, handleSave, isPending };
};
