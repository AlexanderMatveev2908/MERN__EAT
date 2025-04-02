import { Request, Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";

export const getOrders = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  console.log(req.query);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
  });
};
