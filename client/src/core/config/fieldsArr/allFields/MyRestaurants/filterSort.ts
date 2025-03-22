import { genID } from "../../../../../utils/allUtils/genID";
import { IoRestaurant } from "react-icons/io5";
import { FaDatabase, FaRegStar } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoCodeReview } from "react-icons/go";
import { GiReceiveMoney } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import {
  BaseFieldType,
  SearchFilterType,
  SorterFieldType,
} from "../../typesFields";
import { IconType } from "react-icons/lib";
import { IoIosCreate } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";
import { FormSearchType } from "../../../../../types/allTypes/restAdmin";
import {
  categoriesAppFields,
  fieldsUpAndDown,
  priceRangeFields,
  ratingRangeFields,
} from "../filtersSorters";

const myRestFieldsArr = ["name", "country", "state", "city", "id"];
export const myRestFieldsSearch: BaseFieldType[] = myRestFieldsArr.map(
  (el) => ({
    field: el,
    id: genID(),
    label: el[0].toUpperCase() + el.slice(1),
  })
);

const ordersFieldsArr: BaseFieldType[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
].map((el) => ({
  field: el,
  id: genID(),
  label: el[0].toUpperCase() + el.slice(1),
}));

const quantityFiltersArr = [
  "0-9",
  "10-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70-79",
  "80-89",
  "90-100",
].map((el, i, arg) => ({
  id: genID(),
  label: i === arg.length - 1 ? `100+` : el,
  field: el,
}));

export const myRestFilters: SearchFilterType[] = [
  {
    field: "ordersStatus",
    label: "Orders status",
    subFields: ordersFieldsArr,
    icon: FaDatabase,
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
    icon: GiReceiveMoney,
  },
  {
    field: "avgQuantityRange",
    label: "Avg quantity dish",
    subFields: quantityFiltersArr,
    icon: FaDatabase,
  },
].map((el) => ({ ...el, id: genID() }));

const sortersArr: (Omit<BaseFieldType, "id"> & { icon: IconType })[] = [
  { field: "createdAtSort", label: "Created at", icon: IoIosCreate },
  { field: "updatedAtSort", label: "Updated at", icon: GrDocumentUpdate },
  { field: "avgRatingSort", label: "Avg rating", icon: FaRegStar },
  {
    field: "pendingOrdersSort",
    label: "Pending orders",
    icon: FaDatabase,
  },
  {
    field: "processingOrdersSort",
    label: "Processing orders",
    icon: FaDatabase,
  },
  {
    field: "shippedOrdersSort",
    label: "Shipped orders",
    icon: FaDatabase,
  },
  {
    field: "deliveredOrdersSort",
    label: "Delivered orders",
    icon: FaDatabase,
  },
  {
    field: "cancelledOrdersSort",
    label: "Cancelled orders",
    icon: FaDatabase,
  },
  { field: "ordersCountSort", label: "No. of orders", icon: CiDeliveryTruck },
  { field: "reviewCountsSort", label: "No. of reviews", icon: GoCodeReview },
  { field: "avgPriceSort", label: "Avg price dish", icon: GiReceiveMoney },
  { field: "avgQuantitySort", label: "Avg quantity dish", icon: FaDatabase },
  { field: "dishesCountSort", label: "No. of dishes", icon: IoRestaurant },
];

export const myRestSorters: SorterFieldType[] = sortersArr.map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown.map((el) => ({ ...el, id: genID() }))],
}));

export const fieldsFormMyRest = [
  ...myRestFilters.map((el) => el.field),
  ...sortersArr.map((el) => el.field),
  "search",
];

export const defaultValuesMyRestSearch: FormSearchType = {
  search: "",
  searchVals: ["name"],
  categories: [],
  ordersStatus: [],
  avgPriceRange: [],
  avgQuantityRange: [],
  avgRatingRange: [],

  avgRatingSort: [],
  reviewsCountSort: [],
  avgPriceSort: [],
  dishesCountSort: [],
  avgQuantitySort: [],
  ordersCountSort: [],
  createdAtSort: [],
  updatedAtSort: [],
  pendingOrdersSort: [],
  processingOrdersSort: [],
  shippedOrdersSort: [],
  deliveredOrdersSort: [],
  cancelledOrdersSort: [],
};
