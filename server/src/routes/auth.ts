import express from "express";
import { validatorRegister } from "../middleware/auth/validateRegister";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { registerUser, sendEmailUser } from "../controllers/authControllers";

const router = express();

router.post("/register", validatorRegister, asyncWrapper(registerUser));
router.post("/login");
router.post("/logout");

router.post("/send-email", asyncWrapper(sendEmailUser));
router.post("/verify");

router.post("/recover-pwd");

router.post("/refresh");

router.get("/user");

export default router;
