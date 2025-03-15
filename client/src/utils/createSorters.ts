/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSortAmountUp, FaSortAmountUpAlt } from "react-icons/fa";
import { genID } from "./genID";

export const createSorters = (arr: any) => {
  const sortersObj: any = {};

  for (let i = 0; i < arr.length; i++) {
    sortersObj[arr[i].field] = {
      label: arr[i].field[0].toUpperCase() + arr[i].field.slice(1),
      field: arr[i].field + "Sort",
      icon: arr[i].icon,
      fields: [
        {
          id: genID(),
          field: "asc",
          icon: FaSortAmountUp,
        },
        {
          id: genID(),
          field: "desc",
          icon: FaSortAmountUpAlt,
        },
      ],
    };
  }

  return sortersObj;
};
