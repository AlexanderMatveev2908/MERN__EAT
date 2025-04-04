import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";

export const getManageOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { limit, skip } = calcPagination(req);
  console.log(req.query);

  return res.status(200).json({ message: "ok", success: true });
};
