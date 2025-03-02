import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { registerUser, sendEmailUser } from "../controllers/authControllers";
import { validatorRegister } from "../middleware/auth/validators/validateRegister";
import { makeLimiter } from "../utils/makeLimiter";

const router = express();

router.post("/register", validatorRegister, asyncWrapper(registerUser));
router.post("/login");
router.post("/logout");

router.post(
  "/send-email",
  makeLimiter({ max: 3 }),
  asyncWrapper(sendEmailUser)
);
router.post("/verify");

router.post("/recover-pwd");

router.post("/refresh");

router.get("/user");

export default router;
