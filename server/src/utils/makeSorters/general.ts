import { Request } from "express";

export const makeSorters = (req: Request, target: string) => {
  const sorters = Object.entries(req.query ?? {})
    .filter(([key, _]) => key.includes("Sort"))
    .map(([key, val]) => ({
      key: key.replace("Sort", ""),
      val,
    }));

  if (!sorters?.length) return null;

  const sorter: any = {};

  for (const sort of sorters) {
    sorter[`${target}${sort.key}`] = sort.val === "asc" ? 1 : -1;
  }

  return Object.keys(sorter).length ? sorter : null;
};
