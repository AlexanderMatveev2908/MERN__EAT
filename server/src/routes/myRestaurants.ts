import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { uploadMyRestaurants } from "../middleware/myRestaurants/multer";
import {
  validateFiles,
  validatorMyRestaurants,
} from "../middleware/myRestaurants/validatorMyRestaurants";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { createRestaurant } from "../controllers/myRestaurantsControllers/createRestaurant";

const router = express();

router.post(
  "/",
  verifyAccessToken,
  uploadMyRestaurants,
  validatorMyRestaurants,
  validateFiles,
  asyncWrapper(createRestaurant)
);

export default router;
