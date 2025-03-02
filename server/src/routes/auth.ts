import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  loginUser,
  logoutUser,
  recoverPwd,
  registerUser,
  sendEmailUser,
  verifyController,
} from "../controllers/authControllers";
import { validatorRegister } from "../middleware/auth/validators/validateRegister";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorVerify } from "../middleware/auth/validators/validatorVerify";
import { validatorRecoverPwd } from "../middleware/auth/validators/validatorRecoverPwd";
import { validatorLogin } from "../middleware/auth/validators/validateLogin";

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
  "/verify",
  makeLimiter({ max: 3 }),
  validatorVerify,
  asyncWrapper(verifyController)
);

router.post("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

router.post("/refresh");

router.get("/user");

export default router;
