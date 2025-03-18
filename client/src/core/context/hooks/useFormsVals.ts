import { useForm } from "react-hook-form";
import { FormSearchType } from "../../../types/allTypes/restAdmin";

export const useFormsVals = () => {
  const savedForm = sessionStorage.getItem("myRestaurantsForm");
  const formContextMyRestaurants = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: savedForm
      ? { ...JSON.parse(savedForm) }
      : { searchVals: ["name"] },
  });

  return { formContextMyRestaurants };
};
