import { check } from "express-validator";
import { REG_SEARCH } from "../../config/constants/regex.js";
import { handleValidator } from "../../utils/handleValidator.js";
export const validatorQueryRest = [
    check().custom((_, { req }) => {
        var _a, _b;
        const q = req.query;
        if (((q === null || q === void 0 ? void 0 : q.search) && !(q === null || q === void 0 ? void 0 : q.searchVals)) || (!(q === null || q === void 0 ? void 0 : q.search) && (q === null || q === void 0 ? void 0 : q.searchVals)))
            throw new Error("Invalid query");
        if (((_b = (_a = q === null || q === void 0 ? void 0 : q.searchVals) === null || _a === void 0 ? void 0 : _a.split(",")) === null || _b === void 0 ? void 0 : _b.length) > 1)
            throw new Error("Invalid query");
        if (!REG_SEARCH.test(q === null || q === void 0 ? void 0 : q.search))
            throw new Error("Invalid query");
        if (Object.entries(q !== null && q !== void 0 ? q : {}).some(([k, v]) => k.includes("Sort") && !["asc", "desc"].includes(v)))
            throw new Error("Invalid query");
        return true;
    }),
    handleValidator(400),
];
