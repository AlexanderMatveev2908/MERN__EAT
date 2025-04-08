import express from "express";
import { checkRestId } from "../../middleware/general/checkRestId.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import {
  createReview,
  getInfoRest,
} from "../../controllers/myReviewsControllers/post.js";
import { validateReview } from "../../middleware/myReviews/validateReview.js";
import { uploadImgMyReviews } from "../../middleware/myReviews/multer.js";
import { validateReviewId } from "../../middleware/myReviews/validateReviewId.js";
import {
  getReview,
  updateReview,
} from "../../controllers/myReviewsControllers/put.js";

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

router
  .route("/:revId")
  .get(validateReviewId, asyncWrapper(getReview))
  .put(
    uploadImgMyReviews,
    validateReviewId,
    validateReview,
    asyncWrapper(updateReview)
  );

export default router;
