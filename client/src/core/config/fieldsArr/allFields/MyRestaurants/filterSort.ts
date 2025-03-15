import { BiSolidDish, BiWorld } from "react-icons/bi";
import { genID } from "../../../../../utils/genID";
import {
  MdConnectWithoutContact,
  MdDeliveryDining,
  MdOutlineRateReview,
} from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import {
  FaClock,
  FaDoorClosed,
  FaDoorOpen,
  FaRegStar,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { formatTimeHmMh } from "../../../../../utils/formatTime";
import { myRestaurantsCat, RadioFieldType } from "./makeUpdate";
import { IconType } from "react-icons/lib";
import { GoCodeReview } from "react-icons/go";
import { GiReceiveMoney } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";

export type SorterFieldType = {
  icon: IconType;
  label: string;
  field: string;
  subFields: RadioFieldType[];
};

export const fieldsShowMyRestaurants = (...params) => [
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

export const showMyRestaurantsOpenHours = {
  id: genID(),
  label: "Open Hours",
  icon: FaClock,
};

export const showMyRestaurantsOpenHoursFields = (...params) => [
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

export const showMyRestaurantsDelivery = {
  id: genID(),
  label: "Delivery",
  icon: MdDeliveryDining,
};

export const showMyRestaurantsDeliveryFields = (...params) => [
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

export const managementMyRestaurantsFields = (...params) => [
  {
    id: genID(),
    label: "Dishes",
    icon: BiSolidDish,
    val: params[0],
  },
  {
    id: genID(),
    label: "Orders",
    icon: CiDeliveryTruck,
    val: params[2],
  },
  {
    id: genID(),
    label: "Reviews",
    icon: MdOutlineRateReview,
    val: params[1],
  },
];

const myRestFieldsArr = ["name", "country", "state", "city", "id"];
export const myRestFieldsSearch = myRestFieldsArr.map((el) => ({
  field: el,
  id: genID(),
  label: el[0].toUpperCase() + el.slice(1),
}));

const myRestAdminCategories = myRestaurantsCat.map((el) => ({
  field: el,
  id: genID(),
  label: el === "fast-food" ? "Fast-Food" : el[0].toUpperCase() + el.slice(1),
}));

const priceRangeFieldsArr = ["0-19", "20-39", "40-59", "60-79", "80-100"];
const priceRangeFields = priceRangeFieldsArr.map((el, i, arg) => ({
  field: el,
  id: genID(),
  label: `$${el}${i === arg.length - 1 ? "+" : ""}`,
}));

const ratingRangeFieldsArr = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"];
const ratingRangeFields = ratingRangeFieldsArr.map((el) => ({
  field: el,
  id: genID(),
  label: `⭐ ${el}`,
}));

export const myRestFilters = [
  {
    field: "categories",
    label: "Category",
    subFields: myRestAdminCategories,
    icon: LuChefHat,
  },
  {
    field: "priceRange",
    label: "Avg price dish",
    subFields: priceRangeFields,
    icon: GiReceiveMoney,
  },
  {
    field: "ratingRange",
    label: "Avg rating",
    subFields: ratingRangeFields,
    icon: FaRegStar,
  },
].map((el) => ({ ...el, id: genID() }));

const sortersArr = [
  { field: "rating", label: "Avg rating", icon: FaRegStar },
  { field: "dishes", label: "No. of dishes", icon: IoRestaurant },
  { field: "deliveryTime", label: "Delivery time", icon: MdDeliveryDining },
  { field: "deliveryPrice", label: "Delivery price", icon: MdDeliveryDining },
  { field: "reviews", label: "No. of reviews", icon: GoCodeReview },
  { field: "orders", label: "No. of orders", icon: CiDeliveryTruck },
  { field: "price", label: "Avg price dish", icon: GiReceiveMoney },
];

const fieldsUpAndDown = [
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

export const myRestSorters = sortersArr.map((el) => ({
  ...el,
  id: genID(),
  field: el.field + "Sort",
  subFields: [...fieldsUpAndDown],
}));
