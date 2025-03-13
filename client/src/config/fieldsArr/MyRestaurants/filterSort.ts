/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiWorld } from "react-icons/bi";
import { genID } from "./../../../utils/genID";
import { MdConnectWithoutContact, MdDeliveryDining } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { FaClock, FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { formatTimeRangeHhMm } from "../../../utils/formatTime";

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
    val: formatTimeRangeHhMm(params[0]),
  },
  {
    id: genID(),
    icon: FaDoorClosed,
    val: formatTimeRangeHhMm(params[1]),
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
