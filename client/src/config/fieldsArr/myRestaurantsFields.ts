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
