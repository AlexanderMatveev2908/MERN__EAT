import express from "express";
import { checkRestId } from "../../middleware/general/checkRestId.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getInfoRest } from "../../controllers/myReviewsControllers/getRestInfo.js";

const router = express.Router();
router.get("/rest-info/:restId", checkRestId, asyncWrapper(getInfoRest));

export default router;
