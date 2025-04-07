import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db.js";
import { errMiddleware } from "./middleware/general/errMiddleware.js";
import path from "path";
import { isDev } from "./config/currMode.js";
import { connectCloudinary } from "./config/cloud.js";
import router from "./routes/mainRoute.js";
import { get__dirname } from "./utils/calcPath.js";
import { addRev, updateCO } from "./stuff/makeOpDb.js";
import { generateCoupons } from "./utils/coupon/generateCoupons.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = process.env.PORT ?? 3000;

app.set("trust proxy", 1);

// app.use(
//   "/api/v1",
//   createProxyMiddleware({
//     target: "https://food-app-aqkc.onrender.com",
//     changeOrigin: true,
//     onProxyReq: (proxyReq: any, req: Request, res: Response) => {
//       console.log(
//         "Proxying request to:",
//         proxyReq.getHeader("host") + proxyReq.path
//       );
//     },
//     onError: (err: any, req: Request, res: Response) => {
//       console.error("Proxy error:", err.message);
//       res.status(500).json({ error: "Proxy failed" });
//     },
//   } as any)
// );

app.use("/api/v1", router);

if (!isDev) {
  app.use(express.static(path.join(get__dirname(), "../../client/dist")));

  app.get("*", (_, res) =>
    res.sendFile(path.join(get__dirname(), "../../client/dist/index.html"))
  );
}

app.use(errMiddleware);
// updateCO();

// generateCoupons();
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

start();

// netstat -ano | findstr :3000
// npx kill-port 3000
