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
import { getOrders } from "../../controllers/ordersControllers/get.js";

const router = express.Router();

router
  .route("/checkout")
  .get(verifyAccessToken, validateOrderId, asyncWrapper(getOrderInfo))
  .post(verifyAccessToken, checkCode, asyncWrapper(createOrder))
  .put(
    verifyAccessToken,
    validateOrderId,
    validateLastCheckOrder,
    asyncWrapper(lastCheckOrder)
  );

router.get(
  "/checkout-poll",
  verifyAccessToken,
  validateOrderId,
  asyncWrapper(getOrderConfirmedByPolling)
);

router.get("/", verifyAccessToken, validateQuery, asyncWrapper(getOrders));
export default router;
