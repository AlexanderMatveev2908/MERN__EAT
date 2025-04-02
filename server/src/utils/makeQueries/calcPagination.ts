import { Request } from "express";

export const calcPagination = (req: Request) => {
  const { page: currPage = 1, limit: currLimit = 6 } = req.query;

  const limit = currLimit ? +currLimit : 6;
  const page = currPage ? +currPage : 1;

  // in my middleware i already converted vals to number and i am sure they will be sent or i return 400, i converted and give them fallback again just for tsc complain

  const skip = (+page - 1) * limit;

  return { limit, skip };
};
