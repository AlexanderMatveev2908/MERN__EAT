import {
  REG_CITY,
  REG_COUNTRY,
  REG_NAME,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "../../constants/regex";
import { genID } from "../../utils/genID";

export const userProfileFields_0 = [
  {
    id: genID(),
    field: "email",
    label: "Email",
    reg: /^$/,
    msg: "READ ONLY",
  },
  {
    id: genID(),
    field: "firstName",
    label: "First Name",
    reg: REG_NAME,
    msg: "First Name should start with a capital letter and can only contains letters and apostrophe ",
  },
  {
    id: genID(),
    field: "lastName",
    label: "Last Name",
    reg: REG_NAME,
    msg: "Last Name should start with a capital letter and can only contains letters and apostrophe",
  },
];

export const userProfileFields_1 = [
  {
    id: genID(),
    field: "country",
    label: "Country",
    reg: REG_COUNTRY,
    msg: "Country can only contains letters",
  },
  {
    id: genID(),
    field: "state",
    label: "State",
    reg: REG_STATE,
    msg: "State can only contains up to 3 uppercase letters (e.g., SA, NY, CA)",
  },
  {
    id: genID(),
    field: "city",
    label: "City",
    reg: REG_CITY,
    msg: "City can only contains letters and if needed hyphens",
  },
];

export const userProfileFields_2 = [
  {
    id: genID(),
    field: "street",
    label: "Street",
    reg: REG_STREET,
    msg: "Street can only contains letters, numbers, and spaces",
  },
  {
    id: genID(),
    field: "zipCode",
    label: "Zip Code",
    reg: REG_ZIP,
    msg: "Zip Code can only contains numbers, at least 5 up to 10 digits",
  },
  {
    id: genID(),
    field: "phone",
    label: "Phone",
    reg: REG_PHONE,
    msg: "Phone can only contains numbers,and including country up to 15 digits ",
  },
];
