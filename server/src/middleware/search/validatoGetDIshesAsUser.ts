import { handleValidator } from "../../utils/handleValidator.js";
import { checkNumericFields } from "../general/queriesAndSorters/checkNumericFields.js";
import { validatePagination } from "../general/queriesAndSorters/validatePagination.js";
import { validateSorters } from "../general/queriesAndSorters/validateSorters.js";

export const validatorGetDIshesAsUser = [
  ...validatePagination,
  ...checkNumericFields,
  ...validateSorters,

  handleValidator(400),
];
