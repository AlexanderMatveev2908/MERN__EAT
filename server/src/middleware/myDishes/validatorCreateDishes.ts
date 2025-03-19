import { check, validationResult } from "express-validator";
import {
  REG_DISH_NAME,
  REG_PRICE,
  REG_QTY,
} from "../../config/constants/regex.js";
import { badRequest } from "../../utils/baseErrResponse.js";
import { NextFunction, Request, Response } from "express";
import fs from "fs";

export const validateFilesStorage = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const totDishes = req.body.dishes.length;

  let len = 0;
  let hasEnoughFiles = true;

  for (const file in req.files) {
    if (!file?.length) hasEnoughFiles = false;
    len++;
  }
  // console.log(len);
  // console.log(hasEnoughFiles);
  // console.log(totDishes);
  if (len !== totDishes || !hasEnoughFiles) return badRequest(res);

  return next();
};

export const validatorCreateDishes = [
  check("restId").isMongoId().withMessage("invalid restaurant"),

  check("dishes").custom((valArr, { req }) => {
    for (const dish of valArr) {
      if (!REG_DISH_NAME.test(dish.name)) throw new Error("invalid dish name");
      if (!REG_PRICE.test(dish.price)) throw new Error("invalid price");
      if (!REG_QTY.test(dish.quantity)) throw new Error("invalid quantity");
    }

    return true;
  }),

  // check("name.*").matches(REG_DISH_NAME).withMessage("invalid dish name"),

  // check("price.*").matches(REG_PRICE).withMessage("invalid price"),

  // check("quantity.*").matches(REG_QTY).withMessage("invalid quantity"),

  (req: any, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    // console.log(errors);

    if (!errors.isEmpty()) {
      for (const file of req.uploadedFiles) {
        fs.unlinkSync(file.path);
      }

      return res
        .status(400)
        .json({ errors: errors.array(), msg: "Bad request" });
    }

    return next();
  },
];
