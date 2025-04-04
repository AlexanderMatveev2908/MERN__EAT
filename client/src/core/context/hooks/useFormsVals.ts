import { useForm, UseFormReturn } from "react-hook-form";
import { FormSearchType } from "../../../types/allTypes/restAdmin";
import { DishMenuFormType } from "../../../types/types";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";
import {
  SearchDishesFormType,
  SearchFormType,
} from "../../../types/allTypes/search";
import { isDev } from "../../config/constants/environment";
import { defaultValuesSearchDishesAsUser } from "../../config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { SearchMyOrders } from "../../../types/allTypes/orders";
import { defaultValsSearchMyOrders } from "../../config/fieldsArr/allFields/myOrders/filterSort";
import { ManageOrdersSearch } from "../../../types/allTypes/manageOrders";
import { defaultValuesManageOrdersSearch } from "../../config/fieldsArr/allFields/manageOrders/filterSort";

export type FormsCtxType = {
  formContextMyRestaurants: UseFormReturn<FormSearchType>;
  formContextMyDishesAddItem: UseFormReturn<DishMenuFormType>;
  formContextMyDishesUpdate: UseFormReturn<DishMenuFormType>;
  formContextMyDishesSearch: UseFormReturn<SearchMyDishesFormType>;
  formContextSearchRestAllUsers: UseFormReturn<SearchFormType>;
  formContextSearchDishesAllUSers: UseFormReturn<SearchDishesFormType>;
  formContextSearchMyOrders: UseFormReturn<SearchMyOrders>;
  formContextManageOrdersSearch: UseFormReturn<ManageOrdersSearch>;
};

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

  const savedValsMyOrders = sessionStorage.getItem("myOrdersSearch");
  const formContextSearchMyOrders = useForm<SearchMyOrders>({
    mode: "onChange",
    defaultValues: savedValsMyOrders
      ? {
          ...JSON.parse(savedValsMyOrders),
        }
      : defaultValsSearchMyOrders,
  });

  const savedValsManageOrders = sessionStorage.getItem("manageOrdersSearch");
  const formContextManageOrdersSearch = useForm<ManageOrdersSearch>({
    mode: "onChange",
    defaultValues: savedValsManageOrders
      ? {
          ...JSON.parse(savedValsManageOrders),
        }
      : { ...defaultValuesManageOrdersSearch },
  });

  return {
    formContextMyRestaurants,
    formContextMyDishesAddItem,
    formContextMyDishesSearch,
    formContextMyDishesUpdate,
    formContextSearchRestAllUsers,
    formContextSearchDishesAllUSers,
    formContextSearchMyOrders,
    formContextManageOrdersSearch,
  };
};
