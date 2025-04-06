import express from "express";
import { getUserId } from "../../middleware/general/getUserId.js";
import {
  getDishesRestaurant,
  getRestaurantAsUser,
  getRestaurantsSearchAllUsers,
} from "../../controllers/search/get.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { validatorQueryRest } from "../../middleware/search/validatorQueryRest.js";
import { checkRestId } from "../../middleware/general/checkRestId.js";
import { validatorGetDIshesAsUser } from "../../middleware/search/validatoGetDIshesAsUser.js";

const router = express.Router();

router.get(
  "/",
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
  getUserId,
  checkRestId,
  validatorGetDIshesAsUser,
  asyncWrapper(getDishesRestaurant)
);

export default router;
