/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import {
  REG_EMAIL,
  REG_PHONE,
  REG_RESTAURANT_NAME,
  REG_WEB_URL,
} from "../../constants/regex";
import { genID } from "../../utils/genID";
import { userProfileFields_1, userProfileFields_2 } from "./userDetailsFields";

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

export type OpenCLoseFormType = {
  id: string;
  field: string;
  label: string;
  minVal: number;
  maxVal: number;
  icon: any;
};

export const myRestaurantsOpenCloseFields: OpenCLoseFormType[] = [
  {
    id: genID(),
    field: "openTime",
    label: "Open time",
    minVal: 0,
    maxVal: 1439,
    icon: FaDoorOpen,
  },
  {
    id: genID(),
    field: "closeTime",
    label: "Close time",
    minVal: 0,
    maxVal: 1439,
    icon: FaDoorClosed,
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

export type CatFormType = {
  id: string;
  field: string;
  label: string;
};

export const myRestaurantsCatFields: CatFormType[] = myRestaurantsCat.map(
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
