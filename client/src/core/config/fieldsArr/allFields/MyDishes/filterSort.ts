import { LuChefHat } from "react-icons/lu";
import { genID } from "../../../../../utils/utils";
import { REG_PRICE, REG_QTY_SEARCH } from "../../../constants/regex";
import {
  BaseFieldType,
  FieldNoIconType,
  RadioFieldType,
  SearchFilterType,
  SorterFieldType,
} from "../../typesFields";
import { myRestaurantsCat } from "../MyRestaurants/makeUpdate";
import { IoIosCreate } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { FaDatabase, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { SearchMyDishesFormType } from "../../../../../types/allTypes/myDishes";

export const myDishesFieldsSearch: BaseFieldType[] = [
  {
    field: "name",
    label: "Name",
  },
  {
    field: "id",
    label: "Id",
  },
  {
    field: "restaurantName",
    label: "Restaurant name",
  },
  {
    field: "restaurantId",
    label: "Restaurant id",
  },
].map((el) => ({
  ...el,
  id: genID(),
}));

export const myDishesFieldsNumericSearch: FieldNoIconType[] = [
  {
    field: "minPrice",
    label: "Min price",
    reg: REG_PRICE,
    msg: "Price must be a number with up to 2 decimal places",
  },
  {
    field: "maxPrice",
    label: "Max price",
    reg: REG_PRICE,
    msg: "Price must be a number with up to 2 decimal places",
  },
  {
    field: "minQuantity",
    label: "Min quantity",
    reg: REG_QTY_SEARCH,
    msg: "Quantity must be a prime number without decimals",
  },
  {
    field: "maxQuantity",
    label: "Max quantity",
    reg: REG_QTY_SEARCH,
    msg: "Quantity must be a prime number without decimals",
  },
].map((el) => ({ ...el, id: genID(), required: false, type: "number" }));

const myDishesSubFieldsArr: BaseFieldType[] = myRestaurantsCat.map((el) => ({
  field: el,
  id: genID(),
  label: el === "fast-food" ? "Fast-Food" : el[0].toUpperCase() + el.slice(1),
  type: "number",
}));

export const myDishesFilters: SearchFilterType[] = [
  {
    id: genID(),
    field: "categories",
    label: "Category",
    subFields: myDishesSubFieldsArr,
    icon: LuChefHat,
  },
];

const fieldsUpAndDown: Omit<RadioFieldType, "id">[] = [
  {
    field: "asc",
    icon: FaSortAmountUp,
  },
  {
    field: "desc",
    icon: FaSortAmountDown,
  },
];

export const sortersMyDishesFields: SorterFieldType[] = [
  { field: "createdAtSort", label: "Created at", icon: IoIosCreate },
  { field: "updatedAtSort", label: "Updated at", icon: GrDocumentUpdate },
  { field: "priceSort", label: "Price", icon: GiReceiveMoney },
  { field: "quantitySort", label: "Quantity", icon: FaDatabase },
].map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));

export const fieldsMyDishesForm = [
  ...myDishesFieldsNumericSearch.map((el) => el.field),
  ...myDishesFilters.map((el) => el.field),
  ...sortersMyDishesFields.map((el) => el.field),
  "search",
];

export const defaultValuesMyDishesSearch: SearchMyDishesFormType = {
  search: "",
  searchVals: ["name"],
  categories: [],
  minPrice: "",
  maxPrice: "",
  minQuantity: "",
  maxQuantity: "",
  priceSort: [],
  quantitySort: [],
  createdAtSort: [],
  updatedAtSort: [],
  page: "1",
};
