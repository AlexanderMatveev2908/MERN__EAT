import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { exchangeToken, logoutUser } from "../controllers/authControllers";

const router = express();

router.post("/exchange-token", asyncWrapper(exchangeToken));

router.post("/logout", asyncWrapper(logoutUser));

export default router;
