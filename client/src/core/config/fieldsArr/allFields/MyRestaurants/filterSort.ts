import { BiSolidDish, BiWorld } from "react-icons/bi";
import { genID } from "../../../../../utils/allUtils/genID";
import {
  MdConnectWithoutContact,
  MdDeliveryDining,
  MdOutlineRateReview,
} from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import {
  FaClock,
  FaDatabase,
  FaDoorClosed,
  FaDoorOpen,
  FaRegStar,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { myRestaurantsCat } from "./makeUpdate";
import { GoCodeReview } from "react-icons/go";
import { GiReceiveMoney } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import { formatTimeHmMh } from "../../../../../utils/utils";
import {
  BaseFieldShowIcon,
  BaseFieldShowType,
  BaseFieldType,
  RadioFieldType,
  SearchFilterType,
  ShowCardMyRestArrValsIcon,
  ShowCardMyRestType,
  ShowCardMyRestTypeIcon,
  SorterFieldType,
} from "../../typesFields";
import { IconType } from "react-icons/lib";
import { IoIosCreate } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";
import { processRatingBackend } from "../../../../../utils/allUtils/conditionalStyleLocation";

export const fieldsShowMyRestaurants = (
  ...params: string[][]
): ShowCardMyRestArrValsIcon[] => [
  {
    id: genID(),
    label: "Location",
    vals: params[0],
    icon: BiWorld,
  },
  {
    id: genID(),
    label: "Contact",
    vals: params[1],
    icon: MdConnectWithoutContact,
  },
  {
    id: genID(),
    label: "Categories",
    vals: params[2],
    icon: IoRestaurant,
  },
];

export const showMyRestaurantsOpenHours: BaseFieldShowIcon = {
  id: genID(),
  label: "Open Hours",
  icon: FaClock,
};

export const showMyRestaurantsOpenHoursFields = (
  ...params: number[]
): ShowCardMyRestTypeIcon[] => [
  {
    id: genID(),
    icon: FaDoorOpen,
    val: formatTimeHmMh(params[0]),
  },
  {
    id: genID(),
    icon: FaDoorClosed,
    val: formatTimeHmMh(params[1]),
  },
];

export const showMyRestaurantsDelivery: BaseFieldShowIcon = {
  id: genID(),
  label: "Delivery",
  icon: MdDeliveryDining,
};

export const showMyRestaurantsDeliveryFields = (
  ...params: number[]
): ShowCardMyRestType[] => [
  {
    id: genID(),
    label: "Delivery time",
    val: params[0],
  },
  {
    id: genID(),
    label: "Price",
    val: params[1],
  },
  {
    id: genID(),
    label: "Free meal",
    val: params[2],
  },
];

export const makeSubFieldsOrders = (
  ...params: number[]
): (BaseFieldShowType & { val: number })[] =>
  ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
    (el, i) => ({
      id: genID(),
      label: el,
      val: params[i],
    })
  );

export const showFieldOrders: BaseFieldShowIcon = {
  id: genID(),
  icon: CiDeliveryTruck,
  label: "Orders",
};

export const showFieldReviews: BaseFieldShowIcon = {
  id: genID(),
  label: "Reviews",
  icon: MdOutlineRateReview,
};

export const makeSubFieldsReviews = (
  ...params: number[]
): {
  id: string;
  val: number;
  stars: IconType[];
}[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: genID(),
    val: params[i],
    stars: processRatingBackend(i + 1),
  }));

export const showFieldDishes: BaseFieldShowIcon = {
  id: genID(),
  label: "Dishes",
  icon: BiSolidDish,
};

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
    label: "Orders state",
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

export const fieldsFormMyRest = [
  ...myRestFilters.map((el) => el.field),
  ...sortersArr.map((el) => el.field),
  "search",
];

const fieldsUpAndDown: RadioFieldType[] = [
  {
    id: genID(),
    field: "asc",
    icon: FaSortAmountUp,
  },
  {
    id: genID(),
    field: "desc",
    icon: FaSortAmountDown,
  },
];

export const myRestSorters: SorterFieldType[] = sortersArr.map((el) => ({
  ...el,
  id: genID(),
  subFields: [...fieldsUpAndDown],
}));
