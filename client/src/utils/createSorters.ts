/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSortAmountUp, FaSortAmountUpAlt } from "react-icons/fa";
import { genID } from "./genID";

export const createSorters = (arr: any) => {
  const sortersObj: any = {};

  for (let i = 0; i < arr.length; i++) {
    sortersObj[arr[i].field] = {
      label: arr[i].field,
      icon: arr[i].icon,
      fields: [
        {
          id: genID(),
          label: arr[i].field,
          field: "asc",
          icon: FaSortAmountUp,
        },
        {
          id: genID(),
          label: arr[i].field,
          field: "desc",
          icon: FaSortAmountUpAlt,
        },
      ],
    };
  }

  console.log(sortersObj);

  return sortersObj;
};
