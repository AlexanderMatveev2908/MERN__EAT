"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const corsMiddleware_1 = require("./middleware/general/corsMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errMiddleware_1 = require("./middleware/general/errMiddleware");
// @ts-ignore
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const newsLetter_1 = __importDefault(require("./routes/newsLetter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.set("trust proxy", 1);
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", process.env.FRONT_URL],
        },
    },
}));
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use(corsMiddleware_1.corsMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/newsletter", newsLetter_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
    app.get("*", (_, res) => res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html")));
}
app.use(errMiddleware_1.errMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        app.listen(+port, "0.0.0.0", () => console.log(`=> server listening on ${port}...`));
    }
    catch (err) {
        console.log(err);
    }
});
// netstat -ano | findstr :3000
// npx kill-port 3000
start();
