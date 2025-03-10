import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../types/myRestaurants";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useEffect } from "react";

export const useAddRestaurant = () => {
  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues: {
      openTime: "480",
      closeTime: "1200",
    },
  });

  useScrollTop();

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  return { formContext };
};
