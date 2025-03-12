import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { uploadMyRestaurants } from "../middleware/myRestaurants/multer";
import {
  validateFiles,
  validatorMyRestaurants,
} from "../middleware/myRestaurants/validatorMyRestaurants";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  createRestaurant,
  getMyRestaurants,
} from "../controllers/myRestaurantsControllers";

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
