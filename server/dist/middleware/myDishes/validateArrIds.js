import { check } from "express-validator";
import { REG_MONGO } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validateArrIds = [
    check().custom((_, { req }) => {
        return true;
    }),
    check("ids")
        .isArray()
        .withMessage("Ids must be an array")
        .notEmpty()
        .withMessage("Ids must not be empty")
        .custom((val, { req }) => (val === null || val === void 0 ? void 0 : val.length) && val.every((el) => REG_MONGO.test(el))
        ? true
        : Promise.reject("Invalid ids")),
    handleValidator(400),
];
