import express from "express";
import { getUserId } from "../middleware/general/getUserId.js";
import { getRestaurantsSearchAllUsers } from "../controllers/search/get.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import { validatePagination } from "../middleware/general/validatePagination.js";
import { validatorQueryRest } from "../middleware/search/validatorQueryRest.js";

const router = express.Router();

router.get(
  "/",
  validatePagination,
  validatorQueryRest,
  getUserId,
  asyncWrapper(getRestaurantsSearchAllUsers)
);

export default router;
