/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaClock,
  FaDatabase,
  FaMoneyBillAlt,
  FaMoneyBillWave,
  FaMoneyBillWaveAlt,
  FaRegStar,
} from "react-icons/fa";
import { genID, priceFormatter } from "../../../../../utils/utils";
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
import {
  myDishesFieldsNumericSearch,
  sortersMyDishesFields,
} from "../MyDishes/filterSort";
import { IoRestaurant } from "react-icons/io5";
import { REG_COUPON } from "../../../constants/regex";

const searchRest = ["name", "country", "state", "city"];

export const searchRestFieldsSearch: BaseFieldType[] = searchRest.map((el) => ({
  field: el,
  id: genID(),
  label: el[0].toUpperCase() + el.slice(1),
}));

export const searchRestAllUsersFilters = [
  {
    field: "openHours",
    label: "Open hours",
    subFields: [
      {
        id: genID(),
        field: "openNow",
        label: "Open now",
      },
      {
        id: genID(),
        field: "closed",
        label: "Closed",
      },
    ],
    icon: FaClock,
  },
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
  { field: "dishesCountSort", label: "No. of dishes", icon: IoRestaurant },
].map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));

export const defaultValsSearchAllUsers: Omit<SearchFormType, "search"> & {
  items: any;
} = {
  searchVals: ["name"],

  openHours: [],
  categories: [],
  avgPriceRange: [],
  avgRatingRange: [],

  avgRatingSort: [],
  avgPriceSort: [],
  dishesCountSort: [],
  deliveryTimeSort: [],
  deliveryPriceSort: [],

  items: [
    {
      searchVal: "name",
      search: "",
    },
  ],

  page: "1",
};

export const numericFieldsSearch = myDishesFieldsNumericSearch.map((el) => ({
  ...el,
  id: genID(),
}));

export const searchDishesSorters = sortersMyDishesFields
  .filter((el) =>
    ["createdAtSort", "updatedAtSort", "priceSort", "quantitySort"].includes(
      el.field
    )
  )
  .map((el) => ({
    ...el,
    id: genID(),
    subFields: [...fieldsUpAndDown.map((subEl) => ({ ...subEl, id: genID() }))],
  }))
  .reverse()
  // built-in js or mongoDb sort make a come after b when result returned in cb is positive and a before b when result is negative, 0 leave all as it is
  //  so 10 - 5 where a=a and b=5 will make 10 come after b so sort will be asc => 5, 10
  //  so to make sort desc we can switch els as 5 - 10 where a=10 and b=5 to force result be negative and have a before b => 10, 5
  // eslint-disable-next-line
  .sort((a, _) => (a.field === "priceSort" ? -1 : 0));

export const defaultValuesSearchDishesAsUser = {
  minPrice: "",
  maxPrice: "",
  minQuantity: "",
  maxQuantity: "",

  priceSort: [],
  quantitySort: [],
  createdAtSort: [],
  updateAtSort: [],
};

export const fieldCoupon = {
  id: genID(),
  field: "coupon",
  label: "Coupon",
  msg: "Invalid code coupon",
  reg: REG_COUPON,
  place: "Coupon code...",
  required: false,
};

export const showNumericValsDishUser = (...params: number[]) =>
  [
    {
      label: "Price",
      val: priceFormatter({ price: params[0] }),
      icon: FaMoneyBillAlt,
    },
    {
      label: "Avl quantity",
      val: params[1],
      icon: FaDatabase,
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
