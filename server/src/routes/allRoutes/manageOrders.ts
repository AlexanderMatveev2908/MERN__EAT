import express from "express";
import { validateQueryMangeOrders } from "../../middleware/manageOrders/validateQueryMangeOrders.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getManageOrders } from "../../controllers/manageOrdersControllers/get.js";

const router = express.Router();

router.route("/").get(validateQueryMangeOrders, asyncWrapper(getManageOrders));

export default router;
