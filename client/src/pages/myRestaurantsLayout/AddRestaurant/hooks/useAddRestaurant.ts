import { useForm } from "react-hook-form";
import { AddRestaurantFormType } from "../../../../types/myRestaurants";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useEffect } from "react";

export const useAddRestaurant = () => {
  const {
    register,
    formState: { errors },
    setFocus,
    // reset,
    watch,
    // trigger,
    // setValue,
    // handleSubmit,
  } = useForm<AddRestaurantFormType>({ mode: "onChange" });

  useScrollTop();
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return {
    register,
    errors,
    watch,
  };
};
