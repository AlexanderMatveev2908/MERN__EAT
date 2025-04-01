import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { checkCode } from "../../middleware/orders/checkCode.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { createOrder } from "../../controllers/ordersControllers/postPut.js";
import { getOrderInfo } from "../../controllers/ordersControllers/get.js";
import { validateOrderId } from "../../middleware/orders/validateOrderId.js";

const router = express.Router();

router
  .route("/")
  .post(verifyAccessToken, checkCode, asyncWrapper(createOrder))
  .get(verifyAccessToken, validateOrderId, asyncWrapper(getOrderInfo));

export default router;
