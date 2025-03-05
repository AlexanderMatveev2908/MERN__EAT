import express from "express";
import {
  getUserInfo,
  getUserProfileDetails,
  updateProfileDetails,
} from "../controllers/userControllers";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { validatorRecoverPwd } from "../middleware/auth/validatorRecoverPwd";
import { getUserId } from "../middleware/general/getUserId";
import { validatorProfileDetails } from "../middleware/user/validatorProfileDetails";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";

const router = express();

router.get("/info-basic", getUserId, asyncWrapper(getUserInfo));

router
  .route("/profile-details")
  .get(verifyAccessToken, asyncWrapper(getUserProfileDetails))
  .patch(
    verifyAccessToken,
    validatorProfileDetails,
    asyncWrapper(updateProfileDetails)
  );

export default router;
