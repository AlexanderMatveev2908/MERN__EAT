/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiSolidDish, BiWorld } from "react-icons/bi";
import { genID } from "./../../../utils/genID";
import {
  MdConnectWithoutContact,
  MdDeliveryDining,
  MdOutlineRateReview,
} from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { FaClock, FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { formatTimeHmMh } from "../../../utils/formatTime";
import { myRestaurantsCat } from "./makeUpdate";

export type FieldCheckboxSwapType = {
  id: string;
  field: string;
  label: string;
  icon: any;
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

export type FieldQuerySortType = {
  id: string;
  field: string;
  label: string;
};

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

export const myRestAdminNumericFieldsArr = [
  { field: "minRating", label: "Min rating" },
  { field: "maxRating", label: "Max rating" },
  { field: "minPriceRange", label: "Min price" },
  { field: "maxPriceRange", label: "Max price" },
];
