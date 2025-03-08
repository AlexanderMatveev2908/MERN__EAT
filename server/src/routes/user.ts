import express from "express";
import {
  getUserInfo,
  getUserProfileDetails,
  updateProfileDetails,
} from "../controllers/userControllers/infoDetailsUser";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { getUserId } from "../middleware/general/getUserId";
import { validatorProfileDetails } from "../middleware/user/validatorProfileDetails";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { validatorManageAccount } from "../middleware/user/validatorManageAccount";
import { getRightManageAccount } from "../controllers/userControllers/manageAccount";
import { manageAccountLimiter } from "../middleware/user/limiterManageAccount";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorChangeEmail } from "./../middleware/user/validatorChangeEmail";
import {
  changeEmail,
  verifyChangeEmail,
} from "../controllers/userControllers/modifyEmail";
import { validatorVerifyEmail } from "../middleware/user/validatorVerifyEmail";
import { HOUR } from "../constants/time";
import { validatorChangeOldPwd } from "../middleware/user/validatorChangeOldPwd";
import { changeOldPwd } from "../controllers/userControllers/changePwd";

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

router.post(
  "/manage-account",
  verifyAccessToken,
  manageAccountLimiter,
  validatorManageAccount,
  asyncWrapper(getRightManageAccount)
);

router.patch(
  "/change-email",
  verifyAccessToken,
  makeLimiter({ max: 5, ms: HOUR }),
  validatorChangeEmail,
  asyncWrapper(changeEmail)
);

router.post(
  "/verify-new-email",
  verifyAccessToken,
  makeLimiter({ max: 5, ms: HOUR }),
  validatorVerifyEmail,
  asyncWrapper(verifyChangeEmail)
);

router.patch(
  "/change-old-pwd",
  verifyAccessToken,
  makeLimiter({ max: 5, ms: HOUR }),
  validatorChangeOldPwd,
  asyncWrapper(changeOldPwd)
);

export default router;
