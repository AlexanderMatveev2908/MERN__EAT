import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { refreshToken } from "../controllers/refresh";

const router = express();

router.get("/", asyncWrapper(refreshToken));

export default router;
