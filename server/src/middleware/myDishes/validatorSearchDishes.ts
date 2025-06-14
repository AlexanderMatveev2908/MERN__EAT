import { handleValidator } from "../../utils/handleValidator.js";
import { checkNumericFields } from "../general/queriesAndSorters/checkNumericFields.js";
import { validatePagination } from "../general/queriesAndSorters/validatePagination.js";

import { validateSearch } from "../general/queriesAndSorters/validateSearch.js";
import { validateSorters } from "../general/queriesAndSorters/validateSorters.js";

export const validatorSearchDishes = [
  ...validateSearch,
  ...validatePagination,
  ...checkNumericFields,
  ...validateSorters,
  handleValidator(400),
];
