import { LuChefHat } from "react-icons/lu";
import { genID } from "../../../../../utils/utils";
import { REG_PRICE, REG_QTY_SEARCH } from "../../../constants/regex";
import {
  BaseFieldType,
  FieldNoIconType,
  RadioFieldType,
  SearchFilterType,
} from "../../typesFields";
import { myRestaurantsCat } from "../MyRestaurants/makeUpdate";
import { IoIosCreate } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";
import { IconType } from "react-icons/lib";
import { GiReceiveMoney } from "react-icons/gi";
import { FaDatabase, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

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
].map((el) => ({ ...el, id: genID(), required: false }));

const myDishesSubFieldsArr: BaseFieldType[] = myRestaurantsCat.map((el) => ({
  field: el,
  id: genID(),
  label: el === "fast-food" ? "Fast-Food" : el[0].toUpperCase() + el.slice(1),
  type: "number",
}));

export const myDishesFilters: SearchFilterType = {
  id: genID(),
  field: "categories",
  label: "Category",
  subFields: myDishesSubFieldsArr,
  icon: LuChefHat,
};

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

export const sortersMyDishesFields: (Omit<BaseFieldType, "id"> & {
  icon: IconType;
})[] = [
  { field: "createdAtSort", label: "Created at", icon: IoIosCreate },
  { field: "updatedAtSort", label: "Updated at", icon: GrDocumentUpdate },
  { field: "price", label: "Price", icon: GiReceiveMoney },
  { field: "quantity", label: "Quantity", icon: FaDatabase },
].map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));
