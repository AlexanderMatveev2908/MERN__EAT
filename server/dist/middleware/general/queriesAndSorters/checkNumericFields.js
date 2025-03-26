import { check } from "express-validator";
import { REG_PRICE, REG_QTY } from "../../../config/constants/regex.js";
export const checkNumericFields = [
    check().custom((_, { req }) => {
        var _a;
        return Object.entries((_a = req === null || req === void 0 ? void 0 : req.query) !== null && _a !== void 0 ? _a : {}).some(([key, val]) => (["minPrice", "maxPrice"].includes(key) && !REG_PRICE.test(val)) ||
            (["minQUantity", "maxQuantity"].includes(key) && !REG_QTY.test(val)) ||
            (["minPrice", "maxPrice", "minQuantity", "maxQuantity"].includes(key) &&
                isNaN(+val)))
            ? Promise.reject("Bad request sort / numeric")
            : true;
    }),
    check("minPrice").custom((val, { req }) => {
        var _a, _b;
        return ((_a = req.query) === null || _a === void 0 ? void 0 : _a.maxPrice) && +val > +((_b = req.query) === null || _b === void 0 ? void 0 : _b.maxPrice)
            ? Promise.reject("Bad request minPrice")
            : true;
    }),
    check("maxPrice").custom((val, { req }) => {
        var _a, _b;
        return ((_a = req.query) === null || _a === void 0 ? void 0 : _a.minPrice) && +val < +((_b = req.query) === null || _b === void 0 ? void 0 : _b.minPrice)
            ? Promise.reject("Bad request maxPrice")
            : true;
    }),
    check("minQuantity").custom((val, { req }) => {
        var _a, _b;
        return ((_a = req.query) === null || _a === void 0 ? void 0 : _a.maxQuantity) && +val > +((_b = req.query) === null || _b === void 0 ? void 0 : _b.maxQuantity)
            ? Promise.reject("Bad request minQuantity")
            : true;
    }),
    check("maxQuantity").custom((val, { req }) => {
        var _a, _b;
        return ((_a = req.query) === null || _a === void 0 ? void 0 : _a.minQuantity) && +val < +((_b = req.query) === null || _b === void 0 ? void 0 : _b.minQuantity)
            ? Promise.reject("Bad request maxQuantity")
            : true;
    }),
];
