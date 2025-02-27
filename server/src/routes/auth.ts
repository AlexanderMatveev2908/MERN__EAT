import express from "express";
import { asyncWrapper } from "../middleware/general/asyncWrapper";
import { exchangeToken } from "../controllers/authControllers";

const router = express();

router.post("/exchange-token", asyncWrapper(exchangeToken));

export default router;
