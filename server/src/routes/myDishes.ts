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
import {
  createDishes,
  deleteDish,
  updateDish,
} from "../controllers/MyDishesControllers/createUpdate.js";
import { uploadMyDishes } from "../middleware/myDishes/multer.js";
import { validatorSearchDishes } from "../middleware/myDishes/validatorSearchDishes.js";
import { validatePagination } from "../middleware/general/validatePagination.js";
import { validateParams } from "../middleware/myDishes/validateParams.js";
import { validatorUpdateDish } from "../middleware/myDishes/validatorUpdateDish.js";
import { updateDishesUpload } from "../middleware/myDishes/multerUpdate.js";

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
  .delete(verifyAccessToken, validateParams, asyncWrapper(deleteDish))
  .put(
    verifyAccessToken,
    updateDishesUpload,
    validatorUpdateDish,
    asyncWrapper(updateDish)
  );

export default router;
