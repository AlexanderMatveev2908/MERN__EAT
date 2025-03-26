import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getCartUser } from "../../controllers/cartControllers/get.js";
import { validateActionsCart } from "./../../middleware/search/validateActionsCart.js";
import { incQtyCart } from "./../../controllers/cartControllers/update.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAccessToken, asyncWrapper(getCartUser))
  .post(verifyAccessToken, validateActionsCart, asyncWrapper(incQtyCart));

export default router;
