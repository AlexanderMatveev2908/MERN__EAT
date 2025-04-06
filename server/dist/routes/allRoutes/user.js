import express from "express";
import { getUserInfo, getUserProfileDetails, updateProfileDetails, } from "../../controllers/userControllers/infoDetailsUser.js";
import { asyncWrapper } from "../../middleware/general/asyncWrapper.js";
import { getUserId } from "../../middleware/general/getUserId.js";
import { validatorProfileDetails } from "../../middleware/user/validatorProfileDetails.js";
import { verifyAccessToken } from "../../middleware/general/verifyAccessToken.js";
import { getRightManageAccount } from "../../controllers/userControllers/manageAccount.js";
import { manageAccountLimiter } from "../../middleware/user/limiterManageAccount.js";
import { makeLimiter } from "../../utils/makeLimiter.js";
import { changeEmail, verifyChangeEmail, } from "../../controllers/userControllers/modifyEmail.js";
import { HOUR } from "../../config/constants/time.js";
import { changeOldPwd } from "../../controllers/userControllers/changePwd.js";
import { validatorChangeEmail } from "../../middleware/user/validatorChangeEmail.js";
import { validatorVerifyNewEmail } from "../../middleware/user/validatorVerifyNewEmail.js";
import { validatorChangePwd } from "../../middleware/user/validatorChangePwd.js";
import { validatorManageAccount } from "../../middleware/user/validatorManageAccount.js";
import { validatorDeleteAccount } from "../../middleware/user/validatorDeleteAccount.js";
import { deleteAccount } from "../../controllers/userControllers/deleteAccount.js";
const router = express();
router.get("/info-basic", getUserId, asyncWrapper(getUserInfo));
router
    .route("/profile-details")
    .get(verifyAccessToken, asyncWrapper(getUserProfileDetails))
    .patch(verifyAccessToken, validatorProfileDetails, asyncWrapper(updateProfileDetails));
router.post("/manage-account", manageAccountLimiter, verifyAccessToken, validatorManageAccount, asyncWrapper(getRightManageAccount));
router.patch("/change-email", makeLimiter({ max: 5, ms: HOUR }), verifyAccessToken, validatorChangeEmail, asyncWrapper(changeEmail));
router.post("/verify-new-email", makeLimiter({ max: 5, ms: HOUR }), validatorVerifyNewEmail, asyncWrapper(verifyChangeEmail));
router.patch("/change-old-pwd", makeLimiter({ max: 5, ms: HOUR }), verifyAccessToken, validatorChangePwd, asyncWrapper(changeOldPwd));
router.delete("/delete-account", verifyAccessToken, makeLimiter({ max: 5, ms: HOUR }), validatorDeleteAccount, asyncWrapper(deleteAccount));
export default router;
