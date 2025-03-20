import { REG_PRICE, REG_QTY } from "../../core/config/constants/regex";

export const createURLParams = (formDataHook) => {
  const params = new URLSearchParams();

  for (const pair of Object.entries(formDataHook ?? {})) {
    if (!pair[1]) continue;

    if (pair[0] === "search" && !formDataHook.searchVals?.length) continue;
    if (pair[0] === "searchVals" && !formDataHook.search) continue;

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

    if (
      (pair[0] === "search" && !formDataHook.searchVals?.length) ||
      (pair[0] === "searchVals" && !formDataHook.search)
    )
      continue;

    if (Array.isArray(pair[1])) {
      if (pair[1]?.length) params.append(pair[0], pair[1].join(", "));
    } else {
      if (
        [formDataHook.minPrice, formDataHook.maxPrice].every((el) => el !== "")
      ) {
        if (
          (pair[0] === "minPrice" && +pair[1] > +formDataHook.maxPrice) ||
          (pair[0] === "maxPrice" && +pair[1] < formDataHook.minPrice)
        )
          continue;
      }
      if (
        [formDataHook.minQuantity, formDataHook.maxQuantity].every(
          (el) => el !== ""
        )
      ) {
        if (
          (pair[0] === "minQuantity" && +pair[1] > +formDataHook.maxQuantity) ||
          (pair[0] === "maxQuantity" && +pair[1] < +formDataHook.minQuantity)
        )
          continue;
      }

      if (
        (["minPrice", "maxPrice"].includes(pair[0]) &&
          !REG_PRICE.test(pair[1] as string)) ||
        (["minQuantity", "maxQuantity"].includes(pair[0]) &&
          !REG_QTY.test(pair[1] as string))
      )
        continue;

      params.append(pair[0], pair[1] as string);
    }
  }
  return params;
};
