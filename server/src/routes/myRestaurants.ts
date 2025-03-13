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
  getMySingleRestaurant,
} from "../controllers/myRestaurantsControllers.js";
import { validatorMySingleRest } from "../middleware/myRestaurants/validatorMySingleRest.js";

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

router.get(
  "/info-restaurant/:restId",
  verifyAccessToken,
  validatorMySingleRest,
  asyncWrapper(getMySingleRestaurant)
);

export default router;
