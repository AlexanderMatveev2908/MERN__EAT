import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import { corsMiddleware } from "./middleware/general/corsMiddleware";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middleware/general/errMiddleware";
import authRouter from "./routes/auth";
import { checkJwtMiddleware } from "./middleware/auth/authMiddleware";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(corsMiddleware);
app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get(
  "/api/v1/protected",
  checkJwtMiddleware,
  (req: Request, res: Response): any =>
    res.status(200).json({ success: true, msg: "you have access" })
);

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

start();
