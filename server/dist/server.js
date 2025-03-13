var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
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
const app = express();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.set("trust proxy", 1);
app.use(helmetMid);
app.use(xss());
app.use(mongoSanitize());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/newsletter", newsLetterRouter);
app.use("/api/v1/my-restaurants", myRestaurantsRouter);
if (!isDev) {
    app.use(express.static(path.join(__dirname, "../../client/dist")));
    app.get("*", (_, res) => res.sendFile(path.join(__dirname, "../../client/dist/index.html")));
}
app.use(errMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        yield connectCloudinary();
        app.listen(+port, "0.0.0.0", () => console.log(`=> server listening on ${port}...`));
    }
    catch (err) {
        console.log(err);
    }
});
// netstat -ano | findstr :3000
// npx kill-port 3000
// dummy github
start();
