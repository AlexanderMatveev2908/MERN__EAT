/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { genID } from "./genID";

export const createSorters = (arr: any) => {
  const sortersObj: any = {};

  for (let i = 0; i < arr.length; i++) {
    sortersObj[arr[i].field] = {
      label: arr[i]?.label,
      field: arr[i].field + "Sort",
      icon: arr[i].icon,
      subFields: [
        {
          id: genID(),
          field: "asc",
          icon: FaSortAmountUp,
        },
        {
          id: genID(),
          field: "desc",
          icon: FaSortAmountDown,
        },
      ],
    };
  }

  return sortersObj;
};
