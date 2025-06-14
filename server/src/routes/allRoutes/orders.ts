import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { checkCode } from "../../middleware/orders/checkCode.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import {
  getOrderConfirmedByPolling,
  getOrderInfo,
} from "../../controllers/ordersControllers/checkout/get.js";
import { validateOrderId } from "../../middleware/orders/validateOrderId.js";
import { validateLastCheckOrder } from "../../middleware/orders/lastCheckOrder.js";
import { lastCheckOrder } from "../../controllers/ordersControllers/checkout/put.js";
import { createOrder } from "../../controllers/ordersControllers/checkout/post.js";
import { validateQuery } from "../../middleware/orders/validateQuery.js";
import {
  getOrders,
  getOrderStatus,
} from "../../controllers/ordersControllers/get.js";
import { deletePendingOrder } from "../../controllers/ordersControllers/delete.js";
import { refundOrder } from "../../controllers/ordersControllers/patch.js";

const router = express.Router();

router
  .route("/checkout")
  .get(validateOrderId, asyncWrapper(getOrderInfo))
  .post(checkCode, asyncWrapper(createOrder))
  .put(validateOrderId, validateLastCheckOrder, asyncWrapper(lastCheckOrder));

router.get(
  "/checkout-poll",
  validateOrderId,
  asyncWrapper(getOrderConfirmedByPolling)
);

router.get("/", validateQuery, asyncWrapper(getOrders));

router.delete(
  "/del-pending/:orderId",
  validateOrderId,
  asyncWrapper(deletePendingOrder)
);
router.patch(
  "/refund-confirmed/:orderId",
  validateOrderId,
  asyncWrapper(refundOrder)
);

router.get(
  "/fresh-status/:orderId",
  validateOrderId,
  asyncWrapper(getOrderStatus)
);
export default router;
