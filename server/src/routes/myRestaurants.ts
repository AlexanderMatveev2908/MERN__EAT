import express from "express";
import { uploadMyRestaurants } from "../middleware/myRestaurants/multer.js";
import {
  validateFiles,
  validateImagesUploaded,
  validatorMyRestaurants,
} from "../middleware/myRestaurants/validatorMyRestaurants.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import {
  getMyRestaurants,
  getMySingleRestaurant,
  getMySingleRestaurantInfoToUpdate,
} from "../controllers/myRestaurants/get.js";
import { validatorMySingleRest } from "../middleware/myRestaurants/validatorMySingleRest.js";
import {
  createRestaurant,
  deleteRestaurant,
  updateMyRestaurant,
} from "../controllers/myRestaurants/makeUpdateDelete.js";
import { validateGetMyRestParams } from "../middleware/myRestaurants/validateGetMyRestParams.js";
import { validatePagination } from "../middleware/general/validatePagination.js";

const router = express();

router
  .route("/")
  .post(
    uploadMyRestaurants,
    validatorMyRestaurants,
    validateFiles,
    asyncWrapper(createRestaurant)
  )
  .get(
    validatePagination,
    validateGetMyRestParams,
    asyncWrapper(getMyRestaurants)
  );

router.get(
  "/info-restaurant/:restId",
  validatorMySingleRest,
  asyncWrapper(getMySingleRestaurantInfoToUpdate)
);

router
  .route("/:restId")
  .get(validatorMySingleRest, asyncWrapper(getMySingleRestaurant))
  .patch(
    validatorMySingleRest,
    uploadMyRestaurants,
    validatorMyRestaurants,
    validateImagesUploaded,
    asyncWrapper(updateMyRestaurant)
  )
  .delete(validatorMySingleRest, asyncWrapper(deleteRestaurant));

export default router;
