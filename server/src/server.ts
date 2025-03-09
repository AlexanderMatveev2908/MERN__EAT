import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";
import { corsMiddleware } from "./middleware/general/corsMiddleware";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middleware/general/errMiddleware";
// @ts-ignore
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import newsLetterRouter from "./routes/newsLetter";
import path from "path";
import { isDev } from "./config/currMode";

const app = express();
const port = process.env.PORT ?? 3000;

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          isDev ? process.env.FRONT_URL_DEV! : process.env.FRONT_URL!,
        ],
      },
    },
  })
);
app.use(xss());
app.use(mongoSanitize());

app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/newsletter", newsLetterRouter);

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
