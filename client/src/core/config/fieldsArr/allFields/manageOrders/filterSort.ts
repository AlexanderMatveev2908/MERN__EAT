import { LuChefHat } from "react-icons/lu";
import { myDishesFieldsNumericSearch } from "../MyDishes/filterSort";
import { genID } from "./../../../../../utils/allUtils/genID";
import { categoriesAppFields, fieldsUpAndDown } from "../filtersSorters";
import { MdDiscount } from "react-icons/md";
import { FaDatabase, FaMoneyBillWave } from "react-icons/fa";
import { BaseFieldType } from "../../typesFields";
import { ordersStatus } from "../MyRestaurants/filterSort";

export const searchFieldsManageOrders = [
  {
    field: "id",
    label: "id",
  },
  {
    field: "restaurantId",
    label: "restaurant id",
  },
  {
    field: "restaurantName",
    label: "restaurant name",
  },
  {
    field: "country",
    label: "country of the restaurant",
  },
  {
    field: "state",
    label: "state of the restaurant",
  },
  {
    field: "city",
    label: "city of the restaurant",
  },
].map((el) => ({
  ...el,
  id: genID(),
}));

export const numericFiltersManageOrders = myDishesFieldsNumericSearch.map(
  (el) => ({
    ...el,
    id: genID(),
  })
);

const ordersFieldsArr: BaseFieldType[] = [...ordersStatus].map((el) => ({
  field: el,
  id: genID(),
  label: el[0].toUpperCase() + el.slice(1),
}));

export const manageOrdersFilters = [
  {
    field: "ordersStatus",
    label: "Orders status",
    subFields: ordersFieldsArr,
    icon: FaDatabase,
  },
  {
    field: "categories",
    label: "Category",
    subFields: [...categoriesAppFields],
    icon: LuChefHat,
  },
].map((el) => ({
  ...el,
  id: genID(),
}));

export const manageOrdersSorters = [
  { field: "createdAtSort", label: "Created at", icon: FaDatabase },
  { field: "updatedAtSort", label: "Updated at", icon: FaDatabase },
  { field: "priceSort", label: "Tot Price order", icon: FaMoneyBillWave },
  { field: "quantitySort", label: "Tot quantity order", icon: FaMoneyBillWave },
  { field: "discountSort", label: "Discount order", icon: MdDiscount },
].map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));

export const defaultValuesManageOrdersSearch = {
  search: "",
  searchVals: ["id"],

  ordersStatus: [],
  categories: [],

  createdAtSort: [],
  updatedAtSort: [],
  priceSort: [],
  quantitySort: [],
  discountSort: [],

  page: "1",
};
