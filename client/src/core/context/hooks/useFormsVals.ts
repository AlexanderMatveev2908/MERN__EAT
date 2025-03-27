import { useForm } from "react-hook-form";
import { FormSearchType } from "../../../types/allTypes/restAdmin";
import { DishMenuFormType } from "../../../types/types";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";
import {
  SearchDishesFormType,
  SearchFormType,
} from "../../../types/allTypes/search";
import { isDev } from "../../config/constants/environment";
import { defaultValuesSearchDishesAsUser } from "../../config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";

export const useFormsVals = () => {
  const savedForm = sessionStorage.getItem("myRestaurantsSearch");
  const formContextMyRestaurants = useForm<FormSearchType>({
    mode: "onChange",
    defaultValues: savedForm
      ? { ...JSON.parse(savedForm) }
      : { searchVals: ["name"] },
  });

  const formContextMyDishesAddItem = useForm<DishMenuFormType>({
    mode: "onChange",
    defaultValues: isDev
      ? undefined
      : {
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

  const formContextMyDishesUpdate = useForm<DishMenuFormType>({
    mode: "onChange",
  });

  const savedFormMyDishes = sessionStorage.getItem("myDishesSearch");
  const formContextMyDishesSearch = useForm<SearchMyDishesFormType>({
    mode: "onChange",
    defaultValues: savedFormMyDishes
      ? {
          ...JSON.parse(savedFormMyDishes),
        }
      : {
          searchVals: ["name"],
        },
  });

  const savedFormSearch = sessionStorage.getItem("searchAllUsersRest");
  const formContextSearchRestAllUsers = useForm<SearchFormType>({
    mode: "onChange",
    defaultValues: savedFormSearch
      ? {
          ...JSON.parse(savedFormSearch),
        }
      : {
          searchVals: ["name"],
        },
  });

  const formContextSearchDishesAllUSers = useForm<SearchDishesFormType>({
    mode: "onChange",
    defaultValues: { ...defaultValuesSearchDishesAsUser },
  });

  return {
    formContextMyRestaurants,
    formContextMyDishesAddItem,
    formContextMyDishesSearch,
    formContextMyDishesUpdate,
    formContextSearchRestAllUsers,
    formContextSearchDishesAllUSers,
  };
};
