import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";

export const deletePendingOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
};
