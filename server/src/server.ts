import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { corsMiddleware } from "./config/cors";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(corsMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v1/test", async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ success: true });
});

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
