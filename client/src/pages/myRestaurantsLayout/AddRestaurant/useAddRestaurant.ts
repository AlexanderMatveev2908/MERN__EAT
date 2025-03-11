import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect } from "react";
import { prepareFormData } from "../../../utils/prepareFormDataRestaurants";

export const useAddRestaurant = () => {
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

  const handleSave = formContext.handleSubmit(
    (data: MyRestaurantsAddUpdateFormType) => {
      for (const [key, val] of prepareFormData(data).entries()) {
        console.log(key, val);
      }
    }
  );

  return { formContext, handleSave };
};
