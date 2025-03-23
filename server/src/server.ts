import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { corsMiddleware } from "./middleware/general/corsMiddleware.js";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middleware/general/errMiddleware.js";
// @ts-ignore
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import newsLetterRouter from "./routes/newsLetter.js";
import path from "path";
import { isDev } from "./config/currMode.js";
import { connectCloudinary } from "./config/cloud.js";
import myRestaurantsRouter from "./routes/myRestaurants.js";
import { helmetMid } from "./middleware/general/helmet.js";
import routerMyDishes from "./routes/myDishes.js";
import proxyRouter from "./routes/proxy.js";
import { asyncWrapper } from "./middleware/general/asyncWrapper.js";
import { verifyAccessToken } from "./middleware/general/verifyAccessToken.js";
import searchRouter from "./routes/search.js";
import { updateRest } from "./stuff/makeOpDb.js";

const app = express();
const port = process.env.PORT ?? 3000;

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.set("trust proxy", 1);
app.use(helmetMid);
app.use(corsMiddleware);
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/newsletter", newsLetterRouter);
app.use("/api/v1/my-restaurants", verifyAccessToken, myRestaurantsRouter);
app.use("/api/v1/my-dishes", verifyAccessToken, routerMyDishes);
app.use("/api/v1/search", searchRouter);

if (isDev) app.use("/api/v1/proxy", asyncWrapper(proxyRouter));

if (!isDev) {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
  );
}

app.use(errMiddleware);

const start = async () => {
  try {
    await connectDB();

    await connectCloudinary();

    app.listen(+port!, "0.0.0.0", () =>
      console.log(`=> server listening on ${port}...`)
    );
  } catch (err: any) {
    console.log(err);
  }
};

// netstat -ano | findstr :3000
// npx kill-port 3000
// dummy github

start();
