import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { checkCode } from "../../middleware/orders/checkCode.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { createOrder } from "../../controllers/ordersControllers/post.js";
import { getOrderInfo } from "../../controllers/ordersControllers/get.js";
import { validateOrderId } from "../../middleware/orders/validateOrderId.js";
import { validateLastCheckOrder } from "../../middleware/orders/lastCheckOrder.js";
import { lastCheckOrder } from "../../controllers/ordersControllers/put.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAccessToken, validateOrderId, asyncWrapper(getOrderInfo))
  .post(verifyAccessToken, checkCode, asyncWrapper(createOrder))
  .put(
    verifyAccessToken,
    validateOrderId,
    validateLastCheckOrder,
    asyncWrapper(lastCheckOrder)
  );

export default router;
