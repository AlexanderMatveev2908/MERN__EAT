import { check, validationResult } from "express-validator";
import { REG_DISH_NAME, REG_PRICE, REG_QTY, } from "../../config/constants/regex.js";
import { badRequest } from "../../utils/baseErrResponse.js";
import fs from "fs";
export const validateFilesStorage = (req, res, next) => {
    const totDishes = req.body.dishes.length;
    let len = 0;
    let hasEnoughFiles = true;
    for (const file in req.files) {
        if (!(file === null || file === void 0 ? void 0 : file.length))
            hasEnoughFiles = false;
        len++;
    }
    if (len !== totDishes || !hasEnoughFiles)
        return badRequest(res);
    return next();
};
export const validatorCreateDishes = [
    check("restId").isMongoId().withMessage("invalid restaurant"),
    check("dishes").custom((valArr, { req }) => {
        for (const dish of valArr) {
            if (!REG_DISH_NAME.test(dish.name))
                throw new Error("invalid dish name");
            if (!REG_PRICE.test(dish.price) && +dish.price > 0.01)
                throw new Error("invalid price");
            if (!REG_QTY.test(dish.quantity))
                throw new Error("invalid quantity");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            for (const file of req.uploadedFiles) {
                if (fs.existsSync(file.path))
                    fs.unlinkSync(file.path);
            }
            return res
                .status(400)
                .json({ errors: errors.array(), msg: "Bad request" });
        }
        return next();
    },
];
