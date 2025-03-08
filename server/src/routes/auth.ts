import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorRegister } from "../middleware/auth/validateRegister";
import { validatorLogin } from "../middleware/auth/validateLogin";
import { validatorVerify } from "../middleware/auth/validatorVerify";
import { validatorRecoverPwd } from "../middleware/auth/validatorRecoverPwd";
import { refreshToken } from "../controllers/authControllers/refresh";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers/basicAuth";
import { sendEmailUser } from "../controllers/authControllers/sendEmail";
import {
  verifyAccount,
  verifyRecoverPwd,
} from "../controllers/authControllers/verify";
import { recoverPwd } from "../controllers/authControllers/recoverPwd";
import { validatorSendEmail } from "../middleware/auth/validatorSendEmail";
import { HOUR } from "../constants/time";

const router = express();

router.get("/refresh", asyncWrapper(refreshToken));

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
  makeLimiter({ max: 5, ms: HOUR }),
  validatorSendEmail,
  asyncWrapper(sendEmailUser)
);

router.post(
  "/verify-account",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorVerify,
  asyncWrapper(verifyAccount)
);
router.post(
  "/verify-recover-pwd",
  makeLimiter({ max: 5, ms: HOUR }),
  validatorVerify,
  asyncWrapper(verifyRecoverPwd)
);

router.patch("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

export default router;
