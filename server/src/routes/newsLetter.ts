import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { subscribeUserNewsLetter } from "../controllers/newsLetterControllers";

const router = express();

router.patch(
  "/subscribe",
  verifyAccessToken,
  asyncWrapper(subscribeUserNewsLetter)
);

export default router;
