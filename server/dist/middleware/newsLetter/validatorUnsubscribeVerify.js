import { body } from "express-validator";
import { REG_TOKEN } from "../../constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorUnsubscribeVerify = [
    body("token").matches(REG_TOKEN).withMessage("Invalid token"),
    body("userId").isMongoId().withMessage("Invalid userId"),
    handleValidator(401),
];
