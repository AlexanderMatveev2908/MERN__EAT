import { genID, priceFormatter } from "../../../../../utils/utils";

export const showStatsPriceUser = (...params: number[]) =>
  [
    {
      label: "Avg price",
      field: priceFormatter({ price: params[0] }),
    },
    {
      label: "Dishes count",
      field: params[1],
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
