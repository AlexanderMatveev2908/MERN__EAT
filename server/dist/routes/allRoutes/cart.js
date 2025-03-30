import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getCartUser, getDishInfoQtyInput, } from "../../controllers/cartControllers/get.js";
import { decQtyCart, delCart, delItem, incQtyCart, updateQtyByInput, updateQtyIntervalFormFront, } from "./../../controllers/cartControllers/update.js";
import { validateDishId } from "../../middleware/cart/validateDishId.js";
import { saveDbStorageCart, switchCartFromLocalStorage, switchCartLogged, } from "../../controllers/cartControllers/switch.js";
import { validateCartLocalStorage } from "../../middleware/cart/validateCartLocalStorage.js";
const router = express.Router();
router
    .route("/")
    .get(verifyAccessToken, asyncWrapper(getCartUser))
    .post(verifyAccessToken, validateDishId, asyncWrapper(incQtyCart))
    .patch(verifyAccessToken, validateDishId, asyncWrapper(decQtyCart));
router.patch("/del-item", verifyAccessToken, validateDishId, asyncWrapper(delItem));
// get fresh data about qty item so can validate input user about quantity he enter in input before submit
router.get("/dish-info", validateDishId, asyncWrapper(getDishInfoQtyInput));
//  possible update qty by input number or mouseDown event btn interval
router.patch("/put-input", verifyAccessToken, validateDishId, asyncWrapper(updateQtyByInput));
router.patch("/put-int", verifyAccessToken, validateDishId, asyncWrapper(updateQtyIntervalFormFront));
// 1 CASE => USER HAVE CART IN LOCAL STORAGE BUT NOT IN DB
router.post("/save-db-cart", verifyAccessToken, validateCartLocalStorage, asyncWrapper(saveDbStorageCart));
// USER HAVE CART IN DB AND IN LOCAL STORAGE
router.put("/switch-storage", verifyAccessToken, validateCartLocalStorage, asyncWrapper(switchCartFromLocalStorage));
// USER HAVE CART WITH A CERTAIN RESTAURANT AND START ORDERING FROM SOMEWHERE ELSE LIKE FROM PIZZA TO STEAKHOUSE
router.put("/switch-logged", verifyAccessToken, validateDishId, asyncWrapper(switchCartLogged));
router.delete("/del-cart", verifyAccessToken, asyncWrapper(delCart));
export default router;
