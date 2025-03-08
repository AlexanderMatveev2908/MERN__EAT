"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const infoDetailsUser_1 = require("../controllers/userControllers/infoDetailsUser");
const asyncWrapper_1 = require("../middleware/general/asyncWrapper");
const getUserId_1 = require("../middleware/general/getUserId");
const validatorProfileDetails_1 = require("../middleware/user/validatorProfileDetails");
const verifyAccessToken_1 = require("../middleware/general/verifyAccessToken");
const manageAccount_1 = require("../controllers/userControllers/manageAccount");
const limiterManageAccount_1 = require("../middleware/user/limiterManageAccount");
const makeLimiter_1 = require("../utils/makeLimiter");
const modifyEmail_1 = require("../controllers/userControllers/modifyEmail");
const time_1 = require("../constants/time");
const changePwd_1 = require("../controllers/userControllers/changePwd");
const validatorChangeEmail_1 = require("../middleware/user/validatorChangeEmail");
const validatorVerifyNewEmail_1 = require("../middleware/user/validatorVerifyNewEmail");
const validatorChangePwd_1 = require("../middleware/user/validatorChangePwd");
const validatorManageAccount_1 = require("../middleware/user/validatorManageAccount");
const validatorDeleteAccount_1 = require("../middleware/user/validatorDeleteAccount");
const deleteAccount_1 = require("../controllers/userControllers/deleteAccount");
const router = (0, express_1.default)();
router.get("/info-basic", getUserId_1.getUserId, (0, asyncWrapper_1.asyncWrapper)(infoDetailsUser_1.getUserInfo));
router
    .route("/profile-details")
    .get(verifyAccessToken_1.verifyAccessToken, (0, asyncWrapper_1.asyncWrapper)(infoDetailsUser_1.getUserProfileDetails))
    .patch(verifyAccessToken_1.verifyAccessToken, validatorProfileDetails_1.validatorProfileDetails, (0, asyncWrapper_1.asyncWrapper)(infoDetailsUser_1.updateProfileDetails));
router.post("/manage-account", limiterManageAccount_1.manageAccountLimiter, verifyAccessToken_1.verifyAccessToken, validatorManageAccount_1.validatorManageAccount, (0, asyncWrapper_1.asyncWrapper)(manageAccount_1.getRightManageAccount));
router.patch("/change-email", (0, makeLimiter_1.makeLimiter)({ max: 5, ms: time_1.HOUR }), verifyAccessToken_1.verifyAccessToken, validatorChangeEmail_1.validatorChangeEmail, (0, asyncWrapper_1.asyncWrapper)(modifyEmail_1.changeEmail));
router.post("/verify-new-email", (0, makeLimiter_1.makeLimiter)({ max: 5, ms: time_1.HOUR }), validatorVerifyNewEmail_1.validatorVerifyNewEmail, (0, asyncWrapper_1.asyncWrapper)(modifyEmail_1.verifyChangeEmail));
router.patch("/change-old-pwd", (0, makeLimiter_1.makeLimiter)({ max: 5, ms: time_1.HOUR }), verifyAccessToken_1.verifyAccessToken, validatorChangePwd_1.validatorChangePwd, (0, asyncWrapper_1.asyncWrapper)(changePwd_1.changeOldPwd));
router.delete("/delete-account", verifyAccessToken_1.verifyAccessToken, (0, makeLimiter_1.makeLimiter)({ max: 5, ms: time_1.HOUR }), validatorDeleteAccount_1.validatorDeleteAccount, (0, asyncWrapper_1.asyncWrapper)(deleteAccount_1.deleteAccount));
exports.default = router;
