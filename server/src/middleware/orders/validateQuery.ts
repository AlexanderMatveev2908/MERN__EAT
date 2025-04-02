import { handleValidator } from "../../utils/handleValidator.js";
import { validatePagination } from "../general/queriesAndSorters/validatePagination.js";
import { validateSearch } from "../general/queriesAndSorters/validateSearch.js";
import { validateSorters } from "../general/queriesAndSorters/validateSorters.js";

export const validateQuery = [
  ...validateSearch,
  ...validatePagination,
  ...validateSorters,

  handleValidator(400),
];
