import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import {
  getMyDishes,
  getRestaurantIds,
} from "../controllers/MyDishesControllers/get.js";
import {
  validateFilesStorage,
  validatorCreateDishes,
} from "../middleware/myDishes/validatorCreateDishes.js";
import { validateFiles } from "../middleware/myRestaurants/validatorMyRestaurants.js";
import { createDishes } from "../controllers/MyDishesControllers/createUpdate.js";
import { uploadMyDishes } from "../middleware/myDishes/multer.js";
import { validatorSearchDishes } from "../middleware/myDishes/validatorSearchDishes.js";
import { validatePagination } from "../middleware/general/validatePagination.js";

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

export default router;
