import { check } from "express-validator";
import { REG_MONGO, REG_SEARCH } from "../../../config/constants/regex.js";
export const validateSearch = [
    check("searchVals").custom((val, { req }) => {
        var _a;
        return (val === null || val === void 0 ? void 0 : val.split(",").length) > 1 || (val && !((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search))
            ? Promise.reject("Bad request")
            : true;
    }),
    check("search").custom((val, { req }) => {
        var _a, _b;
        return !REG_SEARCH.test(val) ||
            (val && !((_a = req.query) === null || _a === void 0 ? void 0 : _a.searchVals)) ||
            (["id", "restaurantId"].includes((_b = req.query) === null || _b === void 0 ? void 0 : _b.searchVals) &&
                !REG_MONGO.test(val))
            ? Promise.reject("Bad request search")
            : true;
    }),
];
