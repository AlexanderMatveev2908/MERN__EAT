import { check } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";
import { validatePagination } from "../general/queriesAndSorters/validatePagination.js";
import { validateSearch } from "../general/queriesAndSorters/validateSearch.js";
import { validateSorters } from "../general/queriesAndSorters/validateSorters.js";
import { ordersStatusArr } from "../../models/Order.js";
export const validateQuery = [
    ...validatePagination,
    ...validateSearch,
    ...validateSorters,
    check("ordersStatus").custom((val, { req }) => {
        if (val)
            if (val.split(",").some((el) => !ordersStatusArr.includes(el)))
                throw new Error("Invalid orders status");
        return true;
    }),
    handleValidator(400),
];
