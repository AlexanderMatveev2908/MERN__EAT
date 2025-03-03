import express from "express";
import { getUserInfo, recoverPwd } from "../controllers/userControllers";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { validatorRecoverPwd } from "../middleware/user/validatorRecoverPwd";
import { getUserId } from "../middleware/general/getUserId";

const router = express();

router.post("/recover-pwd", validatorRecoverPwd, asyncWrapper(recoverPwd));

router.get("/name", getUserId, asyncWrapper(getUserInfo));

export default router;
