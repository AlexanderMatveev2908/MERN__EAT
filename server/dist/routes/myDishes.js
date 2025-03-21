import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import { getInfoDishForm, getMyDishes, getRestaurantIds, } from "../controllers/MyDishesControllers/get.js";
import { validateFilesStorage, validatorCreateDishes, } from "../middleware/myDishes/validatorCreateDishes.js";
import { bulkDelete, createDishes, deleteDish, updateDish, } from "../controllers/MyDishesControllers/createUpdate.js";
import { uploadMyDishes } from "../middleware/myDishes/multer.js";
import { validatorSearchDishes } from "../middleware/myDishes/validatorSearchDishes.js";
import { validatePagination } from "../middleware/general/validatePagination.js";
import { validateParams } from "../middleware/myDishes/validateParams.js";
import { validatorUpdateDish } from "../middleware/myDishes/validatorUpdateDish.js";
import { updateDishesUpload } from "../middleware/myDishes/multerUpdate.js";
import { validateArrIds } from "../middleware/myDishes/validateArrIds.js";
const router = express();
router.get("/restaurant-ids", asyncWrapper(getRestaurantIds));
router
    .route("/")
    .get(validatePagination, validatorSearchDishes, asyncWrapper(getMyDishes))
    .post(uploadMyDishes, validateFilesStorage, validatorCreateDishes, asyncWrapper(createDishes));
router.delete("/bulk-delete", validateArrIds, asyncWrapper(bulkDelete));
router.get("/info-dish/:dishId", validateParams, asyncWrapper(getInfoDishForm));
router
    .route("/:dishId")
    .delete(validateParams, asyncWrapper(deleteDish))
    .put(updateDishesUpload, validatorUpdateDish, asyncWrapper(updateDish));
export default router;
