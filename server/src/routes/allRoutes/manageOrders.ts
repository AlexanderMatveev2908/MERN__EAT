import express from "express";
import { validateQueryMangeOrders } from "../../middleware/manageOrders/validateQueryMangeOrders.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import {
  getManageOrders,
  getSingleManageOrders,
} from "../../controllers/manageOrdersControllers/get.js";
import { validateOrderId } from "../../middleware/orders/validateOrderId.js";

const router = express.Router();

router.route("/").get(validateQueryMangeOrders, asyncWrapper(getManageOrders));
router.get("/:orderId", validateOrderId, asyncWrapper(getSingleManageOrders));

export default router;
