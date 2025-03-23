import { check } from "express-validator";
import { REG_DISH_NAME } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorUpdateDish = [
    check("dishId").isMongoId().withMessage("invalid dish id"),
    check().custom((_, { req }) => {
        return true;
    }),
    check("name").matches(REG_DISH_NAME).withMessage("invalid dish name"),
    check("price").toFloat().isFloat({ min: 0.01 }).withMessage("invalid price"),
    check("quantity").toInt().isInt().withMessage("invalid quantity"),
    check().custom((_, { req }) => {
        var _a, _b;
        return !JSON.parse(((_a = req.body) === null || _a === void 0 ? void 0 : _a.images) || "[]").length && !((_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.length)
            ? Promise.reject("Invalid images")
            : true;
    }),
    handleValidator(400),
];
