import { body, check } from "express-validator";
import { REG_CITY, REG_COUNTRY, REG_EMAIL, REG_EST_TIME, REG_PHONE, REG_PRICE, REG_RESTAURANT_NAME, REG_STATE, REG_STREET, REG_WEB_URL, REG_ZIP, } from "../../config/constants/regex.js";
import { badRequest } from "../../utils/baseErrResponse.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validateFiles = (req, res, next) => {
    if (!req.files)
        return badRequest(res);
    return next();
};
export const validateImagesUploaded = [
    check("restaurantImages").custom((val, { req }) => {
        var _a;
        const imagesUploaded = JSON.parse((_a = req.body.restaurantImages) !== null && _a !== void 0 ? _a : "[]");
        if ((!(imagesUploaded === null || imagesUploaded === void 0 ? void 0 : imagesUploaded.length) || !Array.isArray(imagesUploaded)) &&
            !req.files)
            throw new Error("No images uploaded");
        return true;
    }),
    handleValidator(400),
];
export const validatorMyRestaurants = [
    body("name").matches(REG_RESTAURANT_NAME).withMessage("Invalid name format"),
    body("country").matches(REG_COUNTRY).withMessage("Invalid country format"),
    body("state").matches(REG_STATE).withMessage("Invalid state format"),
    body("city").matches(REG_CITY).withMessage("Invalid city format"),
    body("street").matches(REG_STREET).withMessage("Invalid street format"),
    body("zipCode").matches(REG_ZIP).withMessage("Invalid zip code format"),
    body("phone").custom((val) => !val || REG_PHONE.test(val) ? true : Promise.reject("Invalid phone format")),
    body("email").custom((val) => !val || REG_EMAIL.test(val) ? true : Promise.reject("Invalid email format")),
    body("website").custom((val) => !val || REG_WEB_URL.test(val) ? true : Promise.reject("Invalid format url")),
    body("openTime")
        .toInt()
        .isInt({ min: 0, max: 1439 })
        .withMessage("Invalid open time format")
        .custom((val, { req }) => {
        const diff = (+req.body.closeTime - val) / 60;
        if (diff > 0 && diff < 4)
            throw new Error("Invalid close time");
        return true;
    }),
    body("closeTime")
        .toInt()
        .isInt({ min: 0, max: 1439 })
        .withMessage("Invalid close time format")
        .custom((val, { req }) => {
        const diff = (val - +req.body.openTime) / 60;
        if (diff > 0 && diff < 4)
            throw new Error("Invalid open time");
        return true;
    }),
    body("categories").custom((val, { req }) => {
        if (!val || (Array.isArray(val) && val.length > 3))
            throw new Error("Invalid categories format");
        return true;
    }),
    body("estTimeDelivery").custom((val, { req }) => {
        const diff = +req.body.closeTime - +req.body.openTime;
        if (diff > 0 && diff < +val)
            throw new Error("Invalid est time delivery request");
        if (!REG_EST_TIME.test(val))
            throw new Error("Invalid est time delivery format");
        return true;
    }),
    body("price").custom((val) => !val || REG_PRICE.test(val) ? true : Promise.reject("Invalid price format")),
    body("freeDeliveryPrice")
        .optional()
        .custom((val, { req }) => {
        if (!req.body.price && val)
            throw new Error("Not possible make free something that already is");
        if (!REG_PRICE.test(val))
            throw new Error("Invalid free delivery price format");
        return true;
    }),
    check().custom((_, { req }) => {
        return true;
    }),
    handleValidator(400),
];
