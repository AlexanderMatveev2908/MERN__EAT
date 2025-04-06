import { check } from "express-validator";
export const validateSorters = [
    check().custom((_, { req }) => {
        var _a;
        return Object.entries((_a = req === null || req === void 0 ? void 0 : req.query) !== null && _a !== void 0 ? _a : {}).some(([key, val]) => key.includes("Sort") && !["asc", "desc"].includes(val))
            ? Promise.reject("Bad request sort ")
            : true;
    }),
];
