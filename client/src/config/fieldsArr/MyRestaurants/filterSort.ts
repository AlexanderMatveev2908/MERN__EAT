/* eslint-disable @typescript-eslint/no-explicit-any */
import { genID } from "./../../../utils/genID";

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
    obj: params[0],
  },
  {
    id: genID(),
    label: "Contact",
    obj: params[1],
  },
];
