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
import { getRightManageAccount } from "../controllers/userControllers/manageAccount";
import { manageAccountLimiter } from "../middleware/user/limiterManageAccount";
import { makeLimiter } from "../utils/makeLimiter";
import {
  changeEmail,
  verifyChangeEmail,
} from "../controllers/userControllers/modifyEmail";
import { HOUR } from "../constants/time";
import { changeOldPwd } from "../controllers/userControllers/changePwd";
import { validatorChangeEmail } from "../middleware/user/validatorChangeEmail";
import { validatorVerifyNewEmail } from "../middleware/user/validatorVerifyNewEmail";
import { validatorChangePwd } from "../middleware/user/validatorChangePwd";

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
  asyncWrapper(getRightManageAccount)
);

router.patch(
  "/change-email",
  makeLimiter({ max: 5, ms: HOUR }),
  verifyAccessToken,
  validatorChangeEmail,
  asyncWrapper(changeEmail)
);

router.post(
  "/verify-new-email",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorVerifyNewEmail,
  asyncWrapper(verifyChangeEmail)
);

router.patch(
  "/change-old-pwd",
  makeLimiter({ max: 5, ms: HOUR }),
  verifyAccessToken,
  validatorChangePwd,
  asyncWrapper(changeOldPwd)
);

export default router;
