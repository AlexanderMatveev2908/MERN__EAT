import express from "express";
import { recoverPwd } from "../controllers/user";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { validatorRecoverPwd } from "../middleware/auth/validators/validatorRecoverPwd";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { getUserInfo } from "../controllers/authControllers";

const router = express();

router.post("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

router.get("/info", verifyAccessToken, asyncWrapper(getUserInfo));

export default router;
