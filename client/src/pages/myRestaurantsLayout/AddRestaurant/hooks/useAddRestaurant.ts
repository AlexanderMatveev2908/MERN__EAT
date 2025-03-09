import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../types/myRestaurants";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useEffect } from "react";

export const useAddRestaurant = () => {
  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues: {
      openTime: "0",
      closeTime: "1",
    },
  });

  useScrollTop();

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  return { formContext };
};
