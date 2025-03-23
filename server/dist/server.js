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
import { errMiddleware } from "./middleware/general/errMiddleware.js";
import path from "path";
import { isDev } from "./config/currMode.js";
import { connectCloudinary } from "./config/cloud.js";
import router from "./routes/mainRoute.js";
import { get__dirname } from "./utils/calcPath.js";
const app = express();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.set("trust proxy", 1);
app.use("/", router);
if (!isDev) {
    app.use(express.static(path.join(get__dirname(), "../../client/dist")));
    app.get("*", (_, res) => res.sendFile(path.join(get__dirname(), "../../client/dist/index.html")));
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
