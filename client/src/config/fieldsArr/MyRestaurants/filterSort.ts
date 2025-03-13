/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiWorld } from "react-icons/bi";
import { genID } from "./../../../utils/genID";
import { MdConnectWithoutContact } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";

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

export const fieldsShowMyRestaurantsOpenHours = [
  {
    id: genID(),
    field: "openHours",
    icon: FaDoorOpen,
  },
  {
    id: genID(),
    field: "closeHours",
    icon: FaDoorClosed,
  },
];
