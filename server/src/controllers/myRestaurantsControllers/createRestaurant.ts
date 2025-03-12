import { Response } from "express";
import { RequestWithUserId } from "./../../middleware/general/verifyAccessToken";
import { uploadCloud } from "../../utils/cloud";
import { formatMyRestaurantsBody } from "../../utils/getValsMyRestaurantFromBody";
import Restaurant from "../../models/Restaurant";

export const createRestaurant = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const arrImages = await uploadCloud(req.files as Express.Multer.File[]);

  const newRestaurant = await Restaurant.create({
    ...formatMyRestaurantsBody(req),
    images: arrImages,
  });

  return res.status(201).json({ success: true, restId: newRestaurant._id });
};
