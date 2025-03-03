import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers";
import { validatorRegister } from "../middleware/auth/validators/validateRegister";
import { makeLimiter } from "../utils/makeLimiter";
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

export default router;
