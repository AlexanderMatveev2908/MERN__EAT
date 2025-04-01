import { RequestWithUserId } from "./../../middleware/general/verifyAccessToken.js";
import { Response } from "express";
export const lastCheckOrder = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
};
