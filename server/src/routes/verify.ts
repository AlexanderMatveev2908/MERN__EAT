import express from "express";
import { makeLimiter } from "../utils/makeLimiter";
import { validatorVerify } from "../middleware/verify/validatorVerify";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  sendEmailUser,
  verifyAccount,
  verifyRecoverPwd,
} from "../controllers/verifyControllers";

const router = express();

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

export default router;
