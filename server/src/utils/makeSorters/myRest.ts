import { Request } from "express";

export const makeSortersMyRest = (req: Request) => {
  const sorters = Object.entries(req.query ?? {})
    .filter(([key, _]) => key.includes("Sort"))
    .map(([key, val]) => ({
      key: key.replace("Sort", ""),
      val,
    }));

  if (!sorters?.length) return null;

  const sorter: any = {};

  for (const sort of sorters) {
    sorter[`restaurants.${sort.key}`] = sort.val === "asc" ? 1 : -1;
  }

  return Object.keys(sorter ?? {}).length ? sorter : null;
};
