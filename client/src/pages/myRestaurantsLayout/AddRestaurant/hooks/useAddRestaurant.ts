import { useForm } from "react-hook-form";
import { AddRestaurantFormType } from "../../../../types/myRestaurants";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useEffect } from "react";

export const useAddRestaurant = () => {
  const formContext = useForm<AddRestaurantFormType>({ mode: "onChange" });

  useScrollTop();

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  return { formContext };
};
