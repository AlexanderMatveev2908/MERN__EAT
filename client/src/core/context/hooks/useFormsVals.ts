import { useForm } from "react-hook-form";
import { FormSearchType } from "../../../types/allTypes/restAdmin";
import { DishMenuFormType } from "../../../types/types";

export const useFormsVals = () => {
  const savedForm = sessionStorage.getItem("myRestaurantsForm");
  const formContextMyRestaurants = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: savedForm
      ? { ...JSON.parse(savedForm) }
      : { searchVals: ["name"] },
  });

  const formContextMyDishesAddItem = useForm<DishMenuFormType>({
    mode: "onChange",
  });

  return { formContextMyRestaurants, formContextMyDishesAddItem };
};
