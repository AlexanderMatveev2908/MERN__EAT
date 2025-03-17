import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
export const validateGetMyRestParams = [
    check("searchVals").custom((val, { req }) => {
        var _a;
        return (val === null || val === void 0 ? void 0 : val.split(",").length) > 1 || (val && !((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search))
            ? Promise.reject("Bad request")
            : true;
    }),
    check("search").custom((val, { req }) => { var _a; return val && !((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.searchVals) ? Promise.reject("Bad request") : true; }),
    check().custom((_, { req }) => {
        var _a;
        if (Object.entries((_a = req === null || req === void 0 ? void 0 : req.query) !== null && _a !== void 0 ? _a : {}).some(([key, val]) => key.includes("Sort") && !["asc", "desc"].includes(val)))
            throw new Error("Bad request");
        return true;
    }),
    handleValidator(400),
];
