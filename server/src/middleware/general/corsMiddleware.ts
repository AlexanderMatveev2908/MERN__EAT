import cors from "cors";

export const corsMiddleware = cors({
  origin:
    process.env.NODE_ENV === "development"
      ? process.env.FRONT_URL_DEV
      : process.env.FRONT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
