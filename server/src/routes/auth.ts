import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  recoverPwd,
  refreshToken,
  registerUser,
  sendEmailUser,
  verifyAccount,
  verifyRecoverPwd,
} from "../controllers/authControllers";
import { validatorRegister } from "../middleware/auth/validators/validateRegister";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorVerify } from "../middleware/auth/validators/validatorVerify";
import { validatorRecoverPwd } from "../middleware/auth/validators/validatorRecoverPwd";
import { validatorLogin } from "../middleware/auth/validators/validateLogin";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";

const router = express();

router.post("/register", validatorRegister, asyncWrapper(registerUser));
router.post(
  "/login",
  makeLimiter({ max: 5 }),
  validatorLogin,
  asyncWrapper(loginUser)
);
router.post("/logout", asyncWrapper(logoutUser));

router.post(
  "/send-email",
  makeLimiter({ max: 3 }),
  asyncWrapper(sendEmailUser)
);

router.post(
  "/verify-account",
  makeLimiter({ max: 3 }),
  validatorVerify,
  asyncWrapper(verifyAccount)
);
router.post(
  "/verify-recover-pwd",
  makeLimiter({ max: 3 }),
  validatorVerify,
  asyncWrapper(verifyRecoverPwd)
);

router.post("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

router.get("/refresh", asyncWrapper(refreshToken));

router.get("/user", verifyAccessToken, asyncWrapper(getUserInfo));

export default router;
