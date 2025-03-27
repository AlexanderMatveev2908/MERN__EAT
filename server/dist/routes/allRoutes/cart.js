import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getCartUser, getDishInfoQtyInput, } from "../../controllers/cartControllers/get.js";
import { decQtyCart, delCart, delItem, incQtyCart, updateQtyByInput, updateQtyIntervalFormFront, } from "./../../controllers/cartControllers/update.js";
import { validateDishId } from "../../middleware/cart/validateDishId.js";
import { switchCartLogged } from "../../controllers/cartControllers/switch.js";
const router = express.Router();
router
    .route("/")
    .get(verifyAccessToken, asyncWrapper(getCartUser))
    .post(verifyAccessToken, validateDishId, asyncWrapper(incQtyCart))
    .patch(verifyAccessToken, validateDishId, asyncWrapper(decQtyCart));
router.get("/dish-info", verifyAccessToken, validateDishId, asyncWrapper(getDishInfoQtyInput));
router.patch("/del-item", verifyAccessToken, validateDishId, asyncWrapper(delItem));
//  possible update qty by input number or mouseDown event btn interval
router.patch("/put-input", verifyAccessToken, validateDishId, asyncWrapper(updateQtyByInput));
router.patch("/put-int", verifyAccessToken, validateDishId, asyncWrapper(updateQtyIntervalFormFront));
router.put("/switch-logged", verifyAccessToken, validateDishId, asyncWrapper(switchCartLogged));
router.delete("/del-cart", verifyAccessToken, asyncWrapper(delCart));
export default router;
