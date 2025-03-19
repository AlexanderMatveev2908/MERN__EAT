import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import fs from "fs";
import Key from "../../models/Key.js";
import { uploadCloudStorage } from "../../utils/cloud.js";

export const createDishes = async (req: any, res: Response): Promise<any> => {
  const { userId } = req;
  const { restId } = req.query;
  const form = req.body;
  const files = req.files as Express.Multer.File[];

  // console.log(req.uploadedFiles);
  const arrFiles = Object.entries(files).map(([key, val]) => ({
    [key]: val,
  }));

  const arrReturnedPromises = arrFiles.map(async (dishFiles, i) => {
    const images = await uploadCloudStorage(dishFiles[`images_${i}` as any]);

    return images;
  });

  const dataImages = await Promise.all(arrReturnedPromises);
  // console.log(dataImages);
  // console.log(form);

  return res.status(200).json({ message: "Dish created successfully" });
};
