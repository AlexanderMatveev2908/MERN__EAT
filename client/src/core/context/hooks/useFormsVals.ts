import { useForm } from "react-hook-form";
import { FormSearchType } from "../../../types/allTypes/restAdmin";
import { DishMenuFormType } from "../../../types/types";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";

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
    defaultValues: {
      restaurant: "",
      items: [
        {
          name: "",
          quantity: "",
          price: "",
          images: [],
        },
      ],
    },
  });

  const formContextMyDishesSearch = useForm<SearchMyDishesFormType>({
    mode: "onChange",
    defaultValues: {
      searchVals: ["name"],
    },
  });

  return {
    formContextMyRestaurants,
    formContextMyDishesAddItem,
    formContextMyDishesSearch,
  };
};
