import { BiSolidDish, BiWorld } from "react-icons/bi";
import { genID } from "../../../../../utils/genID";
import {
  MdConnectWithoutContact,
  MdDeliveryDining,
  MdOutlineRateReview,
} from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { FaClock, FaDoorClosed, FaDoorOpen, FaRegStar } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { formatTimeHmMh } from "../../../../../utils/formatTime";
import { myRestaurantsCat, RadioFieldType } from "./makeUpdate";
import { createSorters } from "../../../../../utils/createSorters";
import { IconType } from "react-icons/lib";
import { GoCodeReview } from "react-icons/go";
import { GiReceiveMoney } from "react-icons/gi";

export type SorterFieldType = {
  icon: IconType;
  label: string;
  field: string;
  fields: RadioFieldType[];
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

export const myRestAdminCategories = myRestaurantsCat.map((el) => ({
  field: el,
  id: genID(),
  label: el === "fast-food" ? "Fast-Food" : el[0].toUpperCase() + el.slice(1),
}));

const priceRangeFieldsArr = ["0-19", "20-39", "40-59", "60-79", "80-100"];

export const priceRangeFields = priceRangeFieldsArr.map((el, i, arg) => ({
  field: el,
  id: genID(),
  label: `$${el}${i === arg.length - 1 ? "+" : ""}`,
}));

const ratingRangeFieldsArr = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"];

export const ratingRangeFields = ratingRangeFieldsArr.map((el) => ({
  field: el,
  id: genID(),
  label: `⭐ ${el}`,
}));

const sorters = [
  { field: "rating", icon: FaRegStar },
  { field: "dishes", icon: IoRestaurant },
  { field: "delivery", icon: MdDeliveryDining },
  { field: "reviews", icon: GoCodeReview },
  { field: "orders", icon: CiDeliveryTruck },
  { field: "price", icon: GiReceiveMoney },
];

export const myRestSorters = createSorters(sorters);
