import express from "express";
import {
  getUserInfo,
  getUserProfileDetails,
  recoverPwd,
} from "../controllers/userControllers";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { validatorRecoverPwd } from "../middleware/user/validatorRecoverPwd";
import { getUserId } from "../middleware/general/getUserId";
import { validatorProfileDetails } from "../middleware/user/validatorProfileDetails";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";

const router = express();

router.post("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

router.get("/info-basic", getUserId, asyncWrapper(getUserInfo));

router.get(
  "/profile-details",
  verifyAccessToken,
  asyncWrapper(getUserProfileDetails)
);

export default router;
