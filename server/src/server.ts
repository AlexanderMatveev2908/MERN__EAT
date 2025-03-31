import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { errMiddleware } from "./middleware/general/errMiddleware.js";
import path from "path";
import { isDev } from "./config/currMode.js";
import { connectCloudinary } from "./config/cloud.js";
import router from "./routes/mainRoute.js";
import { get__dirname } from "./utils/calcPath.js";
import { scheduleFoodCoupon } from "./config/cron.js";
import { clearCoupons } from "./stuff/makeOpDb.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.set("trust proxy", 1);

app.use("/api/v1", router);

scheduleFoodCoupon();
if (!isDev) {
  app.use(express.static(path.join(get__dirname(), "../../client/dist")));

  app.get("*", (_, res) =>
    res.sendFile(path.join(get__dirname(), "../../client/dist/index.html"))
  );
}

app.use(errMiddleware);

// makeCart();

const start = async () => {
  try {
    await connectDB();

    await connectCloudinary();

    app.listen(+port!, "0.0.0.0", () =>
      console.log(`=> server listening on ${port}...`)
    );
  } catch (err: any) {
    console.log({
      msg: err.message,
      stack: err.stack,
    });
  }
};

// netstat -ano | findstr :3000
// npx kill-port 3000
// dummy github

start();
