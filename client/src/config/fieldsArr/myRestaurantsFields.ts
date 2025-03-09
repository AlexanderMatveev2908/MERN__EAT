import { REG_RESTAURANT_NAME } from "../../constants/regex";
import { genID } from "../../utils/genID";
import { userProfileFields_1, userProfileFields_2 } from "./userDetailsFields";

export type FieldNoIconType = {
  id: string;
  label: string;
  field: string;
  reg: RegExp;
  msg: string;
  type?: string;
  required?: boolean;
};

export const myRestaurantsName = {
  id: genID(),
  label: "Name",
  field: "name",
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
