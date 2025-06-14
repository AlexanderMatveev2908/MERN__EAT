import express from "express";
import { uploadMyRestaurants } from "../../middleware/myRestaurants/multer.js";
import { validateFiles, validateImagesUploaded, validatorMyRestaurants, } from "../../middleware/myRestaurants/validatorMyRestaurants.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getMyRestaurants, getMySingleRestaurant, getMySingleRestaurantInfoToUpdate, } from "../../controllers/myRestaurants/get.js";
import { createRestaurant, deleteRestaurant, updateMyRestaurant, } from "../../controllers/myRestaurants/makeUpdateDelete.js";
import { validateGetMyRestParams } from "../../middleware/myRestaurants/validateGetMyRestParams.js";
import { checkRestId } from "../../middleware/general/checkRestId.js";
const router = express();
router
    .route("/")
    .post(uploadMyRestaurants, validatorMyRestaurants, validateFiles, asyncWrapper(createRestaurant))
    .get(validateGetMyRestParams, asyncWrapper(getMyRestaurants));
router.get("/info-restaurant/:restId", checkRestId, asyncWrapper(getMySingleRestaurantInfoToUpdate));
router
    .route("/:restId")
    .get(checkRestId, asyncWrapper(getMySingleRestaurant))
    .patch(checkRestId, uploadMyRestaurants, validatorMyRestaurants, validateImagesUploaded, asyncWrapper(updateMyRestaurant))
    .delete(checkRestId, asyncWrapper(deleteRestaurant));
export default router;
