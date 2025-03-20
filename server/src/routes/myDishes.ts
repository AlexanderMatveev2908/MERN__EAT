import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import {
  getInfoDishForm,
  getMyDishes,
  getRestaurantIds,
} from "../controllers/MyDishesControllers/get.js";
import {
  validateFilesStorage,
  validatorCreateDishes,
} from "../middleware/myDishes/validatorCreateDishes.js";
import { validateFiles } from "../middleware/myRestaurants/validatorMyRestaurants.js";
import {
  createDishes,
  deleteDish,
} from "../controllers/MyDishesControllers/createUpdate.js";
import { uploadMyDishes } from "../middleware/myDishes/multer.js";
import { validatorSearchDishes } from "../middleware/myDishes/validatorSearchDishes.js";
import { validatePagination } from "../middleware/general/validatePagination.js";
import { validateParams } from "../middleware/myDishes/validateParams.js";

const router = express();

router.get(
  "/restaurant-ids",
  verifyAccessToken,
  asyncWrapper(getRestaurantIds)
);

router
  .route("/")
  .get(
    verifyAccessToken,
    validatePagination,
    validatorSearchDishes,
    asyncWrapper(getMyDishes)
  )
  .post(
    verifyAccessToken,
    uploadMyDishes,
    validateFilesStorage,
    validatorCreateDishes,
    asyncWrapper(createDishes)
  );

router.get(
  "/info-dish/:dishId",
  verifyAccessToken,
  validateParams,
  asyncWrapper(getInfoDishForm)
);

router
  .route("/:dishId")
  .delete(verifyAccessToken, validateParams, asyncWrapper(deleteDish));

export default router;
