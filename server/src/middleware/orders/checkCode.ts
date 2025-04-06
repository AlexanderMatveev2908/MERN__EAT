import { check } from "express-validator";
import { REG_COUPON } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const checkCode = [
  check("coupon").custom((val, { req }) =>
    val && !REG_COUPON.test(val) ? Promise.reject("Invalid coupon") : true
  ),

  handleValidator(400),
];
