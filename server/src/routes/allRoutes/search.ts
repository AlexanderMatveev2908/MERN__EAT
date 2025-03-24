import express from "express";
import { getUserId } from "../../middleware/general/getUserId.js";
import {
  getDishesRestaurant,
  getRestaurantAsUser,
  getRestaurantsSearchAllUsers,
} from "../../controllers/search/get.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { validatePagination } from "../../middleware/general/validatePagination.js";
import { validatorQueryRest } from "../../middleware/search/validatorQueryRest.js";
import { checkRestId } from "../../middleware/general/checkRestId.js";
import { checkNumericFields } from "../../middleware/general/checkNumericFields.js";

const router = express.Router();

router.get(
  "/",
  validatePagination,
  validatorQueryRest,
  getUserId,
  asyncWrapper(getRestaurantsSearchAllUsers)
);
router.get(
  "/:restId",
  checkRestId,
  getUserId,
  asyncWrapper(getRestaurantAsUser)
);

router.get(
  "/dishes/:restId",
  checkRestId,
  checkNumericFields,
  getUserId,
  asyncWrapper(getDishesRestaurant)
);

export default router;
