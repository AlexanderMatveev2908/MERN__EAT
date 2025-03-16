import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { uploadMyRestaurants } from "../middleware/myRestaurants/multer.js";
import { validateFiles, validateImagesUploaded, validatorMyRestaurants, } from "../middleware/myRestaurants/validatorMyRestaurants.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import { getMyRestaurants, getMySingleRestaurant, } from "../controllers/myRestaurants/get.js";
import { validatorMySingleRest } from "../middleware/myRestaurants/validatorMySingleRest.js";
import { createRestaurant, deleteRestaurant, updateMyRestaurant, } from "../controllers/myRestaurants/makeUpdateDelete.js";
import { validateGetMyRestParams } from "../middleware/myRestaurants/validateGetMyRestParams.js";
import { validatePagination } from "../middleware/general/validatePagination.js";
const router = express();
router
    .route("/")
    .post(verifyAccessToken, uploadMyRestaurants, validatorMyRestaurants, validateFiles, asyncWrapper(createRestaurant))
    .get(verifyAccessToken, validatePagination, validateGetMyRestParams, asyncWrapper(getMyRestaurants));
router.get("/info-restaurant/:restId", verifyAccessToken, validatorMySingleRest, asyncWrapper(getMySingleRestaurant));
router
    .route("/:restId")
    .patch(verifyAccessToken, validatorMySingleRest, uploadMyRestaurants, validatorMyRestaurants, validateImagesUploaded, asyncWrapper(updateMyRestaurant))
    .delete(verifyAccessToken, validatorMySingleRest, asyncWrapper(deleteRestaurant));
export default router;
