import express from "express";
import authRouter from "./allRoutes/auth.js";
import userRouter from "./allRoutes/user.js";
import newsLetterRouter from "./allRoutes/newsLetter.js";
import myRestaurantsRouter from "./allRoutes/myRestaurants.js";
import routerMyDishes from "./allRoutes/myDishes.js";
import searchRouter from "./allRoutes/search.js";
import { verifyAccessToken } from "../middleware/general/verifyAccessToken.js";
import { asyncWrapper } from "../middleware/general/asyncWrapper.js";
import proxyRouter from "./allRoutes/proxy.js";
import { isDev } from "../config/currMode.js";
import { corsMiddleware } from "../middleware/general/corsMiddleware.js";
import { helmetMid } from "../middleware/general/helmet.js";
// @ts-ignore
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { logReq } from "../middleware/onlyDev/logQuery.js";

const router = express.Router();

router.use(helmetMid);
router.use(corsMiddleware);
router.use(xss());
router.use(mongoSanitize());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.use(logReq);

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/newsletter", newsLetterRouter);
router.use("/api/v1/my-restaurants", verifyAccessToken, myRestaurantsRouter);
router.use("/api/v1/my-dishes", verifyAccessToken, routerMyDishes);
router.use("/api/v1/search", searchRouter);

if (isDev) router.use("/api/v1/proxy", asyncWrapper(proxyRouter));

export default router;
