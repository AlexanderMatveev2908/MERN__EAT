import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/restAdmin";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect } from "react";
import { prepareFormData } from "../../../utils/prepareFormDataRestaurants";
import { useMutation } from "@tanstack/react-query";
import { createRestaurantAPI } from "../../../api/myRestaurants";
import { useToast } from "../../../hooks/useGlobal";
import { useHandleErr } from "../../../hooks/useHandleErr";
import { defaultValuesMyRest } from "../../../config/onlyDev/defVals";
import { useNavigate } from "react-router-dom";

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
    onError: (err) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = formContext.handleSubmit(
    (data: MyRestaurantsAddUpdateFormType) => {
      // for (const [key, val] of prepareFormData(data).entries()) {
      //   console.log(key, val);
      // }

      const formData = prepareFormData(data);

      mutate(formData);
    }
  );

  return { formContext, handleSave, isPending };
};
