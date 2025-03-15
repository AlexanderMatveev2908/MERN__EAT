/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REG_EMAIL,
  REG_EST_TIME,
  REG_OPEN_CLOSE_TIME,
  REG_PHONE,
  REG_PRICE,
  REG_RESTAURANT_NAME,
  REG_WEB_URL,
} from "../../constants/regex";
import { genID } from "../../../utils/genID";
import { userProfileFields_1, userProfileFields_2 } from "../userDetailsFields";
import { IconType } from "react-icons/lib";

export type FieldNoIconType = {
  id: string;
  label: string;
  field: string;
  reg: RegExp;
  msg: string;
  required: boolean;
  type?: string;
  place?: string;
};

export type CheckBoxFieldType = {
  id: string;
  field: string;
  label: string;
};

export type RadioFieldType = CheckBoxFieldType & {
  icon: IconType;
};

export const myRestaurantsName = {
  id: genID(),
  label: "Name",
  field: "name",
  required: true,
  reg: REG_RESTAURANT_NAME,
  msg: "Restaurant name must be between 2 and 50 characters",
};
export const myRestaurantsAddress_0 = [
  ...userProfileFields_1.map((el) => ({ ...el, required: true })),
];
export const myRestaurantsAddress_1 = userProfileFields_2
  .filter((el) => el.field !== "phone")
  .map((el) => ({ ...el, required: true }));

export const myRestaurantsAddressByArea = [
  [...myRestaurantsAddress_0],
  [...myRestaurantsAddress_1],
];

export const totLenAddressMyRestaurants = 2;

export const myRestaurantsContact = [
  {
    id: genID(),
    field: "email",
    label: "Email (if different from personal)",
    place: "Your email address...",
    required: false,
    reg: REG_EMAIL,
    msg: `Email must follow this pattern ${/^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/} 🧐`,
    type: "email",
  },
  {
    id: genID(),
    field: "phone",
    label: "Phone (if different from personal)",
    place: "Your phone number...",
    required: false,
    reg: REG_PHONE,
    msg: "Phone can only contains numbers,and including country prefix up to 15 digits",
  },
  {
    id: genID(),
    field: "website",
    label: "Website (if you have one)",
    place: "Your website url...",
    required: false,
    reg: REG_WEB_URL,
    msg: "A URL can have optionally the protocol, subdomain, must have main domain and eventually path query or fragment",
    type: "url",
  },
];

export const myRestaurantsOpenCloseFields: FieldNoIconType[] = [
  {
    id: genID(),
    field: "openTime",
    label: "Open time",
    place: "Open time (8:00 e.g)",
    reg: REG_OPEN_CLOSE_TIME,
    required: true,
    msg: "Follow format HH:MM",
  },
  {
    id: genID(),
    field: "closeTime",
    label: "Close time",
    place: "Close time (21:00 e.g)",
    reg: REG_OPEN_CLOSE_TIME,
    required: true,
    msg: "Follow the format HH:MM",
  },
];

export const myRestaurantsCat = [
  "italian",
  "chinese",
  "japanese",
  "mexican",
  "indian",
  "french",
  "mediterranean",
  "fast-food",
  "vegetarian",
  "vegan",
  "seafood",
  "steakhouse",
];

export const myRestaurantsCatFields: CheckBoxFieldType[] = myRestaurantsCat.map(
  (el) => ({
    field: el,
    id: genID(),
    label:
      el === "fast-food"
        ? "Fast-Food"
        : el.charAt(0).toUpperCase() + el.slice(1),
  })
);

export const totLenMyRestaurantsCat = Math.ceil(
  myRestaurantsCatFields.length / 6
);

export const arrCatByArea: any[] = [];

for (let i = 0; i < myRestaurantsCatFields?.length - 1; i++) {
  if (i % 6 === 0) {
    arrCatByArea.push([...myRestaurantsCatFields.slice(i, i + 6)]);
  }
}

export const allowedImgs = 5;

export const myRestaurantsDeliveryFields = [
  {
    id: genID(),
    type: "number",
    field: "estTimeDelivery",
    label: "Delivery time",
    msg: "Invalid format, write delivery time in minutes (e.g 20)",
    required: true,
    place: "Delivery time...",
    reg: REG_EST_TIME,
  },
  {
    id: genID(),
    type: "number",
    field: "price",
    label: "Charge for delivery",
    msg: "Delivery charge must be a decimal number with at most 2 decimal places.",
    required: false,
    place: "Leave empty if no charge",
    reg: REG_PRICE,
  },
  {
    id: genID(),
    type: "number",
    field: "freeDeliveryPrice",
    label: "Amount free delivery",
    msg: "The value must be a decimal number with at most 2 decimal places.",
    required: false,
    place: "Leave empty if no amount",
    reg: REG_PRICE,
  },
];
