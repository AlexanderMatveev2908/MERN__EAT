import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect } from "react";
import { prepareFormData } from "../../../utils/prepareFormDataRestaurants";
import { useMutation } from "@tanstack/react-query";
import { createRestaurantAPI } from "../../../api/myRestaurants";
import { useToast } from "../../../hooks/useGlobal";
import { useHandleErr } from "../../../hooks/useHandleErr";

export const useAddRestaurant = () => {
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues: {
      name: "Name",
      country: "Country",
      state: "State",
      city: "City",
      street: "Street",
      zipCode: "12345",
      email: "email@exampple.com",
      phone: "1234567890",
      website: "http://www.example.com",
      estTimeDelivery: "30",
      price: "10",
      freeDeliveryPrice: "50",
      categories: ["italian", "chinese"],
      openTime: "480",
      closeTime: "1200",
    },
  });

  useScrollTop();

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createRestaurantAPI(formData),
    onSuccess: () => {
      showToastMsg("Restaurant created successfully", "SUCCESS");
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
