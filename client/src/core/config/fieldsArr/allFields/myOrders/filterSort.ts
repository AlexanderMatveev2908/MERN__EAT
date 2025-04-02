import { FaDatabase, FaMoneyBillWave } from "react-icons/fa";
import { genID } from "../../../../../utils/utils";
import { searchRest } from "../SearchRestAllUsers/filterSorter";
import { BaseFieldType, SorterFieldType } from "../../typesFields";
import { ordersStatus } from "../MyRestaurants/filterSort";
import { MdDiscount } from "react-icons/md";
import { fieldsUpAndDown } from "../filtersSorters";

export const searchFieldsMyOrders = [...searchRest, "id"].map((el) => ({
  field: el,
  label: el.at(0)?.toUpperCase() + el.slice(1),
  id: genID(),
}));

const ordersFieldsArr: BaseFieldType[] = [...ordersStatus].map((el) => ({
  field: el,
  id: genID(),
  label: el[0].toUpperCase() + el.slice(1),
}));

export const myOrdersFilters = [
  {
    field: "ordersStatus",
    label: "Orders status",
    subFields: ordersFieldsArr,
    icon: FaDatabase,
    id: genID(),
  },
];

export const myOrdersSortSub = [
  { field: "createdAtSort", label: "Created at", icon: FaDatabase },
  { field: "updatedAtSort", label: "Updated at", icon: FaDatabase },

  { field: "priceSort", label: "Tot Price order", icon: FaMoneyBillWave },
  { field: "discountOrder", label: "Discount order", icon: MdDiscount },
];

export const myOrdersSorters: SorterFieldType[] = myOrdersSortSub.map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));

export const defaultValsSearchMyOrders = {
  search: "",
  searchVals: ["name"],

  ordersStatus: [],

  createdAtSort: [],
  updatedAtSort: [],
  priceSort: [],
  discountOrder: [],
  quantitySort: [],

  page: "1",
};
