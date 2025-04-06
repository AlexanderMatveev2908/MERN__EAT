import { check } from "express-validator";
import { checkNumericFields } from "../general/queriesAndSorters/checkNumericFields.js";
import { validatePagination } from "../general/queriesAndSorters/validatePagination.js";
import { validateSearch } from "../general/queriesAndSorters/validateSearch.js";
import { validateSorters } from "../general/queriesAndSorters/validateSorters.js";
import { ordersStatusArr } from "../../models/Order.js";
import { handleValidator } from "../../utils/handleValidator.js";

export const validateQueryMangeOrders = [
  ...validatePagination,
  ...validateSearch,
  ...checkNumericFields,
  ...validateSorters,

  check("ordersStatus").custom((val, { req }) => {
    if (val)
      if (val.split(",").some((el: string) => !ordersStatusArr.includes(el)))
        throw new Error("Invalid orders status");

    return true;
  }),

  handleValidator(400),
];
