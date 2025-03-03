import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorRegister } from "../middleware/auth/validateRegister";
import { validatorLogin } from "../middleware/auth/validateLogin";

const router = express();

router.post("/register", validatorRegister, asyncWrapper(registerUser));
router.post(
  "/login",
  makeLimiter({ max: 5 }),
  validatorLogin,
  asyncWrapper(loginUser)
);
router.post("/logout", asyncWrapper(logoutUser));

export default router;
