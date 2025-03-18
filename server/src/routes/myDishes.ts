import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import { getRestaurantIds } from "../controllers/MyDishesControllers/get.js";

const router = express();

router.get(
  "/restaurant-ids",
  verifyAccessToken,
  asyncWrapper(getRestaurantIds)
);

export default router;
