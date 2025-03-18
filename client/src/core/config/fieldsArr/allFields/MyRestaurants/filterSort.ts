import { genID } from "../../../../../utils/allUtils/genID";
import { IoRestaurant } from "react-icons/io5";
import {
  FaDatabase,
  FaRegStar,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { myRestaurantsCat } from "./makeUpdate";
import { GoCodeReview } from "react-icons/go";
import { GiReceiveMoney } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import {
  BaseFieldType,
  RadioFieldType,
  SearchFilterType,
  SorterFieldType,
} from "../../typesFields";
import { IconType } from "react-icons/lib";
import { IoIosCreate } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";

const myRestFieldsArr = ["name", "country", "state", "city", "id"];
export const myRestFieldsSearch: BaseFieldType[] = myRestFieldsArr.map(
  (el) => ({
    field: el,
    id: genID(),
    label: el[0].toUpperCase() + el.slice(1),
  })
);

const myRestAdminCategories: BaseFieldType[] = myRestaurantsCat.map((el) => ({
  field: el,
  id: genID(),
  label: el === "fast-food" ? "Fast-Food" : el[0].toUpperCase() + el.slice(1),
}));

const priceRangeFieldsArr = ["0-19", "20-39", "40-59", "60-79", "80-100"];
const priceRangeFields: BaseFieldType[] = priceRangeFieldsArr.map(
  (el, i, arg) => ({
    field: el,
    id: genID(),
    label: `$${el}${i === arg.length - 1 ? "+" : ""}`,
  })
);

const ratingRangeFieldsArr = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"];
const ratingRangeFields: BaseFieldType[] = ratingRangeFieldsArr.map((el) => ({
  field: el,
  id: genID(),
  label: `⭐ ${el}`,
}));

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
    subFields: ratingRangeFields,
    icon: FaRegStar,
  },
  {
    field: "categories",
    label: "Category",
    subFields: myRestAdminCategories,
    icon: LuChefHat,
  },
  {
    field: "avgPriceRange",
    label: "Avg price dish",
    subFields: priceRangeFields,
    icon: GiReceiveMoney,
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
  { field: "dishesCountSort", label: "No. of dishes", icon: IoRestaurant },
  // { field: "deliveryTimeSort", label: "Delivery time", icon: MdDeliveryDining },
  // {
  //   field: "deliveryPriceSort",
  //   label: "Delivery price",
  //   icon: MdDeliveryDining,
  // },
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
