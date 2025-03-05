import express from "express";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import {
  subscribeNonLoggedUser,
  toggleUserNewsLetter,
} from "../controllers/newsLetterControllers";

const router = express();

router.patch("/logged", verifyAccessToken, asyncWrapper(toggleUserNewsLetter));

router.post("/non-logged", asyncWrapper(subscribeNonLoggedUser));

export default router;
