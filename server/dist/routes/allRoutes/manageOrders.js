import express from "express";
import { validateQueryMangeOrders } from "../../middleware/manageOrders/validateQueryMangeOrders.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getManageOrders, getSingleManageOrders, } from "../../controllers/manageOrdersControllers/get.js";
import { validateOrderId } from "../../middleware/orders/validateOrderId.js";
import { updateOrderStatus } from "../../controllers/manageOrdersControllers/patch.js";
const router = express.Router();
router.route("/").get(validateQueryMangeOrders, asyncWrapper(getManageOrders));
router
    .route("/:orderId")
    .get(validateOrderId, asyncWrapper(getSingleManageOrders))
    .patch(validateOrderId, asyncWrapper(updateOrderStatus));
export default router;
