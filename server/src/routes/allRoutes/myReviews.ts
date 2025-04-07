import express from "express";
import { checkRestId } from "../../middleware/general/checkRestId.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import {
  createReview,
  getInfoRest,
} from "../../controllers/myReviewsControllers/getRestInfo.js";
import { validateReview } from "../../middleware/myReviews/validateReview.js";
import { uploadImgMyReviews } from "../../middleware/myReviews/multer.js";

const router = express.Router();

router.get("/rest-info/:restId", checkRestId, asyncWrapper(getInfoRest));
router
  .route("/:restId")
  .post(
    uploadImgMyReviews,
    checkRestId,
    validateReview,
    asyncWrapper(createReview)
  );

export default router;
