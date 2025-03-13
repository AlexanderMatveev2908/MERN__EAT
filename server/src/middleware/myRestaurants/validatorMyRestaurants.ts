import { body } from "express-validator";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_EMAIL,
  REG_PHONE,
  REG_PRICE,
  REG_RESTAURANT_NAME,
  REG_STATE,
  REG_STREET,
  REG_WEB_URL,
  REG_ZIP,
} from "../../constants/regex.js";
import { NextFunction, Request, Response } from "express";
import { badRequest } from "../../utils/baseErrResponse.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateFiles = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.files) return badRequest(res);

  return next();
};

export const validatorMyRestaurants = [
  body("name").matches(REG_RESTAURANT_NAME).withMessage("Invalid name format"),

  body("country").matches(REG_COUNTRY).withMessage("Invalid country format"),
  body("state").matches(REG_STATE).withMessage("Invalid state format"),
  body("city").matches(REG_CITY).withMessage("Invalid city format"),
  body("street").matches(REG_STREET).withMessage("Invalid street format"),
  body("zipCode").matches(REG_ZIP).withMessage("Invalid zip code format"),

  body("phone")
    .optional()
    .matches(REG_PHONE)
    .withMessage("Invalid phone format"),
  body("email")
    .optional()
    .matches(REG_EMAIL)
    .withMessage("Invalid email format"),
  body("website")
    .optional()
    .matches(REG_WEB_URL)
    .withMessage("Invalid website format"),

  body("openTime")
    .toInt()
    .isInt({ min: 0, max: 1439 })
    .withMessage("Invalid open time format"),
  body("closeTime")
    .toInt()
    .isInt({ min: 0, max: 1439 })
    .withMessage("Invalid close time format"),

  body("categories")
    .isArray({ min: 1, max: 3 })
    .withMessage("Invalid categories format"),

  body("estTimeDelivery").custom((val, { req }) => {
    const diff = +req.body.closeTime - +req.body.openTime;

    if (diff > 0 && diff < +val)
      throw new Error("Invalid est time delivery format");

    return true;
  }),

  body("price")
    .optional()
    .matches(REG_PRICE)
    .withMessage("Invalid price format"),

  body("freeDeliveryPrice")
    .optional()
    .custom((val, { req }) => {
      if (!req.body.price && val)
        throw new Error("Not possible make free something that already is");

      return true;
    }),

  handleValidator(400),
];
