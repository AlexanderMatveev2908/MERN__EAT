import { FaMoneyBillWave, FaMoneyBillWaveAlt, FaRegStar } from "react-icons/fa";
import { genID } from "../../../../../utils/utils";
import {
  categoriesAppFields,
  fieldsUpAndDown,
  priceRangeFields,
  ratingRangeFields,
} from "../filtersSorters";
import { LuChefHat } from "react-icons/lu";
import { BaseFieldType } from "../../typesFields";
import { MdDeliveryDining } from "react-icons/md";
import { SearchFormType } from "../../../../../types/allTypes/search";

const searchRest = ["name", "country", "state", "city"];

export const searchRestFieldsSearch: BaseFieldType[] = searchRest.map((el) => ({
  field: el,
  id: genID(),
  label: el[0].toUpperCase() + el.slice(1),
}));

export const searchRestAllUsersFilters = [
  {
    field: "avgRatingRange",
    label: "Avg rating",
    subFields: [...ratingRangeFields],
    icon: FaRegStar,
  },
  {
    field: "categories",
    label: "Category",
    subFields: [...categoriesAppFields],
    icon: LuChefHat,
  },
  {
    field: "avgPriceRange",
    label: "Avg price dish",
    subFields: [...priceRangeFields],
    icon: FaMoneyBillWave,
  },
].map((el) => ({
  ...el,
  id: genID(),
}));

export const searchRestAllUsersSorters = [
  { field: "avgRatingSort", label: "Avg rating", icon: FaRegStar },
  { field: "avgPriceSort", label: "Avg price dish", icon: FaMoneyBillWaveAlt },
  { field: "deliveryTimeSort", label: "Delivery time", icon: MdDeliveryDining },
  {
    field: "deliveryPriceSort",
    label: "Delivery price",
    icon: MdDeliveryDining,
  },
].map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));

export const defaultValsSearchAllUsers: SearchFormType = {
  search: "",
  searchVals: ["name"],

  categories: [],
  avgPriceRange: [],
  avgRatingRange: [],

  avgRatingSort: [],
  avgPriceSort: [],
  deliveryTimeSort: [],
  deliveryPriceSort: [],
};
