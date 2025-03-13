import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { uploadMyRestaurants } from "../middleware/myRestaurants/multer.js";
import {
  validateFiles,
  validatorMyRestaurants,
} from "../middleware/myRestaurants/validatorMyRestaurants.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import {
  createRestaurant,
  getMyRestaurants,
} from "../controllers/myRestaurantsControllers.js";

const router = express();

router
  .route("/")
  .post(
    verifyAccessToken,
    uploadMyRestaurants,
    validatorMyRestaurants,
    validateFiles,
    asyncWrapper(createRestaurant)
  )
  .get(verifyAccessToken, asyncWrapper(getMyRestaurants));

export default router;
