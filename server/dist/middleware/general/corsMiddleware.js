import cors from "cors";
import { isDev } from "../../config/currMode.js";
export const corsMiddleware = cors({
    origin: isDev ? process.env.FRONT_URL_DEV : process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
});
