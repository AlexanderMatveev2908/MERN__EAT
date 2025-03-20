import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
import { REG_MONGO, REG_SEARCH } from "../../config/constants/regex.js";
export const validateGetMyRestParams = [
    check().custom((_, { req }) => {
        // console.log(req.query);
        return true;
    }),
    check("searchVals").custom((val, { req }) => {
        var _a;
        return (val === null || val === void 0 ? void 0 : val.split(",").length) > 1 || (val && !((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search))
            ? Promise.reject("Bad request")
            : true;
    }),
    check("search").custom((val, { req }) => {
        var _a, _b;
        return !REG_SEARCH.test(val) ||
            (val && !((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.searchVals)) ||
            (((_b = req.query) === null || _b === void 0 ? void 0 : _b.searchVals) === "id" && !REG_MONGO.test(val))
            ? Promise.reject("Bad request")
            : true;
    }),
    check().custom((_, { req }) => {
        var _a;
        if (Object.entries((_a = req === null || req === void 0 ? void 0 : req.query) !== null && _a !== void 0 ? _a : {}).some(([key, val]) => key.includes("Sort") && !["asc", "desc"].includes(val)))
            throw new Error("Bad request");
        return true;
    }),
    handleValidator(400),
];
