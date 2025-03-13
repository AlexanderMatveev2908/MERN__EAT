import { useForm } from "react-hook-form";
import { useToast } from "../../../hooks/useGlobal";
import { useHandleErr } from "../../../hooks/useHandleErr";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";
import { useEffect } from "react";

export const useUpdateRestaurant = () => {
  useScrollTop();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues: {},
  });

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  return { formContext };
};
