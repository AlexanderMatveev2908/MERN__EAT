import express from "express";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getCartUser } from "../../controllers/cartControllers/get.js";

const router = express.Router();

router.route("/").get(verifyAccessToken, asyncWrapper(getCartUser));

export default router;
