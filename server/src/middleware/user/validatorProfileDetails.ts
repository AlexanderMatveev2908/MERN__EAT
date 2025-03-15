import { body } from "express-validator";
import {
  REG_CITY,
  REG_COUNTRY,
  REG_NAME,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validatorProfileDetails = [
  body("firstName").matches(REG_NAME).withMessage("invalid first name"),
  body("lastName").matches(REG_NAME).withMessage("invalid last name"),

  body("country").matches(REG_COUNTRY).withMessage("invalid country"),
  body("state").matches(REG_STATE).withMessage("invalid state"),
  body("city").matches(REG_CITY).withMessage("invalid city"),

  body("street").matches(REG_STREET).withMessage("invalid street"),
  body("zipCode").matches(REG_ZIP).withMessage("invalid zip"),
  body("phone").matches(REG_PHONE).withMessage("invalid phone"),

  handleValidator(400),
];
