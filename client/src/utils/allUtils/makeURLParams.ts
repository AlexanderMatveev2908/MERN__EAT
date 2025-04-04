/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REG_MONGO,
  REG_PRICE,
  REG_QTY_SEARCH,
  REG_SEARCH,
} from "../../core/config/constants/regex";
import { SearchMyDishesFormType } from "../../types/allTypes/myDishes";

const genericCheck = (
  pair: [string, any],
  formDataHook: SearchMyDishesFormType
) => {
  if (!pair[1]) return false;

  if (["search", "searchVals"].includes(pair[0])) {
    if (
      !formDataHook.searchVals?.length ||
      !formDataHook.search ||
      !REG_SEARCH.test(formDataHook.search) ||
      (["id", "restaurantId"].includes(formDataHook.searchVals?.[0]) &&
        !REG_MONGO.test(formDataHook.search))
    )
      return false;
  }

  return true;
};

export const createURLParams = (formDataHook) => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formDataHook ?? {})) {
    if (!genericCheck(pair, formDataHook)) continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(","));
    } else {
      params.append(pair[0], pair[1] as string);
    }
  }
  return params;
};

export const createURLParamsMyDishes = (formDataHook) => {
  const params = new URLSearchParams();

  if (!formDataHook) return params;

  for (const pair of Object.entries(formDataHook ?? {})) {
    if (!pair[1]) continue;

    if (!genericCheck(pair, formDataHook)) continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(","));
    } else {
      if (["minPrice", "maxPrice"].includes(pair[0])) {
        if (!REG_PRICE.test((pair[1] as string) ?? "")) continue;

        if (
          formDataHook?.minPrice &&
          formDataHook?.maxPrice &&
          ((pair[0] === "minPrice" && +pair[1] > +formDataHook.maxPrice) ||
            (pair[0] === "maxPrice" && +pair[1] < formDataHook.minPrice))
        )
          continue;
      }
      if (["minQuantity", "maxQuantity"].includes(pair[0])) {
        if (!REG_QTY_SEARCH.test((pair[1] as string) ?? "")) continue;

        if (
          formDataHook?.minQuantity &&
          formDataHook?.maxQuantity &&
          ((pair[0] === "minQuantity" &&
            +pair[1] > +formDataHook.maxQuantity) ||
            (pair[0] === "maxQuantity" && +pair[1] < +formDataHook.minQuantity))
        )
          continue;
      }

      params.append(pair[0], pair[1] as string);
    }
  }
  return params;
};

export const createURLParamsMultipleSearch = (
  formDataHook: any
): URLSearchParams => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formDataHook)) {
    if (!pair[1]) continue;
    if (Array.isArray(pair[1]) && !pair[1].length) continue;
    if (pair[0] === "searchVals") continue;

    if (pair[0] === ("items" as any)) {
      for (const item of pair[1] as any) {
        if (
          item.search &&
          REG_SEARCH.test(item.search) &&
          formDataHook.searchVals?.length
        ) {
          params.append(item.searchVal, item.search);
        }
      }
    } else {
      params.append(pair[0], pair[1] as string);
    }
  }

  return params;
};
